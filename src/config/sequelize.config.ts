// sequelize.config.ts

import { Dialect } from 'sequelize';
import dotenv from "dotenv"
dotenv.config();

interface SequelizeConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    port?: number;
    pool?: {
      max?: number;
      min?: number;
      acquire?: number;
      idle?: number;
    };
    // Add other configurations as needed
  };
}

const sequelizeConfig: SequelizeConfig = {
  development: {
    username: process.env.DB_USER || "ibrahim",
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'role_mfa_db',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  // Other environment configurations (e.g., production, test) can be added here.
};

export default sequelizeConfig;
