import { Model } from 'sequelize';
import { sequelize } from '../config/db';

class UserRole extends Model {
  public userId!: number;
  public roleId!: number;
}

// Initialize the UserRole model
UserRole.init({}, {
  // Sequelize instance
  sequelize,
  modelName: 'userRole',
});

export default UserRole;
