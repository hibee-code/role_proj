import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "ibrahim",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "role_mfa_db",
  dialect: "postgres",
  logging: false,
});

export { sequelize };