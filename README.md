# RagBot Prompt Forge

RagBot is a Next.js 14 + Tailwind CSS app for generating and refining companionship-ad prompts with a RAG-backed knowledge layer and streaming chat.

## Features

- **Prompt generation** from structured creative controls (content type, mood, character, environment, tool, style, ratio, quality, variations, negatives).
- **Streaming chat refinement** for iterative prompt editing.
- **RAG retrieval** over curated prompt knowledge and tool-specific syntax guidance.
- **Supabase pgvector RAG** for production-safe retrieval on Vercel/Railway.
- **Claude-inspired dark UI** with:
  - fixed left control sidebar
  - central chat workspace
  - toggleable right history/saved panel

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, Tailwind CSS
- **RAG Index:** Supabase Postgres + pgvector
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
  rag.js                 # Supabase pgvector retrieval + auto-seeding
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

# RAG storage (required for production)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional overrides
# GROK_MODEL=grok-3-mini
# GROK_API_BASE_URL=https://api.x.ai/v1
```

## Supabase SQL Setup

Run this in Supabase SQL Editor:

```sql
create extension if not exists vector;

create table if not exists documents (
  id bigserial primary key,
  content text,
  embedding vector(768),
  metadata jsonb
);

create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    id, content, metadata,
    1 - (embedding <=> query_embedding) as similarity
  from documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

If you see `Could not find the table 'public.documents' in the schema cache`, run the SQL block above in Supabase SQL Editor.  
The app now falls back to built-in in-memory knowledge so chat/generation can still work while Supabase RAG is being set up.

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
npm run seed
```

## How It Works

1. User provides a rough idea and/or selects creative controls.
2. App builds a retrieval query from selections and prompt context.
3. RAG layer fetches relevant knowledge chunks from Supabase pgvector.
4. Prompt builder injects retrieved context + settings into generation/chat instructions.
5. Model response is returned as:
   - JSON prompt variations (`/api/generate`)
   - streamed plain text (`/api/chat`)

## Notes

- Built-in knowledge is auto-seeded to Supabase on first retrieval.
- You can also run `npm run seed` once to pre-seed manually.
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
