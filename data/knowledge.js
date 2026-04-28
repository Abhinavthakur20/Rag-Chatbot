export const toolRules = [
  {
    tool: "Midjourney",
    syntax: "descriptive prompt, emotional scene details, style cues --ar [ratio] --style raw --v 6.1 --q [quality]",
    tips: "Use :: for emphasis, prioritize evocative visuals over camera jargon, keep the scene tactile and concise.",
    negativeFormat: "--no text, watermark, blur, extra fingers"
  },
  {
    tool: "Flux",
    syntax: "natural language scene description with layered subject, lighting, texture, and realism cues",
    tips: "Flux responds well to grounded lighting, material detail, and concise aesthetic intent.",
    negativeFormat: "append a short negative clause like 'avoid text, artifacts, distorted hands'"
  },
  {
    tool: "Ideogram",
    syntax: "clear visual concept, composition, subject styling, optional typography instructions, aspect ratio note",
    tips: "Be explicit about layout and clean composition; mention headline-safe negative space when useful.",
    negativeFormat: "state exclusions in plain language at the end"
  },
  {
    tool: "Stable Diffusion",
    syntax: "weighted visual prompt, quality descriptors, lens or render cues, aspect ratio note if supported by workflow",
    tips: "Use compact descriptive fragments, strong style anchors, and keep negatives separate and detailed.",
    negativeFormat: "separate negative prompt field with defects and unwanted styles"
  },
  {
    tool: "Veo 3",
    syntax: "cinematic shot description with subject, environment, action, movement, lighting, mood, and optional audio cue",
    tips: "Describe shot type, motion, and emotional arc clearly; film references work well.",
    negativeFormat: "state what not to include at the end of the prompt"
  },
  {
    tool: "Kling",
    syntax: "subject, environment, action, camera movement, style, and beginning-to-end state change",
    tips: "Be explicit about motion, pacing, and where the emotional shift happens.",
    negativeFormat: "negative prompt field separately"
  },
  {
    tool: "Runway",
    syntax: "shot-by-shot cinematic prompt with scene, movement, pacing, tone, and edit rhythm",
    tips: "Runway benefits from practical camera language and a clean, direct narrative beat.",
    negativeFormat: "final sentence listing artifacts or themes to avoid"
  },
  {
    tool: "Sora",
    syntax: "high-fidelity natural language describing scene physics, motion, framing, and emotional continuity",
    tips: "Use precise spatial details, cause-and-effect motion, and consistent character behavior.",
    negativeFormat: "plain-language exclusions at the end"
  },
  {
    tool: "Pika",
    syntax: "short-form motion prompt with subject, action, visual style, camera cue, and ending beat",
    tips: "Keep the action readable and energetic; call out loop or reveal moments when helpful.",
    negativeFormat: "brief separate negatives or final exclusions clause"
  }
];

export const nicheContext = {
  niche: "companionship app ads",
  targetEmotion: ["loneliness", "connection", "warmth", "being understood"],
  avoidWords: ["explicit", "suggestive clothing descriptions"],
  bestPerformingThemes: [
    "late night phone glow",
    "cozy reading messages",
    "soft smile reaction",
    "rain on window lonely then happy"
  ]
};

export const creativeDirectionGuidelines = {
  title: "Soft-romance cinematic direction",
  content:
    "Translate raw ideas into premium editorial language, prioritize emotion over explicitness, and keep all outputs mainstream-safe. Substitute explicit concepts with cinematic phrasing: alluring presence, magnetic gaze, high-fashion editorial mood, translucent silk, chiaroscuro shadows, backlit silhouettes, intimate sanctuary, rumpled linens, subtle physical proximity, shared warmth, and blurred foreground intimacy. Use the loneliness arc with cold or desaturated before-state lighting and wide framing, then shift into connection through warm phone glow, amber practicals, close-ups on eyes or micro-smiles, natural skin texture, messy hair, and tactile fabric detail."
};

