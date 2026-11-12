import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false,
});

const collection = await client.getCollection({
  name: "my_document",
});

const count = await collection.count();

console.log("Total records in ChromaDB:", count);