// import { Router } from 'express';
// import { login, register } from '../controller/authcontroller';

// export default (authRouter: Router) => {
//   authRouter.post("/auth/register", register);
//   authRouter.post("/auth/login", login);
// }

import express, { Router } from "express";
import { login, register } from "../controller/authcontroller";

const authRouter: Router = express.Router();

  authRouter.post("/auth/register", register);
  authRouter.post("/auth/login", login);

  export default authRouter;
