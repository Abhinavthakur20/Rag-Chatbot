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

export const emotionalArcTemplates = [
  {
    id: "arc-isolation-to-connection",
    name: "Isolation → Connection",
    description: "The core arc of every companionship ad",
    beforeState: { lighting: "cold blue or desaturated, underexposed, harsh shadows", composition: "wide shot, subject small in frame, negative space heavy", bodyLanguage: "hunched shoulders, downcast eyes, arms crossed, stillness", colorGrade: "cool tones, muted saturation, grey-blue palette", environment: "empty room, crowded-but-alone public space, dark apartment" },
    transitionMoment: { trigger: "phone lights up, notification appears, message received", cameraMove: "slow push in, rack focus to face, zoom from wide to medium", expressionShift: "eyes lift, jaw unclenches, micro-smile begins", lightingShift: "phone glow warms face, practical lamp flickers on" },
    afterState: { lighting: "warm amber, golden hour, soft practical lamps", composition: "tighter frame, subject fills more of screen, centered", bodyLanguage: "shoulders drop, eyes brighten, genuine smile, leaning in", colorGrade: "warm tones, lifted shadows, soft highlight bloom", environment: "same space but feels different — warmer, safer" }
  },
  {
    id: "arc-exhaustion-to-relief",
    name: "Exhaustion → Relief",
    description: "After a long day, finding unexpected comfort",
    beforeState: { lighting: "harsh overhead fluorescent or cold monitor light", composition: "medium shot, subject slightly off-center, cluttered background", bodyLanguage: "rubbing eyes, slumped in chair, staring blankly", colorGrade: "flat, slightly overexposed, desaturated", environment: "work desk, late night office glow, empty kitchen" },
    transitionMoment: { trigger: "phone buzzes on desk, notification lights up screen", cameraMove: "static then subtle dolly in as expression changes", expressionShift: "slow blink, then eyes focus on screen, tension leaves face", lightingShift: "phone glow replaces harsh overhead, warm fill from below" },
    afterState: { lighting: "warm soft lamp, phone glow, candle-adjacent warmth", composition: "closer crop, face forward, relaxed posture", bodyLanguage: "leaning back, quiet laugh, eyes crinkling", colorGrade: "warm amber shadows, natural skin tones, soft vignette", environment: "same desk but phone is now the warm center of attention" }
  },
  {
    id: "arc-overthinking-to-calm",
    name: "Overthinking → Calm",
    description: "Anxious mind finding stillness through connection",
    beforeState: { lighting: "dim, single cold source from laptop or phone already open", composition: "close crop on hands, face partially out of frame", bodyLanguage: "typing and deleting, tapping fingers, restless movement", colorGrade: "blue-grey, slightly underexposed", environment: "bed at 2am, window rain, late night ceiling stare" },
    transitionMoment: { trigger: "response arrives, something written makes subject pause", cameraMove: "handheld slight shake → smooth dolly settle", expressionShift: "eyebrows unfurrow, breath releases visibly, eyes soften", lightingShift: "phone screen feels warmer as smile forms" },
    afterState: { lighting: "soft practical warm, phone as only needed light", composition: "wide enough to see full body language change", bodyLanguage: "settling back into pillow, phone held to chest", colorGrade: "warm desaturated film, quiet intimacy", environment: "same room but now it feels like a sanctuary" }
  }
];

export const lightingBible = [
  { id: "light-phone-glow", name: "Phone Glow", description: "The signature lighting of companionship ads", technique: "Single screen source from below, no other key light", colorTemp: "Cool blue (before message) → Warm white/amber (after)", bestFor: ["Late night scenes", "Bedroom", "Dark environments"], promptPhrase: "phone screen glow illuminating face from below, soft blue-white light on skin casting gentle upward shadows, eyes catching the screen reflection", avoid: "Making it look like horror film — add a subtle warm fill from practical lamp" },
  { id: "light-golden-hour", name: "Golden Hour Warmth", description: "Emotional safety and warmth signifier", technique: "Directional warm light from one side, long soft shadows", colorTemp: "2700K-3200K, deep amber", bestFor: ["Balcony scenes", "Window moments", "Park/outdoor"], promptPhrase: "warm golden hour light streaming from the left, long amber shadows, skin bathed in late afternoon warmth, hair catching the light from behind", avoid: "Overexposure — keep highlights kissed, not blown" },
  { id: "light-practical-lamp", name: "Practical Lamp", description: "Cozy interior warmth, apartment intimacy", technique: "Motivated by visible lamp in frame, soft spill on subject", colorTemp: "2400K-2700K, very warm orange", bestFor: ["Cozy bedroom", "Living room", "Late night indoor"], promptPhrase: "warm tungsten table lamp casting a soft pool of amber light, motivated practical source visible in background, gentle falloff on skin", avoid: "Too many sources competing — one lamp is more intimate" },
  { id: "light-volumetric-rain", name: "Rain + Street Light", description: "Moody urban loneliness with hopeful undertone", technique: "Overhead street lamp through rain, specular highlights on wet surfaces", colorTemp: "Cool exterior, warm interior contrast", bestFor: ["City night", "Bus stop", "Rainy window"], promptPhrase: "wet pavement reflecting orange street lights, rain catching the light in streaks, subject underlit by phone glow contrasting with cold exterior", avoid: "Making it too dark — keep subject's face readable" },
  { id: "light-window-soft", name: "Soft Window Light", description: "Overcast or morning diffused daylight", technique: "Large soft source from window, minimal shadows", colorTemp: "5500K-6000K, clean and neutral", bestFor: ["Morning scenes", "Cafe", "Daytime bedroom"], promptPhrase: "large soft window light from the left, overcast diffused daylight, even skin illumination with gentle shadow falloff, clean and breathable", avoid: "Hard window sun — use overcast or curtain diffusion" },
  { id: "light-chiaroscuro", name: "Chiaroscuro Drama", description: "High contrast, cinematic, emotional intensity", technique: "Single strong side source, deep shadow on opposite side", colorTemp: "Warm-cool split possible", bestFor: ["Emotional peak moments", "Dark moody content"], promptPhrase: "dramatic chiaroscuro lighting, single strong practical source from the left, deep shadows consuming the right side of face, cinematic contrast ratio", avoid: "Losing detail in shadows — slight fill ensures face reads" }
];

