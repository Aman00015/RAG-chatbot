import {retrieveDocuments} from '../rag/retriever.js'

const question = 'What is machine learning'

const results = await retrieveDocuments(question)

console.log('\nUsers questions:',question);

console.log('\nRetrieved documents\n');

results.forEach(([doc,score],index)=>{
    console.log(`\n --- Result ${index+1} ----`);
    console.log('Distance:',score);

    console.log('Source:',doc.metadata.source);
    console.log('Content:',doc.pageContent); 
})

