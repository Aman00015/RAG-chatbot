import { loadDocuments } from "../index.js";

const documents = await loadDocuments();

console.log("Total documents:", documents.length);

for(const doc of documents){
    console.log("\n source:",doc.metadata.source);
    console.log("Content:",doc.pageContent);
    
    
}
