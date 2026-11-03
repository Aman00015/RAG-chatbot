import { askQuestion } from "../rag/answer.js";

const question = "What is Machine Learning";

console.log("Question:", question);
console.log("\nGenerating answer:...\n");

const result = await askQuestion(question);

console.log("Answer:");
console.log(result.answer);

console.log("\nSources:");

result.sources.forEach((source) => {
  console.log("-", source);
});
