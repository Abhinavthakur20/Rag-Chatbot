# RagBot Prompt Forge

RagBot is a Next.js 14 + Tailwind CSS app for generating and refining companionship-ad prompts with a RAG-backed knowledge layer and streaming chat.

## Features

- **Prompt generation** from structured creative controls (content type, mood, character, environment, tool, style, ratio, quality, variations, negatives).
- **Streaming chat refinement** for iterative prompt editing.
- **RAG retrieval** over curated prompt knowledge and tool-specific syntax guidance.
- **Local vector index** powered by `vectra` with deterministic local hash embeddings.
- **Claude-inspired dark UI** with:
  - fixed left control sidebar
  - central chat workspace
  - toggleable right history/saved panel

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, Tailwind CSS
- **RAG Index:** `vectra`
- **LLM Provider Layer:** xAI/Groq-compatible OpenAI-style chat completions (via `lib/grok.js`)

## Project Structure

```text
app/
  api/
    chat/route.js        # streaming chat endpoint
    generate/route.js    # prompt generation endpoint
  globals.css
  page.jsx
components/
  Sidebar.jsx
  ChatArea.jsx
  MessageBubble.jsx
  InputBar.jsx
  Navbar.jsx
  RightPanel.jsx
  ChatInterface.jsx
data/
  knowledge.js           # tool rules + domain documents
lib/
  grok.js                # provider/model handling + embeddings
  rag.js                 # index build + retrieval
  promptBuilder.js       # prompt/query construction
```

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm
- API key for one supported provider

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Required (use either key name)
GROK_API_KEY=your_api_key_here
# or
XAI_API_KEY=your_api_key_here

# Optional
GROK_PROVIDER=xai
# GROK_PROVIDER=groq

# Optional overrides
# GROK_MODEL=grok-3-mini
# GROK_API_BASE_URL=https://api.x.ai/v1
```

## Install & Run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## How It Works

1. User provides a rough idea and/or selects creative controls.
2. App builds a retrieval query from selections and prompt context.
3. RAG layer fetches relevant knowledge chunks from the local vector index.
4. Prompt builder injects retrieved context + settings into generation/chat instructions.
5. Model response is returned as:
   - JSON prompt variations (`/api/generate`)
   - streamed plain text (`/api/chat`)

## Notes

- The vector index is created under `.vectra/` on first use.
- Chat history and builder context are persisted in `localStorage`.
- This project is optimized for desktop UI.

## GitHub Push (first time)

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Abhinavthakur20/Rag-Chatbot.git
git push -u origin main
```
