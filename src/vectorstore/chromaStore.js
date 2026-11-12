import { Chroma } from "@langchain/community/vectorstores/chroma";
import { ChromaClient } from "chromadb";
import { embeddings } from "../embeddings/embedding.js";
import { generateChunkId } from "./chunksIds.js";

const COLLECTION_NAME = "my_document";

const CHROMA_URL = "http://localhost:8000";

/**
 * Builds a ChromaClient using host, port, and ssl to avoid the deprecated `path` option.
 */
function createChromaClient(urlString = CHROMA_URL) {
  const parsed = new URL(urlString);
  const ssl = parsed.protocol === "https:";
  const port = parsed.port ? Number(parsed.port) : ssl ? 443 : 80;
  return new ChromaClient({
    host: parsed.hostname,
    port,
    ssl,
  });
}

export async function createVectorStore(chunks) {
  // generate a stable id for every chunk.
  const ids = chunks.map((chunk) => generateChunkId(chunk));

  const vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName: COLLECTION_NAME,
    index: createChromaClient(),
  });

  await vectorStore.addDocuments(chunks, { ids });

  console.log(` ${chunks.length} chunks successfully stored in chromaDB`);
  return vectorStore;
}

// This connects LangChain to an existing ChromaDB collection.
// It receives:
// - embeddings: our Ollama embedding model.
// - collectionName: the collection we created earlier.
// - index: a ChromaClient configured for our ChromaDB server.

export async function getVectorStore() {
  const vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName: COLLECTION_NAME,
    index: createChromaClient(),
  });
  return vectorStore;
}
