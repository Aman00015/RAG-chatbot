import fs from "node:fs/promises";
import path from "node:path";

import { Document } from "@langchain/core/documents";
import { PDFParse } from "pdf-parse";

console.log("===============================");
console.log("       LOCAL RAG CHATBOT       ");
console.log("===============================");

console.log("Node.js environment is working");
console.log("Our RAG project has started");

export async function loadDocuments() {
  const documents = []; // empty array
  // read directory
  const files = await fs.readdir("./docs", {
    withFileTypes: true,
  });

  for (const file of files) {
    // create a complete relative path to files (documents) stored
    const filePath = path.join("./docs", file.name);
    console.log("found:", filePath);
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".txt" || ext === ".md") {
      const content = await fs.readFile(filePath, "utf-8");
      documents.push(
        new Document({
          pageContent: content,
          metadata: {
            source: filePath,
          },
        }),
      );
    } else if (ext === ".pdf") {
      const buffer = await fs.readFile(filePath);
      const parser = new PDFParse({ data: buffer });
      const data = await parser.getText();
      await parser.destroy();

      documents.push(
        new Document({
          pageContent: data.text,
          metadata: {
            source: filePath,
          },
        }),
      );
    }
  }
  return documents;
}
