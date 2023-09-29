import dotenv from "dotenv";

dotenv.config();

const DB_URL: string = process.env.DATABASE_URL || "";

module.exports = DB_URL;
export default DB_URL;
