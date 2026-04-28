import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { knowledgeDocuments } from "@/data/knowledge";
import { embedText } from "@/lib/grok";

const MATCH_THRESHOLD = Number(process.env.RAG_MATCH_THRESHOLD || 0.3);
const DEFAULT_MATCH_LIMIT = 4;
const SEED_BATCH_SIZE = 10;

const globalCache = globalThis.__ragbotIndexCache || {
  indexPromise: null,
  supabase: null
};

globalThis.__ragbotIndexCache = globalCache;

function isKnowledgeStoreSetupError(message) {
  const text = String(message || "").toLowerCase();
  return (
    text.includes("could not find the table") ||
    text.includes("public.documents") ||
    text.includes('relation "documents" does not exist') ||
    text.includes("schema cache") ||
    text.includes("missing supabase env vars")
  );
}

function buildInMemoryFallback(limit) {
  const count = Number(limit) || DEFAULT_MATCH_LIMIT;
  return knowledgeDocuments.slice(0, count).map((document) => ({
    score: 0,
    id: document.id,
    category: document.category || "knowledge",
    title: document.title || "Knowledge snippet",
    text: document.content
  }));
}

function getSupabaseClient() {
  if (globalCache.supabase) {
    return globalCache.supabase;
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Set SUPABASE_URL + SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }

  globalCache.supabase = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return globalCache.supabase;
}

function getKnowledgeVersion() {
  return createHash("sha1")
    .update(JSON.stringify(knowledgeDocuments))
    .digest("hex")
    .slice(0, 12);
}

async function seedBuiltInKnowledgeIfNeeded() {
  const supabase = getSupabaseClient();
  const version = getKnowledgeVersion();

  const { count, error: countError } = await supabase
    .from("documents")
    .select("id", { count: "exact", head: true })
    .eq("metadata->>source", "ragbot_builtin")
    .eq("metadata->>version", version);

  if (countError) {
    if (isKnowledgeStoreSetupError(countError.message)) {
      return;
    }
    throw new Error(`Failed to check documents in Supabase: ${countError.message}`);
  }

  if ((count || 0) >= knowledgeDocuments.length) {
    return;
  }

  for (let i = 0; i < knowledgeDocuments.length; i += SEED_BATCH_SIZE) {
    const batch = knowledgeDocuments.slice(i, i + SEED_BATCH_SIZE);
    const rows = [];

    for (const document of batch) {
      const embedding = await embedText(document.content);
      rows.push({
        content: document.content,
        embedding,
        metadata: {
          source: "ragbot_builtin",
          version,
          sourceId: document.id,
          category: document.category,
          title: document.title
        }
      });
    }

    const { error: insertError } = await supabase.from("documents").insert(rows);

    if (insertError) {
      if (isKnowledgeStoreSetupError(insertError.message)) {
        return;
      }
      throw new Error(`Failed to seed built-in knowledge: ${insertError.message}`);
    }
  }
}

export async function storeDocument(content, metadata = {}) {
  const supabase = getSupabaseClient();
  const text = String(content || "").trim();

  if (!text) {
    return;
  }

  const embedding = await embedText(text);
  const { error } = await supabase.from("documents").insert({
    content: text,
    embedding,
    metadata
  });

  if (error) {
    throw new Error(`Failed to store document: ${error.message}`);
  }
}

export async function ensureKnowledgeIndex() {
  if (!globalCache.indexPromise) {
    globalCache.indexPromise = seedBuiltInKnowledgeIfNeeded().catch((error) => {
      globalCache.indexPromise = null;
      throw error;
    });
  }

  return globalCache.indexPromise;
}

export async function retrieveRelevantContext(query, limit = 4) {
  const matchCount = Number(limit) || DEFAULT_MATCH_LIMIT;
  let supabase = null;

  try {
    await ensureKnowledgeIndex();
    supabase = getSupabaseClient();
  } catch (error) {
    if (isKnowledgeStoreSetupError(error?.message)) {
      return buildInMemoryFallback(matchCount);
    }
    throw error;
  }

  const vector = await embedText(query);

  if (!vector.length) {
    return [];
  }

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: vector,
    match_threshold: MATCH_THRESHOLD,
    match_count: matchCount
  });

  if (error) {
    const message = String(error.message || "");
    const isMissingFunction =
      message.includes("Could not find the function") || message.includes("schema cache");

    if (isKnowledgeStoreSetupError(message)) {
      return buildInMemoryFallback(matchCount);
    }

    if (!isMissingFunction) {
      throw new Error(`Supabase match_documents failed: ${error.message}`);
    }

    // Graceful fallback for local setups where RPC has not been created yet.
    const version = getKnowledgeVersion();
    const { data: fallbackRows, error: fallbackError } = await supabase
      .from("documents")
      .select("id, content, metadata")
      .eq("metadata->>source", "ragbot_builtin")
      .eq("metadata->>version", version)
      .limit(matchCount);

    if (fallbackError) {
      if (isKnowledgeStoreSetupError(fallbackError.message)) {
        return buildInMemoryFallback(matchCount);
      }
      throw new Error(
        `Supabase match_documents is missing and fallback query failed: ${fallbackError.message}`
      );
    }

    return (fallbackRows || []).map((row) => ({
      score: 0,
      id: row?.metadata?.sourceId || row.id,
      category: row?.metadata?.category || "knowledge",
      title: row?.metadata?.title || "Knowledge snippet",
      text: row.content
    }));
  }

  return (data || []).map((row) => ({
    score: row.similarity || 0,
    id: row?.metadata?.sourceId || row.id,
    category: row?.metadata?.category || "knowledge",
    title: row?.metadata?.title || "Knowledge snippet",
    text: row.content
  }));
}

export async function retrieveContext(query, limit = 5) {
  const rows = await retrieveRelevantContext(query, limit);
  return rows.map((row) => row.text).join("\n\n");
}

export function serializeContext(items) {
  if (!items.length) {
    return "No matching knowledge chunks were retrieved.";
  }

  return items
    .map(
      (item, index) =>
        `[${index + 1}] ${item.title}\nCategory: ${item.category}\nRelevance: ${item.score.toFixed(3)}\n${item.text}`
    )
    .join("\n\n");
}