export const cameraVocabulary = {
  shotTypes: [
    { name: "Extreme Close-Up (ECU)", use: "Eyes, lips, hands on phone — maximum emotional detail", promptPhrase: "extreme close-up on her eyes as she reads the message, shallow depth of field, iris catching warm light" },
    { name: "Close-Up (CU)", use: "Face with subtle expression changes — bread and butter of emotional ads", promptPhrase: "close-up portrait, face fills frame, every micro-expression visible, soft background bokeh" },
    { name: "Medium Close-Up (MCU)", use: "Face + shoulders — shows body language + expression together", promptPhrase: "medium close-up, shoulders and face, enough frame to read both expression and posture shift" },
    { name: "Medium Shot (MS)", use: "Waist up — shows full upper body language", promptPhrase: "medium shot from the waist up, full hand gestures and posture visible, background provides environment context" },
    { name: "Wide Shot (WS)", use: "Subject in environment — establishes loneliness, isolation, scale", promptPhrase: "wide shot with subject small in the frame, environment heavy and empty around them, establishing emotional context" }
  ],
  movements: [
    { name: "Slow Push In", use: "Building emotional intensity as moment develops", promptPhrase: "slow gentle push in toward the subject as the emotional beat lands, camera almost imperceptibly moving closer" },
    { name: "Dolly Out", use: "Revealing isolation, pulling back to show smallness", promptPhrase: "slow dolly out as subject looks down, environment expanding around them emphasizing quiet solitude" },
    { name: "Rack Focus", use: "Shifting attention between two elements — phone to face", promptPhrase: "rack focus from rain drops on window to subject's face in background, soft pull of attention" },
    { name: "Handheld", use: "Authenticity, intimacy, documentary feel", promptPhrase: "subtle handheld camera movement, intimate documentary quality, naturalistic and present" },
    { name: "Orbit / Arc", use: "Revealing subject from different angle, adds dimension", promptPhrase: "slow camera arc from profile to three-quarter angle, subject remaining still as world moves around them" },
    { name: "Static Locked Off", use: "Weight, stillness, loneliness, contemplation", promptPhrase: "perfectly still locked-off camera, subject moving slightly within static frame, stillness amplifying the quiet emotion" }
  ],
  lensLanguage: [
    { lens: "85mm (Portrait)", feel: "Flattering, warm, intimate, slight compression", promptPhrase: "85mm portrait lens, gentle background compression, flattering facial rendering, intimate closeness" },
    { lens: "50mm (Standard)", feel: "Natural, real, close to human eye", promptPhrase: "50mm standard lens, natural perspective, realistic proportions, honest and grounded feel" },
    { lens: "35mm (Slightly Wide)", feel: "Environmental, context-heavy, shows room", promptPhrase: "35mm lens, slightly wide perspective, environment and subject in conversation, immersive" },
    { lens: "Macro", feel: "Detail, texture, intimacy of small things", promptPhrase: "macro lens on hands holding phone, skin texture and screen reflection in hyper detail" }
  ]
};

