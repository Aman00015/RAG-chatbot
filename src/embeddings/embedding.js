import {OllamaEmbeddings} from "@langchain/ollama"

const EMBED_MODEL = 'nomic-embed-text';

export const embeddings = new OllamaEmbeddings({
    model:EMBED_MODEL,
    baseUrl:'http://localhost:11434'
})

/**
 * embedQuery() converts one query into one vector.
 * @param {string} text 
 * @returns {number}
 */
// text is text that we want to embed 
export async function generateQueryEmbedding(text){
    const vector = await embeddings.embedQuery(text);
// we pass text to embedding model
// langchain communicates with nomic-embed-text
// ollama processes text using nomic-embed and return numerical vectors
// resulting numerical value is returned
    return vector;
}

/**
 * embedDocuments() converts multiple document texts into multiple vectors.
 * @param {Document} chunks 
 * @returns {Array}
 */
// embedDocuments() expects an array of text strings, not LangChain Document objects.
export async function generateDocumentEmbedding(chunks){
    // extract text from langchain documents
    const texts = chunks.map(chunk => chunk.pageContent);
    // generate embedding for chunks
    const vectors = await embeddings.embedDocuments(texts)
    return vectors
}

