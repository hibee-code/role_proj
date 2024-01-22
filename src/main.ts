import * as dotenv from 'dotenv'
 import express, { Request, Response } from "express";
 import { Sequelize } from 'sequelize';
 import sequelizeConfig from './config/sequelize.config';
 import authRouter from "./routes/authrouter";
import cookieParser from "cookie-parser";
import cors from "cors";

// import cors from 'cors'

// import cookieParser from 'cookie-parser'
import logger from "morgan";
// import {connectDB, sequelize} from './config/db'


const app = express();

dotenv.config();



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"))
app.use(
    cors({
      credentials: true,
    })
  );
app.use("/user",authRouter )


const port = process.env.PORT || 5000;





const { username, password, database, host, dialect } = sequelizeConfig.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect, // Specify the dialect explicitly (e.g., 'postgres')
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  
    // Sync the database, this will create tables based on your models
    await sequelize.sync({ alter: true });
    app.listen(port, async () => {
        console.log(`Server is running on port ${port}`);
    }),
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initializeDatabase();


