import { Request, Response } from 'express';
import { User } from '../model/adminUser';

export const asign_role =async (req: Request, res: Response) => {
  try {
    const { username, roleNames } = req.body;
    const user = await User.create({ username });
    const roles = await roles.findAll({ where: { name: roleNames } });
    await user.setRoles(roles);

    res.status(201).json({ message: `Roles assigned to user ${username} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


 export const getAllRole = async (_req: Request, res: Response) => {
  try {
    const roles = await roles.findAll({ include: Permissions });
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 export const create = async (req: Request, res: Response) => {
  try {
    const { name, permissionNames } = req.body;
    const permissions = await permissions.findAll({ where: { name: permissionNames } });
    const role = await role.create({ name });
    await role.setPermissions(permissions);

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
    const role = await role.findOne({ where: { name } });

    if (role) {
      const permissions = await permissions.findAll({ where: { name: permissionNames } });
      await role.setPermissions(permissions);
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
    const { name } = req.params;
    const role = await role.findOne({ where: { name } });

    if (role) {
      await role.destroy();
      res.json({ message: `Role ${name} deleted successfully` });
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
