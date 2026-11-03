import { loadDocuments } from "../index.js";
import { splitDocuments } from "../utils/textSplitter.js";

const documents = await loadDocuments()

console.log('og documents:',documents.length);

const chunks = await splitDocuments(documents)

for(let i=0;i<chunks.length;i++){
    console.log(`\n=========== Chunks${i+1} ==========`);
    console.log('Source:',chunks[i].metadata.source);
    console.log('Content:',chunks[i].pageContent);
    console.log('Characters',chunks[i].pageContent.length);
}