export const characterTemplates = [
  { id: "char-young-woman-south-asian", label: "Young Woman — South Asian", ageRange: "18-25", physicalBase: "young South Asian woman, dark wavy hair, warm brown skin with natural texture, dark expressive eyes", defaultExpression: "tired but quietly hopeful, soft eyes with depth", wardrobeIdeas: ["oversized knit sweater", "soft cotton tee", "casual hoodie", "light cardigan"], promptSnippet: "young South Asian woman in her early 20s, dark wavy hair framing her face, warm brown skin with natural texture, dark expressive eyes holding quiet depth" },
  { id: "char-young-man-east-asian", label: "Young Man — East Asian", ageRange: "18-25", physicalBase: "young East Asian man, straight dark hair slightly disheveled, lean face with soft features", defaultExpression: "composed but slightly distant, softening as the scene progresses", wardrobeIdeas: ["grey hoodie", "simple white tee", "light jacket", "university sweatshirt"], promptSnippet: "young East Asian man in his early 20s, straight dark hair slightly disheveled, lean face with naturally soft features, understated warmth" },
  { id: "char-young-woman-white", label: "Young Woman — White / Western", ageRange: "18-25", physicalBase: "young woman, light skin with natural freckles, soft hair loosely styled, clear eyes", defaultExpression: "candid and unguarded, a vulnerability that reads as genuine", wardrobeIdeas: ["vintage tee", "oversized flannel", "cozy robe", "simple dress"], promptSnippet: "young woman in her mid 20s, light skin with faint freckles, soft loosely styled hair, clear expressive eyes, completely unposed and genuine" },
  { id: "char-adult-woman-25-35", label: "Adult Woman — 25-35", ageRange: "25-35", physicalBase: "woman in her late 20s or early 30s, polished but tired, quiet beauty under professional veneer", defaultExpression: "carrying something heavy, releasing it slowly", wardrobeIdeas: ["blazer changed to oversized sweater", "work shirt collar undone", "soft wrap"], promptSnippet: "woman in her early 30s, the kind of tired that comes from a full life, professional blazer traded for a soft oversized sweater, quiet grace" },
  { id: "char-adult-man-25-35", label: "Adult Man — 25-35", ageRange: "25-35", physicalBase: "man in his late 20s, slightly stubbled, looks like someone who works hard and rarely slows down", defaultExpression: "guarded at first, then something opens", wardrobeIdeas: ["simple crew neck", "casual button-up half untucked", "gym wear cooling down"], promptSnippet: "man in his late 20s, light stubble, the kind of face that holds things in — until something unexpected makes it soften" }
];

export const colorGradingGuide = [
  { id: "grade-warm-film", name: "Warm Film", description: "Kodak-inspired, nostalgic intimacy", promptPhrase: "warm film color grade, lifted shadows with orange undertones, slightly desaturated highlights, Kodak Portra 400 aesthetic, gentle grain", useBestFor: ["Connection moments", "Bedroom", "Golden hour"], referenceFilm: "Moonrise Kingdom, Normal People, Call Me By Your Name" },
  { id: "grade-cool-isolation", name: "Cool Isolation", description: "Before state — emotional distance visually expressed", promptPhrase: "cool desaturated color grade, blue-grey shadows, muted palette, emotional distance, flat and somewhat lifeless color", useBestFor: ["Loneliness before-state", "City night", "Rainy scenes"], referenceFilm: "Her (before scenes), Lost in Translation" },
  { id: "grade-teal-orange-cinematic", name: "Teal & Orange", description: "Premium commercial look, cinematic punch", promptPhrase: "teal and orange cinematic color grade, complementary split between cool shadows and warm skin, commercial film aesthetic", useBestFor: ["Hero product moments", "Premium brand feel"], referenceFilm: "Most Marvel films, major commercial campaigns" },
  { id: "grade-soft-pastel", name: "Soft Pastel", description: "Light, airy, morning energy", promptPhrase: "soft pastel color grade, airy whites, gentle pinks and creams, lifted exposure, almost watercolor lightness", useBestFor: ["Morning scenes", "Skincare ads", "Young female audience"], referenceFilm: "Euphoria (bright scenes), most Glossier campaigns" },
  { id: "grade-moody-editorial", name: "Moody Editorial", description: "Deep, rich, fashion magazine feel", promptPhrase: "moody editorial color grade, deep shadows, rich saturated midtones, high contrast, magazine-ready finish", useBestFor: ["Fashion, luxury, dark aesthetic", "Adult 25-35 audience"], referenceFilm: "A Single Man, Portrait of a Lady on Fire" }
];

export const platformSpecs = [
  { id: "platform-instagram-reels", platform: "Instagram Reels", ratio: "9:16", safeZone: "Keep key visual between 15% and 85% vertically — UI overlays cover top and bottom", hookRule: "First 2 seconds must be visually striking — no slow fades, start mid-action", style: "Polished, editorial, warm, premium feel", audienceVibe: "Aspirational but relatable", promptAddition: "optimized for Instagram Reels, visually striking opening frame, subject and emotional hook immediately visible, safe zone respected, premium editorial finish" },
  { id: "platform-tiktok", platform: "TikTok", ratio: "9:16", safeZone: "Same as Reels — avoid edges", hookRule: "Even more aggressive hook — action or emotion in frame 1", style: "More raw, authentic, less polished than Instagram", audienceVibe: "Peer to peer, candid, genuine over perfect", promptAddition: "TikTok native feel, authentic and candid rather than over-produced, natural movement, real-feeling skin texture, documentary intimacy" },
  { id: "platform-youtube-shorts", platform: "YouTube Shorts", ratio: "9:16", safeZone: "Standard vertical safe zone", hookRule: "Slightly longer tolerance — 3-4 seconds for hook", style: "Cinematic storytelling, slightly longer emotional arc", audienceVibe: "Slightly older, more patient viewer", promptAddition: "YouTube Shorts optimized, cinematic storytelling with clear emotional arc, slightly longer narrative beat acceptable, high production value" },
  { id: "platform-facebook-feed", platform: "Facebook Feed", ratio: "4:5 or 1:1", safeZone: "Less critical than vertical formats", hookRule: "Warm and relatable opens well — less aggressive hook needed", style: "Warm, genuine, slightly more traditional", audienceVibe: "25-35 skew, values genuine over trendy", promptAddition: "Facebook feed optimized, 4:5 or 1:1 aspect ratio, warm and genuine aesthetic, relatable scenario, slightly more traditional composition" }
];

