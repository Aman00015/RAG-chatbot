import path from "node:path";
import { createHash } from "node:crypto";
import { Document } from "@langchain/core/documents";
import { PDFParse } from "pdf-parse";

const SUPPORTED_EXTENSIONS = [".txt", ".md", ".pdf"];

export async function processFile({ buffer, fileName, source, documentId }) {
  // 1. Validate the input.
  if (!buffer || buffer.length === 0) {
    throw new Error("File is empty.");
  }

  if (!fileName) {
    throw new Error("Filename is required.");
  }

  if (!source) {
    throw new Error("Document source is required");
  }

  const stableDocumentId = documentId || generateDocumentId(source);

  // 2. Identify the file extension.
  const ext = path.extname(fileName).toLowerCase();

  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    throw new Error(`Unsupported file type: ${ext}`);
  }

  // 3. Process TXT and Markdown files.
  if (ext === ".txt" || ext === ".md") {
    const content = buffer.toString("utf8");

    if (!content.trim()) {
      throw new Error("No extractable text found.");
    }

    return [
      new Document({
        pageContent: content,
        metadata: {
          documentId: stableDocumentId,
          source,
          fileName,
          fileType: ext.slice(1),
        },
      }),
    ];
  }

  // 4. Process PDF files page by page.
  if (ext === ".pdf") {
    const parser = new PDFParse({
      data: buffer,
    });

    let result;

    try {
      result = await parser.getText();
    } finally {
      await parser.destroy();
    }

    // 5. Create one Document for each PDF page.
    const documents = result.pages
      .filter((page) => page.text.trim())
      .map((page) => {
        return new Document({
          pageContent: page.text,
          metadata: {
            documentId:stableDocumentId,
            source,
            fileName,
            fileType: "pdf",
            pageNumber: page.num,
          },
        });
      });

    if (documents.length === 0) {
      throw new Error("No extractable text found in PDF.");
    }

    return documents;
  }
}

function generateDocumentId(source) {
  return (
    "doc_" + createHash("sha256").update(source).digest("hex").slice(0, 24)
  );
}
