import mongoose from "mongoose";  
import { getLocationOrigin } from "next/dist/shared/lib/utils";

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
  throw new Error ("Please define the MONGODB_URI environment variable")
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { count: null, promise: null};
}

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if(!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'collabspace',
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

(global as any).mongoose = cached;

export default connectToDB;