export const advancedPromptExamples = [
  { title: "2AM Ceiling Stare — Before/After", type: "video", tool: "Veo 3", platform: "Instagram Reels", audience: "Young Men 18-25", arc: "Isolation → Connection", prompt: "Open on a wide locked-off shot of a young East Asian man lying on his bed staring at the ceiling, dark room with only cold blue monitor light from a desk off-frame, arm across his chest, completely still and awake at 2am. Static camera for 3 seconds, amplifying the weight of the silence. Then his phone on the pillow beside him lights up. His eyes move to it. Slow dolly in as he picks it up — rack focus from ceiling to his face. He reads. His jaw unclenches. A small disbelieving smile. He pulls the phone closer. Warm phone glow now the only light source, turning his face amber. End on a medium close-up of him typing back with slightly brighter eyes. Color grade shifts from cool blue-grey isolation to warm amber connection. Subtle city sounds outside, then just the soft tap of his typing. Handheld intimacy settling into stillness. Avoid text overlays, explicit content, visual artifacts." },
  { title: "After-Work Kitchen Moment", type: "image", tool: "Midjourney", platform: "Facebook Feed", audience: "Adults 25-35", arc: "Exhaustion → Relief", prompt: "Woman in her early 30s standing at her kitchen counter at 7pm, still in the blazer from work but shoes kicked off and collar undone, she leans on the counter with one hand wrapped around a mug of tea she has not yet sipped, phone face-up on the counter in front of her, a message visible on the screen making her smile despite herself. Warm tungsten pendant light above casts a golden pool over her, cold blue evening light coming through the window behind her creating a before-after color contrast within a single frame. Shallow depth of field on her face, mug and phone slightly soft in foreground. Skin texture real and unretouched, the kind of tired that makes a smile feel earned. 4:5 aspect ratio, premium lifestyle editorial, warm film color grade, Kodak Portra feel, shot on 85mm --ar 4:5 --style raw --v 6.1 --q 2 --no text, watermark, blur, explicit content, oversharpening" },
  { title: "Rain Bus Window Scrolling", type: "image", tool: "Flux", platform: "Instagram Reels", audience: "Young Women 18-25", arc: "Loneliness → Discovery", prompt: "Young South Asian woman in her early 20s, dark wavy hair slightly damp from rain, sitting alone in a night bus with rain streaks on the window beside her, neon city lights blurred outside creating a bokeh of reds and oranges. She is scrolling her phone with the automatic habit of someone filling time, face lit from below by screen glow in cool blue-white. Then she stops scrolling. Her expression changes. She sits up slightly. The phone glow seems to warm fractionally. Close to medium close-up showing face and one shoulder, window world blurred behind her. Natural skin texture, dark expressive eyes catching the screen light. Warm film color grade with cool window contrast. Cinematic realism, premium advertising quality. Avoid text, watermark, distorted hands, explicit content." },
  { title: "Rooftop Dusk Monologue Read", type: "video", tool: "Kling", platform: "YouTube Shorts", audience: "Adults 25-35", arc: "Overthinking → Calm", prompt: "Begin with a medium wide shot of a woman in her early 30s standing alone at a rooftop railing, dense city skyline behind her at blue hour, she is holding her phone and looking at the sky like she is talking to herself before reading something. Wind moves her hair. She looks down at her phone. Static camera as she reads — real time, no rush. A long message. Her hand goes to her mouth. Tears prick but do not fall. Then a slow breath out and a quiet laugh, the best kind — unexpected and honest. Camera begins a slow gentle orbit from her side to three-quarter frontal as she starts typing back. Volumetric city haze in background, warm rooftop practical light on skin, blue hour cool exterior. Color grade shifts from cool contemplative blue to warmer intimate amber as she engages. End on her face tilted down at the phone, completely present, the city an afterthought. Avoid logos, captions, explicit content, visual glitches." },
  { title: "Study Break Smile", type: "image", tool: "Ideogram", platform: "TikTok", audience: "Young Men 18-25 / Young Women 18-25", arc: "Exhaustion → Relief", prompt: "College-aged person with textbooks and laptop open, sitting at a library desk corner, surrounded by the quiet chaos of exam season, empty coffee cup, highlighters everywhere, expression that says they have been here too long. Then a message arrives. They pick up the phone. Read it. And despite everything, a slow genuine grin spreads. The kind of smile that makes nearby strangers look up. Warm desk lamp light, soft window light, shallow depth of field blurring the textbook chaos into warm bokeh. Horizontal negative space on one side for potential caption overlay. Real and relatable, not staged. Authentic student life editorial, warm candid feel. No watermark, no blur, no obviously posed expression, no model-perfect presentation." },
  { title: "Three-Device Loneliness Then One Message", type: "video", tool: "Runway", platform: "Instagram Reels", audience: "Adults 25-35", arc: "Isolation → Connection", prompt: "Begin wide on a living room sofa where a man in his late 20s sits surrounded by the glow of multiple screens — TV on with the sound low, laptop open to work emails, tablet ignored — classic modern loneliness of being everywhere digitally and nowhere personally. Slow pull out to emphasize the irony of the scene. Then his personal phone on the cushion beside him buzzes. He picks it up almost irritated. Reads. Pauses everything. Sits up. Reads again. He laughs quietly to himself, the kind of private laugh you cannot help. He sets down the other devices and gives the phone his full attention. Cut to medium close-up on his face — warm phone glow replacing the cold multi-screen light. Color grade starts cool and fragmented, ends warm and singular. Commercial editorial quality, avoid crowds, explicit content, text overlays, artifacts." },
  { title: "Morning Message First Thing", type: "image", tool: "Midjourney", platform: "Instagram Reels", audience: "Young Women 18-25", arc: "Warmth — establishing", prompt: "Young woman in her early 20s, messy morning hair, oversized tee, sitting cross-legged on a bed with white linen slightly rumpled, holding her phone in both hands and smiling at a morning message before she has even fully woken up. Soft golden morning light through sheer curtains creating a warm haze across everything. The room feels unhurried and safe. Skin texture natural and dewy, no makeup, completely genuine. Shallow depth of field, rumpled linen soft in foreground. This is the ad that makes someone think: I want that feeling. 9:16, warm pastel film grade, airy and intimate, shot on 85mm --ar 9:16 --style raw --v 6.1 --q 2 --no text, watermark, blur, explicit content, over-processed skin" },
  { title: "Gym Cooldown Check-In", type: "video", tool: "Sora", platform: "TikTok", audience: "Young Men 18-25", arc: "Isolation → Connection", prompt: "Young man in his early 20s finishing a workout in an otherwise empty gym, earbuds in, breathing steadily, sitting on a bench looking at nothing. The post-workout crash where the endorphins fade and you realize you are going home to an empty apartment. He pulls out his phone. A message from someone unexpected. He reads it twice. Pulls out one earbud. A slow smirk, then a real smile, the kind athletes try to hide. He starts typing back. Camera tracks alongside him as he stands, phone in hand, that walk out now different than the walk in. Cinematic realism with natural gym lighting — fluorescent but warm with practical window light. Authentic body language, natural skin and athletic physicality. Avoid logos, explicit content, text overlays, unnatural motion artifacts." },
  { title: "Festival Lights Solo → Shared Joy", type: "image", tool: "Flux", platform: "Facebook Feed", audience: "Young Women 18-25 / Adults 25-35", arc: "Loneliness → Connection", prompt: "Young woman standing alone in a festival lights market at dusk, string lights strung overhead creating hundreds of warm bokeh orbs behind her, she is surrounded by couples and groups but very clearly alone, expression wistful. She takes a photo of the lights to send to someone. Then she reads a reply. And suddenly being alone in a beautiful place feels less like loneliness and more like having someone to share it with. Hold her face in close-up: fairy lights reflecting in her eyes, phone held up slightly, quiet joy. Warm golden string light as key source, blue dusk as background. Natural skin, real hair movement, premium lifestyle photography. Avoid text, watermark, overly staged poses, explicit content, distorted hands." },
  { title: "Snowy Window Morning Reflection", type: "image", tool: "Midjourney", platform: "Instagram Reels", audience: "Adults 25-35", arc: "Contemplation → Warmth", prompt: "Woman in her early 30s standing at a large window in a winter morning apartment, mug held in both hands, watching snow fall outside. Expression is calm but a little empty, the particular quiet of a Sunday alone. Her phone is on the windowsill. It vibrates. She picks it up with one hand still on the mug. Reads. And a warmth crosses her face that no amount of hot coffee could produce. The snow still falls. The room is still quiet. But something has changed. Soft overcast window light, cool exterior contrasting with warm interior amber from a lamp off-frame. Medium shot showing body language opening. Skin texture real and natural, wearing an oversized knitted jumper, hair loosely pinned. Premium editorial, warm film grade, shot on 85mm portrait --ar 9:16 --style raw --v 6.1 --q 2 --no text, watermark, explicit content, blur" }
];

