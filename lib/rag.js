import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import { knowledgeDocuments } from "@/data/knowledge";
import { embedText } from "@/lib/grok";

const EMBEDDING_VERSION = "local-hash-v1";

const globalCache = globalThis.__ragbotIndexCache || {
  indexPromise: null
};

globalThis.__ragbotIndexCache = globalCache;

async function getLocalIndex() {
  try {
    const { LocalIndex } = eval("require")("vectra");
    return LocalIndex;
  } catch (err) {
    // Provide a lightweight in-memory fallback LocalIndex so the app remains operational
    // in environments where `vectra` cannot be loaded (older Node, serverless, no FS).
    // This fallback does NOT persist to disk and is intended as a graceful degradation.
    class DummyLocalIndex {
      constructor(_indexPath) {
        this._items = [];
        this._created = false;
      }

      async isIndexCreated() {
        return this._created && this._items.length > 0;
      }

      async createIndex() {
        this._created = true;
      }

      async insertItem({ vector, metadata }) {
        this._items.push({ vector: Float32Array.from(vector), metadata });
      }

      // return array of { score, item }
      async queryItems(queryVector, limit = 4) {
        if (!queryVector || !queryVector.length) return [];

        const q = Float32Array.from(queryVector);

        const scores = this._items.map((it) => {
          // cosine similarity
          let dot = 0;
          let aLen = 0;
          let bLen = 0;
          const v = it.vector;
          const n = Math.min(v.length, q.length);
          for (let i = 0; i < n; i++) {
            dot += v[i] * q[i];
            aLen += v[i] * v[i];
            bLen += q[i] * q[i];
          }
          const denom = Math.sqrt(aLen) * Math.sqrt(bLen) || 1;
          const score = dot / denom;
          return { score, item: { metadata: it.metadata } };
        });

        scores.sort((a, b) => b.score - a.score);

        return scores.slice(0, limit);
      }
    }

    return DummyLocalIndex;
  }
}

function getVersionedIndexPath() {
  const version = createHash("sha1")
    .update(
      JSON.stringify({
        embeddingVersion: EMBEDDING_VERSION,
        knowledgeDocuments
      })
    )
    .digest("hex")
    .slice(0, 12);

  const rootPath = path.join(process.cwd(), ".vectra");
  const indexPath = path.join(rootPath, `prompt-kb-${version}`);

  return {
    version,
    rootPath,
    indexPath
  };
}

async function buildIndex() {
  const { version, rootPath, indexPath } = getVersionedIndexPath();
  const manifestPath = path.join(indexPath, "manifest.json");
  const LocalIndex = await getLocalIndex();

  await fs.mkdir(rootPath, { recursive: true });
  await fs.mkdir(indexPath, { recursive: true });

  const index = new LocalIndex(indexPath);
  const indexCreated = await index.isIndexCreated();

  if (!indexCreated) {
    await index.createIndex();
  }

  const hasManifest = await fs
    .access(manifestPath)
    .then(() => true)
    .catch(() => false);

  if (!hasManifest) {
    for (const document of knowledgeDocuments) {
      const vector = await embedText(document.content);

      await index.insertItem({
        vector,
        metadata: {
          id: document.id,
          category: document.category,
          title: document.title,
          text: document.content
        }
      });
    }

    await fs.writeFile(
      manifestPath,
      JSON.stringify(
        {
          version,
          count: knowledgeDocuments.length,
          createdAt: new Date().toISOString()
        },
        null,
        2
      ),
      "utf8"
    );
  }

  return index;
}

export async function ensureKnowledgeIndex() {
  if (!globalCache.indexPromise) {
    globalCache.indexPromise = buildIndex();
  }

  return globalCache.indexPromise;
}

export async function retrieveRelevantContext(query, limit = 4) {
  const index = await ensureKnowledgeIndex();
  const vector = await embedText(query);

  if (!vector.length) {
    return [];
  }

  const results = await index.queryItems(vector, limit);

  return results.map((result) => ({
    score: result.score,
    ...result.item.metadata
  }));
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
