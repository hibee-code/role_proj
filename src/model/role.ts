import { sequelize } from '../config';
import { Model, DataTypes } from 'sequelize';

export class Role extends Model {
  static setPermissions(permissions: any) {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public name!: string;
  setPermissions: any;
}

// Initialize the Role model
Role.init({
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
    sequelize,
    modelName: 'role',
    tableName: "ROLE"

});

sequelize.sync().then(() => {
console.log('Database synchronized successfully.');
 });

