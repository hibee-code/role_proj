import { sequelize } from '../config';
import { Model, DataTypes } from 'sequelize';

class Role extends Model {
  public id!: number;
  public name!: string;
}

// Initialize the Role model
Role.init({
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
  export { Role };

export default Role;
