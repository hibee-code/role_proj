import { sequelize } from '../config';
import { DataTypes, Model } from 'sequelize';

// Define the User model
class User extends Model {
    setRoles(roles: any) {
        throw new Error('Method not implemented.');
    }
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public phone!: string; // Added phone attribute

    // Timestamps for createdAt and updatedAt
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    mfaSecret!: string;
    mfaEnabled: any;
}

// Define the User model attributes
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true, 
            validate: {
                isNumeric: true,
            },
        },
        mfaSecret: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mfaEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, // Default to 2FA being disabled
        },
        mfaToken: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
    },
    {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);


// Call sequelize.sync() to synchronize the model with the database schema
sequelize.sync().then(() => {
  console.log('Database synchronized successfully.');
});

export { User };
