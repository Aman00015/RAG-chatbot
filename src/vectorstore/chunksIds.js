import { createHash } from "node:crypto";
import path from "node:path";

export function generateChunkId(chunk) {
  const {documentId, pageNumber, chunkIndex} = chunk.metadata

  if (!documentId) {
    throw new Error("Cannot generate chunk id: documentId is missing");
  }


  if (!Number.isInteger(chunkIndex)) {
    throw new Error("Cannot generate chunk id: chunkIndex is missing");
  }
  const page = pageNumber ?? 0;
  const uniqueKey = `${documentId}:${page}:${chunkIndex}`;

  return createHash("sha256").update(uniqueKey).digest("hex");
}
