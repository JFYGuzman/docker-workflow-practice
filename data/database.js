import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
  console.error("MONGODB_URI environment variable is not set");
  process.exit(1);
}

const client = new MongoClient(uri);

console.log("Trying to connect to db");

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log("Connected successfully to server");
} catch (error) {
  console.log("Connection failed.");
  await client.close();
  console.log("Connection closed.");
  process.exit(1);
}

const database = client.db(dbName);

export default database;
