import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters"


const CHUNK_SIZE=50;
const CHUNK_OVERLAP=20;

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:CHUNK_SIZE,
    chunkOverlap:CHUNK_OVERLAP
})

export async function splitDocuments(documents){
    const chunks = await splitter.splitDocuments(documents)
    console.log(`Created ${chunks.length} chunks`);
    return chunks    
}