export const productNicheContext = {
  niche: "cinematic product advertising",
  categories: [
    "Perfume & Fragrance", "Skincare & Beauty",
    "Watches & Jewelry", "Shoes & Footwear",
    "Coffee & Beverages", "Food & Snacks",
    "Tech & Gadgets", "Earbuds & Audio",
    "Clothing & Fashion", "Supplements"
  ],
  corePhilosophy: "Every product prompt must make the product feel worth 10x its price. Premium is not expensive — it is intentional. Every lighting choice, surface, and color decision must feel deliberate.",
  qualityMarkers: [
    "Named specific lighting setup — never vague",
    "Surface material explicitly described",
    "Reflection or shadow behavior stated",
    "Color palette with temperature",
    "Camera and lens reference",
    "Brand aesthetic reference point"
  ]
};

export const productLightingBible = [
  { id: "prod-light-rim", name: "Rim Light (Edge Definition)", bestFor: ["Watches", "Tech", "Dark studio hero shots"], promptPhrase: "strong rim light from behind left separating product cleanly from black background, subtle soft fill from front preventing complete shadow loss, dramatic product edge definition" },
  { id: "prod-light-backlit", name: "Backlit (Glow Through)", bestFor: ["Perfume bottles", "Beverages", "Translucent products"], promptPhrase: "strong point source directly behind product, liquid or glass illuminated from within, translucent elements glowing, dark silhouette on front face, dramatic clarity" },
  { id: "prod-light-god-rays", name: "God Rays (Dramatic Beams)", bestFor: ["Luxury fragrance", "Premium spirits", "Hero shots"], promptPhrase: "dramatic god rays filtering through fine atmospheric smoke from upper left, product caught in a single illuminated beam, deep fill shadow, cinematic fragrance ad quality" },
  { id: "prod-light-softbox", name: "Soft Box (Commercial Even)", bestFor: ["Skincare", "Food", "Fashion flat lay"], promptPhrase: "large overhead softbox providing even commercial illumination, minimal hard shadows, clean product edges, fill light from opposite side balancing exposure, clinical product clarity" },
  { id: "prod-light-neon", name: "Neon Gel Lighting", bestFor: ["Tech products", "Gaming", "Earbuds", "Energy drinks"], promptPhrase: "electric blue neon gel from left, complementary magenta or purple from right, product caught between dual color sources, dark background, cyberpunk commercial aesthetic, colored light spill on surface" },
  { id: "prod-light-golden", name: "Golden Hour (Product Lifestyle)", bestFor: ["Lifestyle shots", "Coffee", "Fashion with model"], promptPhrase: "warm golden hour light from camera left, long directional shadows, amber color temperature on product and surface, outdoor premium lifestyle feel, natural warmth" }
];

