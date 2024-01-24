

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export class Permission extends Model {
  public id!: number;
  public name!: string;
}

// Initialize the Permission model
Permission.init( {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // Sequelize instance
  sequelize,
  modelName: 'permission',
});

export default Permission;

sequelize.sync().then(() => {
    console.log('Database synchronized successfully.');
  });
  