export const promptFormulas = [
  {
    type: "image",
    formula: "[character] + [action] + [environment] + [art style] + [lighting] + [mood] + [details] + [technical params]"
  },
  {
    type: "video",
    formula: "[subject] + [environment] + [action] + [camera shot] + [camera movement] + [visual style] + [mood arc]"
  }
];

export const promptExamples = [
  {
    title: "Lonely Phone Glow Portrait",
    type: "image",
    tool: "Midjourney",
    prompt: "young woman with chestnut bob, sitting on the edge of a bed in a dim apartment, blue phone light washing over her face, eyes tired but hopeful, rain mapping the window behind her, cinematic realism, warm lamp haze mixing with cool midnight shadows, intimate framing, quiet emotional tension, premium ad photography --ar 9:16 --style raw --v 6.1 --q 2 --no text, watermark, blur"
  },
  {
    title: "Cafe Connection Reveal",
    type: "video",
    tool: "Kling",
    prompt: "young man in a quiet cafe booth scrolling his phone alone, soft rainy afternoon outside, he reads a heartfelt message and his expression slowly softens into a surprised smile, begin with a static medium shot then a gentle push-in, subtle hand movement, warm editorial color grade, loneliness shifting into connection, end with relaxed shoulders and a brighter gaze"
  },
  {
    title: "Soft Balcony Warmth",
    type: "image",
    tool: "Flux",
    prompt: "young woman in an oversized knit sweater on a sunset balcony, holding her phone close to her chest after reading a sweet message, soft golden haze, natural skin detail, warm film palette, city lights beginning to bloom in the distance, quiet tenderness, premium lifestyle advertising feel, avoid text, artifacts, distorted hands"
  },
  {
    title: "Late Night Message Reaction",
    type: "video",
    tool: "Veo 3",
    prompt: "close-up cinematic shot of a young woman lying in bed under warm blankets, dark room lit by a phone screen, she reads a message, her worried expression melts into a tiny relieved smile, slow dolly in, shallow depth of field, soft tungsten practical light, intimate hopeful mood, faint rain ambience, avoid text overlays and visual glitches"
  },
  {
    title: "Reading Together Feeling",
    type: "image",
    tool: "Ideogram",
    prompt: "cozy living room scene, ambiguous young adult curled into a sofa reading thoughtful messages on a phone, mug of tea nearby, soft cream lamp glow, editorial composition with negative space for ad copy, warm and understood emotional tone, realistic lifestyle photography, state exclusions: no blur, no watermark, no clutter"
  },
  {
    title: "City Night Hope Shift",
    type: "video",
    tool: "Runway",
    prompt: "begin with a wide shot of a woman walking alone through a city at night under reflective neon, cut to her stopping under a streetlight as her phone vibrates, medium close-up as she reads and smiles softly, handheld camera easing into steadier movement, moody commercial lighting, emotional shift from isolation to comfort, avoid crowds, text overlays, artifacts"
  },
  {
    title: "Window Reflection Romance",
    type: "image",
    tool: "Stable Diffusion",
    prompt: "(young couple on a video call:1.2), one partner reflected in a rainy window, tender eye contact, soft apartment lamp glow, warm film still, realistic skin texture, emotional intimacy, premium advertisement, 50mm portrait framing"
  },
  {
    title: "Nature Walk Encouragement",
    type: "video",
    tool: "Sora",
    prompt: "a young man walking alone on a quiet nature path at golden hour, he checks his phone, pauses, and smiles with visible relief, breeze moving through trees and jacket fabric, camera tracks beside him before easing into a frontal medium shot, realistic motion physics, warm cinematic palette, feeling understood, exclude logos and captions"
  },
  {
    title: "Commercial Smile Beat",
    type: "video",
    tool: "Pika",
    prompt: "portrait of a young woman in a cozy bedroom, looking lonely at first, then reading a message and breaking into a genuine smile, gentle push-in camera move, soft aesthetic lighting, warm commercial finish, end on bright eyes and relaxed expression, avoid blur and malformed hands"
  },
  {
    title: "Balcony Reflection Editorial",
    type: "image",
    tool: "Midjourney",
    prompt: "young man with dark curls on a twilight balcony, distant skyline bokeh, phone screen illuminating a thoughtful face that slowly brightens, editorial fashion realism, soft breeze, subtle film grain, emotional vulnerability, premium ad concept --ar 4:5 --style raw --v 6.1 --q 2 --no text, blur, watermark"
  },
  {
    title: "Couple Comfort Carousel",
    type: "image",
    tool: "Flux",
    prompt: "carousel ad frame of a couple sharing a quiet smile over messages on a sofa, warm practical lamp light, tactile fabric detail, polished commercial composition, companionship and reassurance, realistic photography, avoid text, clutter, oversaturation"
  },
  {
    title: "Soft Morning Follow-Up",
    type: "image",
    tool: "Ideogram",
    prompt: "morning bedroom with soft white curtains, young woman smiling gently at a new message while sitting cross-legged on bed, airy editorial framing, pastel warmth, smartphone app ad concept with negative space, high trust emotional tone, no watermark, no blur, no distracting props"
  },
  {
    title: "Lonely City Window To Warm Notification",
    type: "image",
    tool: "Midjourney",
    prompt: "young woman on a city bus at night, neon reflections sliding across the window, distant expression shifting into a soft smile as her phone lights up, subtle hand-to-heart gesture, cinematic realism, amber practical highlights, shallow depth of field, natural skin texture, premium ad still, emotional arc from isolation to comfort --ar 9:16 --style raw --v 6.1 --q 2 --no text, watermark, blur, explicit content"
  },
  {
    title: "Crosswalk Rain To Safe Haven",
    type: "video",
    tool: "Kling",
    prompt: "young man pauses at a rainy downtown crosswalk at dusk, checks his phone and breathes out with visible relief, expression warms from guarded to hopeful, begin wide with ambient traffic bokeh then push into a gentle medium close-up, subtle handheld stabilization, soft rim lighting, polished commercial color grade, loneliness transitioning into reassurance, avoid logos, captions, glitches, explicit content"
  },
  {
    title: "Rooftop Voice Note Comfort",
    type: "video",
    tool: "Sora",
    prompt: "twilight rooftop scene with a young woman leaning on a railing above a dense city skyline, wind moving hair and jacket naturally, she listens to a voice note and smiles with calm eyes, camera tracks from profile to frontal close-up, volumetric city haze, warm practical light on skin, cinematic realism, emotional beat of being seen and supported, exclude text overlays, distortions, explicit themes"
  }
];