export const productPromptExamples = [
  { title: "Dark Amber Perfume Hero", category: "Perfume & Fragrance", type: "image", tool: "Midjourney", prompt: "commercial hero shot of a dark amber glass perfume bottle with brushed gold cap, perfectly centered on black polished obsidian surface, reflection mirroring the bottle below with perfect clarity, dramatic god rays filtering through fine atmospheric smoke from upper left, strong rim light tracing the bottle edges in gold, deep pure black background, translucent liquid visible through glass glowing amber when backlit, macro detail on the cap texture and glass facets, hyperrealistic commercial product photography, shot on Hasselblad H6D, luxury fragrance campaign aesthetic, Dior Sauvage visual language, color palette deep amber and obsidian black --ar 4:5 --style raw --v 6.1 --q 2 --no text, watermark, blur, hands, clutter, overexposed" },
  { title: "White Serum Marble Morning", category: "Skincare & Beauty", type: "image", tool: "Flux", prompt: "lifestyle product hero of a minimalist white frosted glass skincare serum bottle centered on a cool white marble vanity surface, soft water droplets on the bottle exterior catching the light, large diffused soft box from the left providing even shadowless commercial illumination with a subtle warm fill from the right, product label clean and facing camera, marble veining adding texture to the negative space around the product, small white flower petals loosely scattered nearby for organic context, extremely sharp product focus with background marble falling into soft separation, photorealistic commercial beauty photography, La Mer editorial aesthetic, color palette clean whites, soft stone grey, and pale gold. Avoid text, watermark, harsh shadows, distorted labels." },
  { title: "Watch Single Spotlight Drama", category: "Watches & Jewelry", type: "image", tool: "Midjourney", prompt: "dramatic product hero of a luxury steel chronograph watch lying flat on dark slate surface, single overhead spotlight creating a precise circle of light around the watch face, strong rim light from behind tracing the case edges and bracelet links in silver, perfect reflection in the slate below, watch face showing time clearly, macro detail on the applied indices and hand finishing, deep shadow consuming 60 percent of frame, color palette cool silver and deep charcoal, hyperrealistic commercial product photography, shot on Phase One, Rolex campaign visual language, extreme material precision --ar 1:1 --style raw --v 6.1 --q 2 --no text, watermark, blur, scratches, dust, clutter" },
  { title: "Sneaker Low-Angle Hero", category: "Shoes & Footwear", type: "image", tool: "Midjourney", prompt: "dramatic low-angle hero shot of a white minimalist leather sneaker, right shoe profile facing left, floating approximately ten inches above a matte black reflective surface, subtle crisp drop shadow below, strong directional spotlight from upper right casting a clean defined shadow across the surface, rim light from behind tracing the sole edge and heel counter, pure black background fading into absolute darkness, white leather grain texture hyper-visible in the key light, sole detail showing material texture, color palette clean white against pure black, hyperrealistic product photography, Common Projects campaign aesthetic, shot on Phase One with tilt-shift, premium luxury streetwear visual language --ar 1:1 --style raw --v 6.1 --q 2 --no text, watermark, blur, background objects, extra shoes" },
  { title: "Coffee Steam Orbit", category: "Coffee & Beverages", type: "video", tool: "Kling", prompt: "slow 180-degree orbital camera movement beginning from the front of a matte ceramic black coffee cup, cup sitting perfectly centered on an aged oak cafe table with beautiful wood grain visible, thick white steam rising from the cup in natural lazy curls, warm amber morning light from a left-side window catching the steam and making it luminous against the darker background, camera orbits smoothly at cup level revealing the cafe environment behind in gradual bokeh — dark wood shelves, soft warm lights, the suggestion of morning. Product remains perfectly still throughout. Rich dark coffee visible, cup handle at optimal angle as camera completes its arc. Color grade warm amber and deep roasted brown. Nespresso campaign aesthetic. Sound of ambient cafe murmur, then just the subtle creak of the chair and steam. Cinematic slow motion feel. Avoid logos, text overlays, visual artifacts." },
  { title: "Earbud Dual Neon Float", category: "Earbuds & Audio", type: "image", tool: "Midjourney", prompt: "floating product hero shot of premium gloss white wireless earbuds with their charging case open and upright, both earbuds suspended in mid-air above the open case in perfect symmetry, pure black studio void background, electric blue neon gel light from camera left creating a cool colored edge on the earbuds and left side of the case, complementary warm white key light from upper right providing detail illumination, subtle blue-tinted reflection on the matte black surface below the product, charging case lid at exactly 45 degrees, interior case magnets and charging contacts in sharp detail, earbud mesh grille hyper-visible in the key light, hyperrealistic product photography, Apple product launch visual language, shot on Hasselblad, color palette crisp white and electric blue against absolute black --ar 1:1 --style raw --v 6.1 --q 2 --no text, watermark, blur, hands, visible wires, clutter" },
  { title: "Perfume Splash Backlit", category: "Perfume & Fragrance", type: "video", tool: "Veo 3", prompt: "ultra-slow motion product video of a amber glass perfume bottle with a liquid splash frozen mid-air around it, bottle perfectly centered and stable, fine mist and liquid droplets caught in the moment of eruption around the bottle, strong backlight source directly behind the bottle making the amber liquid glow from within and the splash droplets catch like scattered diamonds, dark controlled studio background, color palette deep amber and liquid gold against black, camera locked off in a clean frontal medium close-up, no camera movement — just the product and physics frozen in time, the splash forming a crown shape above and sides, hyperrealistic commercial product physics, Chanel fragrance film aesthetic, sound design of a single resonant chime as the splash peaks. Avoid text overlays, visible crew, motion blur artifacts." },
  { title: "Supplement Stack Golden Hour", category: "Supplements", type: "image", tool: "Flux", prompt: "clean hero lifestyle shot of a premium white supplement bottle with minimalist branding centered on a light ash wood surface, warm golden hour light from the left side creating a long diagonal shadow from the bottle across the clean wood surface, a scattering of raw ingredients nearby — dried berries, botanical leaves — adding organic context without competing with the hero product, bottle label facing camera cleanly and legibly, sharp product focus with soft background separation, color palette warm white, ash wood natural, and botanical green, commercial wellness brand aesthetic, clean and trustworthy visual language, premium photography quality, no harsh shadows, product edges clean and separating from background. Avoid text on the wood surface, watermark, clutter, overexposed highlights, distorted label." }
];

