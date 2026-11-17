import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI .env.local ফাইলে পাওয়া যায়নি");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

export const client =
  globalForMongo.mongoClient ??
  new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    maxPoolSize: 5,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const db = client.db("yourlibrary");