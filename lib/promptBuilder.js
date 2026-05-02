import { toolRuleMap } from "@/data/knowledge";

export const contentTypes = ["Image Ad", "Video Ad", "Story Ad", "Carousel Ad"];
export const moods = [
  "Loneliness",
  "Comfort",
  "Connection",
  "Romance",
  "Warmth",
  "Understanding",
  "Playful",
  "Nostalgic"
];
export const characters = ["Young Woman", "Young Man", "Couple", "Ambiguous"];
export const environments = [
  "Cozy Bedroom",
  "Cafe",
  "Rainy Window",
  "City Night",
  "Sunset Balcony",
  "Soft Living Room",
  "Nature Walk",
  "Late-Night Phone Scroll",
  "Empty Apartment Evening",
  "After-Work Commute",
  "Rainy Bus Stop",
  "Window Seat on Train",
  "Quiet Library Corner",
  "Rooftop at Dusk",
  "Park Bench at Golden Hour",
  "Morning Kitchen Light",
  "Bedroom Mirror Moment",
  "Nighttime Streetlight Walk",
  "Cozy Blanket on Sofa",
  "Work Desk Break",
  "Airport Waiting Lounge",
  "Bookstore Aisle",
  "Beach Sunset Stroll",
  "Festival Lights Evening",
  "Weekend Farmer's Market",
  "Snowy Window Morning",
  "Gym Cool-Down Corner",
  "College Campus Pathway"
];
export const styles = [
  "Cinematic",
  "Editorial",
  "Soft Aesthetic",
  "Realistic",
  "Anime",
  "Dark Moody",
  "Warm Film",
  "Commercial"
];
export const aspectRatios = ["1:1", "9:16", "16:9", "4:5"];
export const qualityLevels = ["Standard", "High", "Ultra"];
export const variationOptions = [1, 3, 5];

const ARTISTIC_SUBSTITUTION_GUIDE = `
- CONCEPT [Sexy or explicit] -> SUBSTITUTE WITH: alluring presence, magnetic gaze, high-fashion editorial mood, cinematic beauty.
- CONCEPT [Naked or revealing] -> SUBSTITUTE WITH: translucent silk, chiaroscuro shadows, backlit silhouettes, sheer textures, draped linens.
- CONCEPT [Sexual or bed-focused] -> SUBSTITUTE WITH: intimate sanctuary, rumpled sheets, morning-after atmosphere, soft lounge setting.
- CONCEPT [Touching] -> SUBSTITUTE WITH: subtle physical proximity, hand grazing a cheek, shared warmth, blurred foreground intimacy.
`.trim();

const AD_PSYCHOLOGY_CONTEXT = `
- LONELINESS ARC: Use cold, blue, or desaturated lighting for before states. Use wider framing to make the environment feel quiet and spacious.
- CONNECTION ARC: Use motivated smartphone glow, amber practicals, golden-hour warmth, and close-ups on eyes or micro-smiles to show comfort arriving.
- INTIMACY ANCHOR: Prioritize natural skin texture, messy hair, authentic micro-expressions, and tactile fabric details to create believable companionship.
`.trim();

export function normalizeSelections(selections = {}, mode = "companionship") {
  const tool = selections.tool || "";
  const toolRule = tool ? toolRuleMap[tool] || null : null;

  if (mode === "product") {
    return {
      productCategory: selections.productCategory || "",
      shotType: selections.shotType || "",
      mood: selections.mood || "",
      environment: selections.environment || "",
      lighting: selections.lighting || "",
      tool,
      toolRule,
      aspectRatio: selections.aspectRatio || "1:1"
    };
  }

  return {
    contentType: selections.contentType || "",
    mood: selections.mood || "",
    character: selections.character || "",
    characterDetails: selections.characterDetails || {
      hairColor: "",
      ageRange: "",
      expression: ""
    },
    environment: selections.environment || "",
    tool,
    toolRule,
    style: selections.style || "",
    aspectRatio: selections.aspectRatio || "9:16",
    quality: selections.quality || "High"
  };
}

export function summarizeSelections(selections = {}, mode = "companionship") {
  const normalized = normalizeSelections(selections, mode);
  const { toolRule } = normalized;

  if (mode === "product") {
    return {
      ...normalized,
      toolSyntax: toolRule?.syntax || "",
      toolTips: toolRule?.tips || "",
      toolNegativeFormat: toolRule?.negativeFormat || ""
    };
  }

  const { characterDetails } = normalized;
  const detailParts = [
    characterDetails.hairColor && `hair: ${characterDetails.hairColor}`,
    characterDetails.ageRange && `age range: ${characterDetails.ageRange}`,
    characterDetails.expression && `expression: ${characterDetails.expression}`
  ].filter(Boolean);

  return {
    ...normalized,
    characterDescription: detailParts.length
      ? `${normalized.character} (${detailParts.join(", ")})`
      : normalized.character,
    toolSyntax: toolRule?.syntax || "",
    toolTips: toolRule?.tips || "",
    toolNegativeFormat: toolRule?.negativeFormat || ""
  };
}

