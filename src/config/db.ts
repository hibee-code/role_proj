import * as dotenv from 'dotenv'
import { Sequelize, DataTypes } from "sequelize";
dotenv.config();

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;

const sequelize = new Sequelize(POSTGRES_URL);

async function connectDB() {
    try {
      await sequelize.authenticate();
      console.log("Connected has been established successfully");
    } catch (error) {
      console.log("Unable to connect to database", error);
    }
  }
  
  export { connectDB, sequelize, Sequelize, DataTypes };

  
 