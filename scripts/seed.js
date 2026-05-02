import { createClient } from "@supabase/supabase-js";
import { knowledgeDocuments } from "../data/knowledge.js";
import { embedText } from "../lib/grok.js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Missing Supabase env vars. Set SUPABASE_URL + SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

async function getVersion() {
    const { createHash } = await import("crypto");
    return createHash("sha1")
        .update(JSON.stringify(knowledgeDocuments))
        .digest("hex")
        .slice(0, 12);
}

async function alreadyExists(sourceId, version) {
    const { data, error } = await supabase
        .from("documents")
        .select("id")
        .eq("metadata->>source", "ragbot_builtin")
        .eq("metadata->>version", version)
        .eq("metadata->>sourceId", sourceId)
        .limit(1);

    if (error) {
        throw error;
    }

    return Boolean(data?.length);
}

async function storeDocument(doc, version) {
    const embedding = await embedText(doc.content);

    const { error } = await supabase.from("documents").insert({
        content: doc.content,
        embedding,
        metadata: {
            source: "ragbot_builtin",
            version,
            sourceId: doc.id,
            category: doc.category,
            title: doc.title
        }
    });

    if (error) {
        throw error;
    }
}

async function seed() {
    const version = await getVersion();
    console.log("Seeding knowledge base into Supabase...");

    let inserted = 0;
    let skipped = 0;

    for (const doc of knowledgeDocuments) {
        const exists = await alreadyExists(doc.id, version);

        if (exists) {
            skipped += 1;
            console.log(`Skipped: ${doc.id}`);
            continue;
        }

        await storeDocument(doc, version);
        inserted += 1;
        console.log(`Stored: ${doc.id}`);
    }

    console.log(`Done. Inserted ${inserted}, skipped ${skipped}.`);
}

seed().catch((error) => {
    console.error("Seed failed:", error.message || error);
    process.exitCode = 1;
});