export function buildRetrievalQuery({
  selections = {},
  roughPrompt = "",
  negativePrompt = "",
  currentPrompt = "",
  messages = [],
  mode = "companionship"
}) {
  const summary = summarizeSelections(selections, mode);
  const latestMessage = messages.length ? messages[messages.length - 1].content : "";

  if (mode === "product") {
    return [
      "Product Ad",
      summary.productCategory,
      summary.shotType,
      summary.mood,
      summary.environment,
      summary.lighting,
      summary.tool,
      summary.aspectRatio,
      roughPrompt,
      negativePrompt,
      currentPrompt,
      latestMessage
    ]
      .filter(Boolean)
      .join(" | ");
  }

  return [
    "Companionship Ad",
    summary.contentType,
    summary.mood,
    summary.characterDescription,
    summary.environment,
    summary.tool,
    summary.style,
    summary.aspectRatio,
    summary.quality,
    roughPrompt,
    negativePrompt,
    currentPrompt,
    latestMessage
  ]
    .filter(Boolean)
    .join(" | ");
}

export function formatSelectionLines(selections = {}, mode = "companionship") {
  const summary = summarizeSelections(selections, mode);

  if (mode === "product") {
    return [
      `Product Category: ${summary.productCategory || "Not selected"}`,
      `Shot Type: ${summary.shotType || "Not selected"}`,
      `Mood/Feel: ${summary.mood || "Not selected"}`,
      `Environment: ${summary.environment || "Not selected"}`,
      `Lighting: ${summary.lighting || "Not selected"}`,
      `Tool target: ${summary.tool || "Not selected"}`,
      `Tool syntax rule: ${summary.toolSyntax || "None"}`,
      `Tool tips: ${summary.toolTips || "None"}`,
      `Aspect ratio: ${summary.aspectRatio}`
    ].join("\n");
  }

  return [
    `Content type: ${summary.contentType || "Not selected"}`,
    `Mood/emotion: ${summary.mood || "Not selected"}`,
    `Character: ${summary.characterDescription || "Not selected"}`,
    `Environment: ${summary.environment || "Not selected"}`,
    `Tool target: ${summary.tool || "Not selected"}`,
    `Tool syntax rule: ${summary.toolSyntax || "None"}`,
    `Tool tips: ${summary.toolTips || "None"}`,
    `Style preference: ${summary.style || "Not selected"}`,
    `Aspect ratio: ${summary.aspectRatio}`,
    `Quality: ${summary.quality}`
  ].join("\n");
}

export function buildGenerationPrompt({
  ragContext,
  selections,
  roughPrompt,
  negativePrompt,
  variations,
  mode = "companionship"
}) {
  const selectionLines = formatSelectionLines(selections, mode);

  if (mode === "product") {
    return `
### ROLE: MASTER PRODUCT PHOTOGRAPHER & CGI DIRECTOR
You specialize in ultra-high-end product advertising prompts.
Transform the product details into a masterpiece of lighting, texture, and commercial appeal.

### PRODUCTION REQUIREMENTS
1. Tool syntax: Follow the exact syntax rules for the target tool.
2. Lighting: Explicitly define lighting setups (Rim light, God rays, Softbox, etc.).
3. Texture & Material: Describe the product's material (brushed steel, frosted glass, obsidian, etc.) and how it reacts to light.
4. Composition: Use professional camera language (Macro, Low-angle hero, 85mm, etc.).
5. Brand Aesthetic: Align with luxury or high-performance brand standards.

### DATA INPUTS
[RETRIEVED KNOWLEDGE BASE]:
${ragContext}

[PRODUCT CONFIGURATION]:
${selectionLines}

[PRODUCT IDEA]:
"${roughPrompt || "A premium product hero shot"}"

[NEGATIVE GUIDANCE]:
Avoid: ${negativePrompt || "clutter, dust, scratches, low-res, distorted labels, hands, human elements unless requested"}.

### OUTPUT INSTRUCTIONS
Generate ${variations} prompt variations.
Return only valid JSON as an array of objects with this exact shape:
[
  {
    "prompt": "The full technical string",
    "negativePrompt": "Specific negatives for this product scene",
    "why": "Analysis of the lighting/material choices",
    "qualityScore": 95,
    "techniques": ["Macro detail", "God rays", "Ray-traced reflections"],
    "notes": "Advice on material rendering"
  }
]
`.trim();
  }

  return `
### ROLE: SENIOR CREATIVE DIRECTOR & LEAD PROMPT ENGINEER
You are a master of visual psychology, specializing in high-conversion companionship ads.
Transform rough ideas into high-end cinematic prompts that capture deep emotional intimacy while strictly staying safe for mainstream advertising.

### SAFE INTIMACY PROTOCOL
Translate suggestive or soft-romance concepts into professional photography and cinematography terminology.
Do not output explicit sexual language or unsafe content.
${ARTISTIC_SUBSTITUTION_GUIDE}

### VISUAL PSYCHOLOGY & NICHE CONTEXT
${AD_PSYCHOLOGY_CONTEXT}

### PRODUCTION REQUIREMENTS
1. Tool syntax: Follow the exact syntax rules for the target tool.
2. Camera specs: Include high-end gear language such as 85mm f/1.8 lens, shallow depth of field, 4K texture detail, motion blur, or macro detail when relevant.
3. Lighting: Define motivated light sources such as smartphone glow, golden-hour rim light, low-key chiaroscuro, or volumetric dust motes.
4. Character consistency: Use physical anchors such as hair texture, eye color, expression, wardrobe detail, or signature prop across variations.
5. Emotional trigger: Build the arc from loneliness to comfort, warmth, being seen, and safe connection.
6. Safety: Keep every output suitable for mainstream ad creatives.

### DATA INPUTS
[RETRIEVED KNOWLEDGE BASE]:
${ragContext}

[USER CONFIGURATION]:
${selectionLines}

[USER ROUGH IDEA]:
"${roughPrompt || "A lonely soul finding comfort through a digital connection"}"

[NEGATIVE GUIDANCE]:
Avoid: ${negativePrompt || "cartoonish, low-res, distorted limbs, explicit/NSFW keywords"}.

### OUTPUT INSTRUCTIONS
Generate ${variations} prompt variations.
Each variation must feel specific, cinematic, and production-ready.
Return only valid JSON as an array of objects with this exact shape:
[
  {
    "prompt": "The full technical string",
    "negativePrompt": "Specific negatives for this scene",
    "why": "Analysis of how this specific lighting/composition triggers connection",
    "qualityScore": 95,
    "techniques": ["Chiaroscuro lighting", "85mm portraiture", "Emotional resonance"],
    "notes": "Instruction on how to handle the tool-specific motion/style"
  }
]
`.trim();
}

