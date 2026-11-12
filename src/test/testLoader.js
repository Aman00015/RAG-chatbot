import { loadDocuments } from "../loaders/documentLoader.js";

const documents = await loadDocuments();

console.log("Total documents:", documents.length);

for (const doc of documents) {
  console.log("\n========================");

  console.log("Source:", doc.metadata.source);
  console.log("Filename:", doc.metadata.fileName);
  console.log("File type:", doc.metadata.fileType);

  if (doc.metadata.pageNumber !== undefined) {
    console.log("PDF page:", doc.metadata.pageNumber);
  }

  console.log("Content:", doc.pageContent);
}