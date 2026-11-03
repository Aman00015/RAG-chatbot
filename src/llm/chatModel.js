

import {ChatOllama} from '@langchain/ollama'

const CHAT_MODEL = 'qwen3.5:4b'

export const chatModel = new ChatOllama({
    model:CHAT_MODEL,
    baseUrl:'http://localhost:11434',
    temperature:0, // encourages more consistent, less creative answers.
    think:false
})