export function buildChatPrompt({
  ragContext,
  selections,
  messages,
  currentPrompt,
  mode = "companionship"
}) {
  const selectionLines = formatSelectionLines(selections, mode);
  const transcript = messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n");

  if (mode === "product") {
    return `
### ROLE: SENIOR PRODUCT DIRECTOR
You are helping a creator refine high-end commercial product prompts.
Focus on material physics, lighting precision, and commercial appeal.

### CURRENT PROJECT STATE
[PRODUCT KNOWLEDGE]:
${ragContext}

[SAVED SETTINGS]:
${selectionLines}

[PROMPT UNDER REFINEMENT]:
${currentPrompt || "Starting a new product concept"}

### CONVERSATION HISTORY
${transcript}

### ASSISTANT RESPONSE GOAL
Respond naturally and expertly. If asked for a prompt, provide the full optimized version first, then a brief analysis of the lighting and material techniques used to achieve a premium look.
`.trim();
  }

  return `
### ROLE: INTERACTIVE CREATIVE PARTNER
You are a collaborative AI director helping a creator refine soft-romance ad creatives for companionship app campaigns.

### CONTEXTUAL GUIDELINES
1. Translation: If the user describes something suggestive, translate it into the Safe Intimacy Protocol using cinematic, editorial, and emotional language.
2. Continuity: Preserve the character's physical description, wardrobe anchors, emotional state, and environment across the conversation.
3. Analysis: Explain why changes like warm amber lighting, phone glow, or tighter close-ups help solve the loneliness-to-connection niche.
4. Tool craft: Keep syntax and motion/style rules aligned to the selected target tool.
5. Safety: Keep outputs suitable for mainstream advertising.

### SAFE INTIMACY PROTOCOL
${ARTISTIC_SUBSTITUTION_GUIDE}

### VISUAL PSYCHOLOGY
${AD_PSYCHOLOGY_CONTEXT}

### CURRENT PROJECT STATE
[NICHE KNOWLEDGE]:
${ragContext}

[SAVED SETTINGS]:
${selectionLines}

[PROMPT UNDER REFINEMENT]:
${currentPrompt || "Starting a new creative concept"}

### CONVERSATION HISTORY
${transcript}

### ASSISTANT RESPONSE GOAL
Respond naturally. If asked for a prompt, provide the full optimized version first, then a brief analysis of the cinematic techniques used to preserve safety and create high-quality allure.
`.trim();
}

export function parseGenerationResponse(text, fallbackCount = 1) {
  const jsonBlock = text.match(/\[[\s\S]*\]/);
  const raw = jsonBlock ? jsonBlock[0] : text;

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item, index) => ({
        id: `${index + 1}-${Date.now()}`,
        prompt: item.prompt || "",
        negativePrompt: item.negativePrompt || "",
        why: item.why || "",
        qualityScore: Number(item.qualityScore) || 80,
        techniques: Array.isArray(item.techniques) ? item.techniques : [],
        notes: item.notes || item.why || ""
      }));
    }
  } catch (error) {
    return buildFallbackPrompts(text, fallbackCount);
  }

  return buildFallbackPrompts(text, fallbackCount);
}

function buildFallbackPrompts(text, count) {
  const promptText = text.trim();
  return Array.from({ length: count }, (_, index) => ({
    id: `${index + 1}-${Date.now()}`,
    prompt: promptText,
    negativePrompt: "",
    why: "",
    qualityScore: 80,
    techniques: ["tool-specific structure", "fallback parsing"],
    notes: "The model returned non-JSON text, so the raw response was preserved."
  }));
}
