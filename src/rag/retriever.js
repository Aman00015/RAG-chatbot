import {getVectorStore} from '../vectorstore/chromaStore.js'

// This means we want the five most relevant chunks for each question.
const RETRIEVAL_K = 5;

export async function retrieveDocuments(question){
    const vectorStore = await getVectorStore()

    const results = await vectorStore.similaritySearch(
        question,RETRIEVAL_K
    )
return results
}