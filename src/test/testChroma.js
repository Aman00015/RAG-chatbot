import { loadDocuments } from "../loaders/documentLoader.js";
import {splitDocuments} from '../utils/textSplitter.js'
import { createVectorStore } from "../vectorstore/chromaStore.js";

const documents = await loadDocuments();

console.log("Loaded documents", documents.length);

const chunks = await splitDocuments(documents)

console.log('Total Chunks:',chunks.length);

const vectorStore = await createVectorStore(chunks);

console.log('ChromaDB setup completed');