export const toolRuleMap = Object.fromEntries(toolRules.map((rule) => [rule.tool, rule]));

export const knowledgeDocuments = [
  // === EXISTING TOOL RULES ===
  ...toolRules.map((rule) => ({
    id: `tool-${rule.tool.toLowerCase().replace(/\s+/g, "-")}`,
    category: "tool",
    title: `${rule.tool} syntax rules`,
    content: `${rule.tool} syntax: ${rule.syntax}. Tips: ${rule.tips}. Negative prompt format: ${rule.negativeFormat}.`
  })),

  // === NICHE CONTEXT ===
  {
    id: "niche-context",
    category: "niche",
    title: "Companionship app niche context",
    content: `Niche: ${nicheContext.niche}. Target emotion: ${nicheContext.targetEmotion.join(", ")}. Avoid: ${nicheContext.avoidWords.join(", ")}. Best performing themes: ${nicheContext.bestPerformingThemes.join(", ")}.`
  },

  // === CREATIVE DIRECTION ===
  {
    id: "creative-direction-guidelines",
    category: "style-guide",
    title: creativeDirectionGuidelines.title,
    content: creativeDirectionGuidelines.content
  },

  // === PROMPT FORMULAS ===
  ...promptFormulas.map((formula) => ({
    id: `formula-${formula.type}`,
    category: "formula",
    title: `${formula.type} prompt formula`,
    content: `${formula.type} formula: ${formula.formula}.`
  })),

  // === ORIGINAL EXAMPLES ===
  ...promptExamples.map((example, index) => ({
    id: `example-${index + 1}`,
    category: "example",
    title: `${example.title} (${example.tool})`,
    content: `Example ${example.type} prompt for ${example.tool}: ${example.prompt}`
  })),

  // === EMOTIONAL ARC TEMPLATES ===
  ...emotionalArcTemplates.map((arc) => ({
    id: arc.id,
    category: "emotional-arc",
    title: arc.name,
    content: `Arc: ${arc.name}. Description: ${arc.description}. Before state lighting: ${arc.beforeState.lighting}. Before state body language: ${arc.beforeState.bodyLanguage}. Before color grade: ${arc.beforeState.colorGrade}. Transition trigger: ${arc.transitionMoment.trigger}. Transition camera: ${arc.transitionMoment.cameraMove}. Expression shift: ${arc.transitionMoment.expressionShift}. After state lighting: ${arc.afterState.lighting}. After color grade: ${arc.afterState.colorGrade}. After body language: ${arc.afterState.bodyLanguage}.`
  })),

  // === LIGHTING BIBLE ===
  ...lightingBible.map((light) => ({
    id: light.id,
    category: "lighting",
    title: `Lighting: ${light.name}`,
    content: `Lighting technique: ${light.name}. Description: ${light.description}. How to use: ${light.technique}. Color temperature: ${light.colorTemp}. Best for: ${light.bestFor.join(", ")}. Prompt phrase to use: "${light.promptPhrase}". Avoid: ${light.avoid}.`
  })),

  // === CAMERA VOCABULARY ===
  ...cameraVocabulary.shotTypes.map((shot) => ({
    id: `shot-${shot.name.toLowerCase().replace(/[\s()\/]/g, "-")}`,
    category: "camera",
    title: `Shot Type: ${shot.name}`,
    content: `Shot type: ${shot.name}. Best use: ${shot.use}. Prompt phrase: "${shot.promptPhrase}".`
  })),
  ...cameraVocabulary.movements.map((move) => ({
    id: `move-${move.name.toLowerCase().replace(/[\s\/]/g, "-")}`,
    category: "camera",
    title: `Camera Movement: ${move.name}`,
    content: `Camera movement: ${move.name}. Best use: ${move.use}. Prompt phrase: "${move.promptPhrase}".`
  })),
  ...cameraVocabulary.lensLanguage.map((lens) => ({
    id: `lens-${lens.lens.toLowerCase().replace(/[\s()\/mm]/g, "-")}`,
    category: "camera",
    title: `Lens: ${lens.lens}`,
    content: `Lens: ${lens.lens}. Feel: ${lens.feel}. Prompt phrase: "${lens.promptPhrase}".`
  })),

  // === CHARACTER TEMPLATES ===
  ...characterTemplates.map((char) => ({
    id: char.id,
    category: "character",
    title: char.label,
    content: `Character: ${char.label}. Age range: ${char.ageRange}. Physical description: ${char.physicalBase}. Default expression: ${char.defaultExpression}. Wardrobe options: ${char.wardrobeIdeas.join(", ")}. Ready-to-use prompt snippet: "${char.promptSnippet}".`
  })),

  // === COLOR GRADING ===
  ...colorGradingGuide.map((grade) => ({
    id: grade.id,
    category: "color-grade",
    title: `Color Grade: ${grade.name}`,
    content: `Color grade: ${grade.name}. Description: ${grade.description}. Prompt phrase: "${grade.promptPhrase}". Best for: ${grade.useBestFor.join(", ")}. Reference films: ${grade.referenceFilm}.`
  })),

  // === PLATFORM SPECS ===
  ...platformSpecs.map((platform) => ({
    id: platform.id,
    category: "platform",
    title: `Platform: ${platform.platform}`,
    content: `Platform: ${platform.platform}. Aspect ratio: ${platform.ratio}. Safe zone rule: ${platform.safeZone}. Hook rule: ${platform.hookRule}. Style: ${platform.style}. Audience vibe: ${platform.audienceVibe}. Add to prompt: "${platform.promptAddition}".`
  })),

  // === ADVANCED COMPANIONSHIP EXAMPLES ===
  ...advancedPromptExamples.map((example, index) => ({
    id: `adv-example-${index + 1}`,
    category: "advanced-example",
    title: `${example.title} (${example.tool}) — ${example.platform}`,
    content: `Advanced ${example.type} prompt. Tool: ${example.tool}. Platform: ${example.platform}. Audience: ${example.audience}. Emotional arc: ${example.arc}. Full prompt: ${example.prompt}`
  })),

  // === PRODUCT NICHE CONTEXT ===
  {
    id: "product-niche-context",
    category: "product-niche",
    title: "Product advertising niche context",
    content: `Product niche: ${productNicheContext.niche}. Categories covered: ${productNicheContext.categories.join(", ")}. Core philosophy: ${productNicheContext.corePhilosophy}. Quality markers: ${productNicheContext.qualityMarkers.join("; ")}.`
  },

  // === PRODUCT LIGHTING ===
  ...productLightingBible.map((light) => ({
    id: light.id,
    category: "product-lighting",
    title: `Product Lighting: ${light.name}`,
    content: `Product lighting: ${light.name}. Best for: ${light.bestFor.join(", ")}. Prompt phrase: "${light.promptPhrase}".`
  })),

  // === PRODUCT EXAMPLES ===
  ...productPromptExamples.map((example, index) => ({
    id: `prod-example-${index + 1}`,
    category: "product-example",
    title: `${example.title} — ${example.category} (${example.tool})`,
    content: `Product ${example.type} prompt. Category: ${example.category}. Tool: ${example.tool}. Full prompt: ${example.prompt}`
  }))
];
