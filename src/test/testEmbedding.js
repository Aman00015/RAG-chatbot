import { splitDocuments } from "../utils/textSplitter.js";
import { loadDocuments } from "../index.js";

import {
  generateDocumentEmbedding,
  generateQueryEmbedding,
} from "../embeddings/embedding.js";

const documents = await loadDocuments();

console.log('Documents loaded:',documents.length);

const chunks = await splitDocuments(documents)
console.log('\nChunks created:',chunks.length);

const vectors = await generateDocumentEmbedding(chunks)

console.log('\nTotal vectors:',vectors.length);

console.log('\nFirst vector:',vectors[0]);
console.log('\nSecond vector:',vectors[1]);

const question = "What is machine learning";
console.log('\nGenerating query embedding');

const queryVector = await generateQueryEmbedding(question);

console.log('\nQuery vector:',queryVector);
console.log('\n query vector dimesions:',queryVector.length);






