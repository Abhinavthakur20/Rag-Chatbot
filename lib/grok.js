import { createHash } from "crypto";

const DEFAULT_RETRIES = 2;
const DEFAULT_DELAY = 650;
const PROVIDER_DEFAULTS = {
  xai: {
    baseUrl: "https://api.x.ai/v1",
    models: ["grok-3-mini", "grok-3-fast", "grok-2-latest", "grok-beta"]
  },
  groq: {
    baseUrl: "https://api.groq.com/openai/v1",
    models: [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "groq/compound-mini",
      "openai/gpt-oss-20b"
    ]
  }
};
const LOCAL_EMBEDDING_DIMENSIONS = 768;

function getApiKey() {
  const apiKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROK_API_KEY (or XAI_API_KEY) environment variable.");
  }

  return apiKey;
}

function getProvider() {
  const explicitProvider = process.env.GROK_PROVIDER?.trim().toLowerCase();
  if (explicitProvider === "xai" || explicitProvider === "groq") {
    return explicitProvider;
  }

  const baseUrl = process.env.GROK_API_BASE_URL?.trim().toLowerCase();
  if (baseUrl?.includes("groq.com")) {
    return "groq";
  }

  const apiKey = getApiKey();
  if (apiKey.startsWith("gsk_")) {
    return "groq";
  }

  return "xai";
}

function getApiBaseUrl() {
  const provider = getProvider();
  return (process.env.GROK_API_BASE_URL || PROVIDER_DEFAULTS[provider].baseUrl).replace(/\/$/, "");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry(operation, retries = DEFAULT_RETRIES) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        break;
      }

      await sleep(DEFAULT_DELAY * (attempt + 1));
    }
  }

  throw lastError;
}

function getConfiguredTextModels() {
  const provider = getProvider();
  const configuredModel = process.env.GROK_MODEL?.trim();
  const defaults = PROVIDER_DEFAULTS[provider].models;

  return configuredModel
    ? [configuredModel, ...defaults.filter((model) => model !== configuredModel)]
    : defaults;
}

function isModelAvailabilityError(error) {
  const message = String(error?.message || error || "").toLowerCase();
  const status = Number(error?.status) || 0;

  return (
    status === 404 ||
    (status === 400 &&
      (message.includes("model") ||
        message.includes("invalid_request_error") ||
        message.includes("unsupported"))) ||
    message.includes("404") ||
    message.includes("model") && (message.includes("not found") || message.includes("not supported") || message.includes("does not exist"))
  );
}

async function parseErrorResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const payload = await response.json();
      return payload?.error?.message || payload?.message || JSON.stringify(payload) || response.statusText;
    }

    const text = await response.text();
    return text?.trim() || response.statusText;
  } catch {
    return response.statusText || "Request failed";
  }
}

function buildMessages(prompt, systemInstruction) {
  const messages = [];

  if (systemInstruction?.trim()) {
    messages.push({ role: "system", content: systemInstruction.trim() });
  }

  messages.push({ role: "user", content: prompt });

  return messages;
}

async function requestChatCompletion({ prompt, systemInstruction, modelName, stream = false }) {
  const response = await fetch(`${getApiBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`
    },
    body: JSON.stringify({
      model: modelName,
      messages: buildMessages(prompt, systemInstruction),
      temperature: 0.9,
      top_p: 0.9,
      max_tokens: 4096,
      stream
    })
  });

  if (!response.ok) {
    const message = await parseErrorResponse(response);
    const error = new Error(`[${response.status}] ${message}`);
    error.status = response.status;
    throw error;
  }

  return response;
}

function contentToText(content) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        return typeof part?.text === "string" ? part.text : "";
      })
      .join("");
  }

  return "";
}

function extractTextFromCompletion(payload) {
  const firstChoice = payload?.choices?.[0];
  const delta = firstChoice?.delta;

  if (delta && Object.prototype.hasOwnProperty.call(delta, "content")) {
    return contentToText(delta.content);
  }

  return contentToText(firstChoice?.message?.content);
}

async function* iterateSsePayloads(response) {
  if (!response.body) {
    throw new Error("Grok did not return a streaming response body.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });

    while (true) {
      const newlineIndex = buffer.indexOf("\n");

      if (newlineIndex < 0) {
        break;
      }

      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);

      if (!line || line.startsWith(":")) {
        continue;
      }

      if (!line.startsWith("data:")) {
        continue;
      }

      const data = line.slice(5).trim();

      if (data === "[DONE]") {
        return;
      }

      try {
        yield JSON.parse(data);
      } catch {
        // Ignore keep-alive or partial SSE payloads.
      }
    }
  }

  const finalLine = buffer.trim();

  if (finalLine.startsWith("data:")) {
    const data = finalLine.slice(5).trim();

    if (data && data !== "[DONE]") {
      try {
        yield JSON.parse(data);
      } catch {
        // Ignore trailing malformed payload.
      }
    }
  }
}

export async function generateText({ prompt, systemInstruction }) {
  return withTextModelFallback(async (modelName) => {
    const response = await withRetry(() =>
      requestChatCompletion({
        prompt,
        systemInstruction,
        modelName,
        stream: false
      })
    );

    const payload = await response.json();
    return extractTextFromCompletion(payload);
  });
}

export async function generateTextStream({ prompt, systemInstruction }) {
  return withTextModelFallback(async (modelName) => {
    const response = await withRetry(() =>
      requestChatCompletion({
        prompt,
        systemInstruction,
        modelName,
        stream: true
      })
    );

    return {
      stream: (async function* () {
        for await (const payload of iterateSsePayloads(response)) {
          const text = extractTextFromCompletion(payload);

          if (text) {
            yield {
              text: () => text
            };
          }
        }
      })()
    };
  });
}

async function withTextModelFallback(operation) {
  let lastError;
  const provider = getProvider();

  for (const modelName of getConfiguredTextModels()) {
    try {
      return await operation(modelName);
    } catch (error) {
      lastError = error;

      if (!isModelAvailabilityError(error)) {
        throw error;
      }
    }
  }

  throw new Error(
    `No configured text model is available for provider "${provider}". Tried: ${getConfiguredTextModels().join(", ")}. Last error: ${lastError?.message || lastError}`
  );
}

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .match(/[a-z0-9]+(?:['-][a-z0-9]+)*/g) || [];
}

function hashToken(token) {
  return Number.parseInt(createHash("sha1").update(token).digest("hex").slice(0, 8), 16) >>> 0;
}

function normalizeVector(vector) {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));

  if (!magnitude) {
    return vector;
  }

  return vector.map((value) => value / magnitude);
}

export async function embedText(text) {
  const content = String(text || "").trim();

  if (!content) {
    return [];
  }

  const tokens = tokenize(content);
  const vector = new Array(LOCAL_EMBEDDING_DIMENSIONS).fill(0);

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    const index = hashToken(token) % LOCAL_EMBEDDING_DIMENSIONS;
    vector[index] += 1;

    if (i < tokens.length - 1) {
      const bigram = `${token}_${tokens[i + 1]}`;
      const bigramIndex = hashToken(bigram) % LOCAL_EMBEDDING_DIMENSIONS;
      vector[bigramIndex] += 0.5;
    }
  }

  return normalizeVector(vector);
}
