import { Dialect } from "sequelize";
import { DB_URL } from "../../constants/env";
import { dialect } from "../../constants/config";

const env: string = process.env.NODE_ENV || "development";

interface DatabaseConfig {
  dialect: Dialect;
  url: string;
  migrationStorageTableName: string;
}

interface Config {
  [key: string]: DatabaseConfig;
}

const config: Config = {
  [env]: {
    dialect,
    url: DB_URL || "",
    migrationStorageTableName: "_migrations",
  },
};

export default config;
