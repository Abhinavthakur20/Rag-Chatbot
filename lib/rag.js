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
    throw new Error(
      "Failed to load module 'vectra' at runtime. Ensure 'vectra' is installed in production (npm install vectra) and that your deployment uses Node >=20.\nOriginal error: " +
      err.message
    );
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
