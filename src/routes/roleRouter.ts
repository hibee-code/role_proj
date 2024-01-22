import express, { Router } from "express";
import  { asign_role, create, deleteRole, getAllRole, updateRole } from "../controller/role";


const authRouter: Router = express.Router();


Router.post('/assign-roles',asign_role);
Router.get('/', getAllRole);
Router.post('/',  create);
Router.put('/:name',updateRole);
Router.delete('/:name', deleteRole)

