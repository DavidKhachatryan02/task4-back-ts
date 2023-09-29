import { Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const DB_URL: string = process.env.DATABASE_URL || "";
export const dialect: Dialect = "postgres";

//!NOT USED NEED TO FIX
