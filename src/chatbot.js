import readline from "node:readline/promises"
import { askQuestion } from "./rag/answer.js";
import {stdin,stdout} from "node:process"

const rl = readline.createInterface({
    input:stdin,
    output: stdout
})

const chatHistory = []

/**
 * Formats an error including its underlying cause when available (e.g. fetch ECONNREFUSED).
 */
function formatError(error) {
    const cause = error?.cause;
    if (!cause) return error?.message ?? String(error);
    const nestedDetails = Array.isArray(cause.errors)
        ? [...new Set(cause.errors.map((e) => e?.code || e?.message).filter(Boolean))].join(", ")
        : "";
    const causeDetail = cause.message || cause.code || nestedDetails;
    return causeDetail ? `${error.message} (${causeDetail})` : error.message;
}

async function startChatbot(){
    console.log('\n=============================');
    console.log('       LOCAL RAG CHATBOT       ');
    console.log('\n=============================');
    
    console.log('Chatbot ready!');
    console.log('Type "exit" to quit \n');

    while(true){
        const question  = await rl.question("You: ")
        if(question.trim().toLowerCase() === "exit") break;

        if(!question.trim()) continue;

        try {
            console.log('\nSearching your documents\n');
            
            const result = await askQuestion(question,chatHistory)
            console.log('Assistant:\n');
            console.log(result.answer);

            if(result.sources.length > 0){
                console.log('\nSources:');

                result.sources.forEach(source => {
                    console.log('-',source);
                })
                
            }

            chatHistory.push(
                {
                    role:"user",
                    content:question,
                },
                {
                    role:"assistant",
                    content: String(result.answer)
                }
            )
            if(chatHistory.length > 10){
                chatHistory.splice(0, chatHistory.length - 10);
            }
            console.log('\n');
        } catch (error) {
            console.error('\nSomething went wrong:', formatError(error))
            console.log('Please try again \n');   
        }
    }
    rl.close();
    console.log('\nGoodbye');    
}

startChatbot();