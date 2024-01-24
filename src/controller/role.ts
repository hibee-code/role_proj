import { Request, Response } from 'express';
import { User } from '../model/adminUser';
import { Role } from '../model/role';
import { Permission } from '../model/permission'

export const asign_role =async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const user = await User.create({ userId });
    const roles = await Role.findAll({ where: { name: Role.name } });
    user.setRoles(roles);

    res.status(201).json({ message: `Roles assigned to user ${userId} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


 export const getAllRole = async (_req: Request, res: Response) => {
  try {
    const roles = await Role.findAll({ include: Permission });
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 export const create = async (req: Request, res: Response) => {
  try {
    const { name, permissionId } = req.body;
    const permissions = await Permission.findAll({ where: { name: permissionId } });
    const roles = await Role.create({ name });
    await roles.setPermissions(permissions);

    res.status(201).json({ message: `Role ${name} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { permissionNames } = req.body;
    const roles = await Role.findOne({ where: { name } });

    if (roles) {
      const permissions = await Permission.findAll({ where: { name: permissionNames } });
      await Role.setPermissions(permissions);
      res.json({ message: `Role ${name} updated successfully` });
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const roles = await Role.findOne({ where: { id } });

    if (roles) {
      await roles.destroy();
      res.json({ message: `Role ${id} deleted successfully` });
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
