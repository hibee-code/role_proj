import express, { Router } from "express";
import  { asign_role, create, deleteRole, getAllRole, updateRole } from "../controller/role";


export const roleRouter: Router = express.Router();


roleRouter.post('/assign-roles',asign_role);
roleRouter.get('/', getAllRole);
roleRouter.post('/',  create);
roleRouter.put('/:name',updateRole);
roleRouter.delete('/:name', deleteRole)

