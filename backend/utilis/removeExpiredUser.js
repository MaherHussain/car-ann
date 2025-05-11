import mongoose from "mongoose";
import config from "../config.js";
import { userSchema } from "../models/index.js";

export async function deleteExpiredUsers() {
  await mongoose.connect(config.databaseURI);
  const fiveMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
  const result = await userSchema.deleteMany({
    isVerified: false,
    createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // older than 24h
  });
  console.log(`Deleted ${result.deletedCount} unverified users.`);
  mongoose.disconnect();
}
