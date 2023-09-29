import { config } from "dotenv";

config();

const DB_URL = process.env.DATABASE_URL;
const env = process.env.NODE_ENV || "development";
const dialect = "postgres";

export default {
  [env]: {
    dialect,
    url: DB_URL,
    migrationStorageTableName: "_migrations",
  },
};
