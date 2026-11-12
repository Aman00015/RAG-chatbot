import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 150;

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: CHUNK_SIZE,
  chunkOverlap: CHUNK_OVERLAP,
});

export async function splitDocuments(documents) {
  const allChunks = [];
  for (const document of documents) {
    const documentChunks = await splitter.splitDocuments([document]);

    const indexedChunks = documentChunks.map((chunk, index) => {
      chunk.metadata = {
        ...chunk.metadata,
        chunkIndex: index,
      };
      return chunk;
    });
    allChunks.push(...indexedChunks);
  }

  console.log(`Created ${allChunks.length} chunks`);
  return allChunks;
}
