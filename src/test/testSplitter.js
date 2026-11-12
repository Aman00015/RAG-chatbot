import { loadDocuments } from "../loaders/documentLoader.js";
import { splitDocuments } from "../utils/textSplitter.js";
import { generateChunkId } from "../vectorstore/chunksIds.js";
const documents = await loadDocuments();

console.log("og documents:", documents.length);

const chunks = await splitDocuments(documents);

for (let i = 0; i < chunks.length; i++) {
  console.log(`\n=========== Chunks${i + 1} ==========`);
  console.log("Document ID:", chunks[i].metadata.documentId);
  console.log("Page:", chunks[i].metadata.pageNumber ?? 0);
  console.log("Chunk index:", chunks[i].metadata.chunkIndex);
  console.log("Chunk ID:", generateChunkId(chunks[i]));
}
