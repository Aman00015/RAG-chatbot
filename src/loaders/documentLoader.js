import fs from "node:fs/promises";
import path from "node:path";


import { processFile } from "./fileProcessor.js";

const DOCS_DIR = path.resolve("./docs");

export async function loadDocuments() {
  const documents = [];

  const files = await fs.readdir(DOCS_DIR, {
    withFileTypes: true,
  });

  for (const file of files) {
    if (!file.isFile()) continue;

    const filePath = path.join(DOCS_DIR, file.name);

    console.log("found:", filePath);

    try {
      const buffer = await fs.readFile(filePath);

      const source = path
        .relative(process.cwd(), filePath)
        .replaceAll("\\", "/");

      const fileDocument = await processFile({
        buffer,
        fileName: file.name,
        source,
      });
      documents.push(...fileDocument);

      console.log(`Loaded: ${source}`);
    } catch (error) {
      console.error(`failed to load ${file.name}`, error.message);
    }
  }
  return documents;
}
