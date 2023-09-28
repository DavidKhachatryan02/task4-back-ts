import dotenv from "dotenv";

dotenv.config();

export const DB_URL: string = process.env.DATABASE_URL || "";
