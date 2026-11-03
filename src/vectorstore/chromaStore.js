import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "../embeddings/embedding.js";

const COLLECTION_NAME = "my_document";

const CHROMA_URL = "http://localhost:8000";

export async function createVectorStore(chunks) {
  const vectorStore = await Chroma.fromDocuments(chunks, embeddings, {
    collectionName: COLLECTION_NAME,
    url: CHROMA_URL,
  });
  console.log('Documents successfully stored in chromaDB');
  return vectorStore
}

// This connects LangChain to an existing ChromaDB collection.
// It receives:
// - embeddings: our Ollama embedding model.
// - collectionName: the collection we created earlier.
// - url: the address of our ChromaDB server.

export async function getVectorStore(){
    const vectorStore = await Chroma.fromExistingCollection(embeddings,{
        collectionName:COLLECTION_NAME,
        url:CHROMA_URL
    })
    return vectorStore;
}

