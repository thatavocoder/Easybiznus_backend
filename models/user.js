'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt'); // Changed from bcryptjs to bcrypt

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Example: User.hasMany(models.Post, { foreignKey: 'userId' });
    }

  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name is required'
        },
        len: {
          args: [2, 50],
          msg: 'First name must be between 2 and 50 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name is required'
        },
        len: {
          args: [2, 50],
          msg: 'Last name must be between 2 and 50 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters long'
        }
      }
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        is: {
          args: /^[\+]?[1-9][\d]{0,15}$/,
          msg: 'Please provide a valid mobile number'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('buyer', 'seller'),
      allowNull: false,
      defaultValue: 'buyer',
      validate: {
        isIn: {
          args: [['buyer', 'seller']],
          msg: 'Role must be either buyer or seller'
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        unique: true,
        fields: ['mobileNumber']
      },
      {
        fields: ['role']
      },
      {
        fields: ['isActive']
      }
    ],
  });

  return User;
};