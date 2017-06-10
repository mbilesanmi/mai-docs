import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z\'-]+$', 'i'],
          message: 'firstname can only contain letters and/or - and \''
        },
        len: {
          args: [2, 20],
          message: 'firstname must be between 2 and 20 characters long'
        },
        notEmpty: {
          message: 'Enter your firstname'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z\'-]+$', 'i'],
          message: 'lastname can only contain letters and/or - and \''
        },
        len: {
          args: [2, 20],
          message: 'lastname must be between 2 and 20 characters long'
        },
        notEmpty: {
          message: 'Enter your lastname'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: ['^[a-z0-9_.]+$', 'i'],
          message: 'username must contains only letters, numbers, "." and "_"'
        },
        len: {
          args: [4, 16],
          message: 'username cannot be less than 4 or greater than 16 characters'
        },
        notEmpty: {
          message: 'You must choose a unique Username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'This email is already in use'
      },
      validate: {
        isEmail: {
          args: true,
          message: 'Please enter a valid email address!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          message: 'Your password is really short!'
        }
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      validate: {
        isInt: {
          message: 'Role Id must be an integer'
        }
      }
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
        User.hasMany(models.Document, {
          foreignKey: 'ownerId',
          as: 'documents',
          onDelete: 'CASCADE'
        });
      }
    },
    instanceMethods: {
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
      beforUpdate(user) {
        /* eslint-disable no-underscore-dangle*/
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};
