

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Permission extends Model {
  public id!: number;
  public name!: string;
}

// Initialize the Permission model
Permission.init({
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
  
  export { Permission };