export const toolRuleMap = Object.fromEntries(toolRules.map((rule) => [rule.tool, rule]));

export const knowledgeDocuments = [
  ...toolRules.map((rule) => ({
    id: `tool-${rule.tool.toLowerCase().replace(/\s+/g, "-")}`,
    category: "tool",
    title: `${rule.tool} syntax rules`,
    content: `${rule.tool} syntax: ${rule.syntax}. Tips: ${rule.tips}. Negative prompt format: ${rule.negativeFormat}.`
  })),
  {
    id: "niche-context",
    category: "niche",
    title: "Companionship app niche context",
    content: `Niche: ${nicheContext.niche}. Target emotion: ${nicheContext.targetEmotion.join(", ")}. Avoid words or descriptions: ${nicheContext.avoidWords.join(", ")}. Best performing themes: ${nicheContext.bestPerformingThemes.join(", ")}.`
  },
  {
    id: "creative-direction-guidelines",
    category: "style-guide",
    title: creativeDirectionGuidelines.title,
    content: creativeDirectionGuidelines.content
  },
  ...promptFormulas.map((formula) => ({
    id: `formula-${formula.type}`,
    category: "formula",
    title: `${formula.type} prompt formula`,
    content: `${formula.type} formula: ${formula.formula}.`
  })),
  ...promptExamples.map((example, index) => ({
    id: `example-${index + 1}`,
    category: "example",
    title: `${example.title} (${example.tool})`,
    content: `Example ${example.type} prompt for ${example.tool}: ${example.prompt}`
  }))
];
