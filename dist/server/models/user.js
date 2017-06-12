'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Enter your firstname'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
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
        notEmpty: {
          message: 'You must choose a unique Username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
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
      associate: function associate(models) {
        // associations can be defined here
        User.belongsTo(models.Role, {
          foreignKey: 'roleId'
        });
        User.hasMany(models.Document, {
          foreignKey: 'ownerId',
          as: 'documents'
        });
      }
    },
    instanceMethods: {
      hashPassword: function hashPassword() {
        this.password = _bcrypt2.default.hashSync(this.password, _bcrypt2.default.genSaltSync(8));
      },
      validPassword: function validPassword(password) {
        return _bcrypt2.default.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user) {
        user.hashPassword();
      },
      beforUpdate: function beforUpdate(user) {
        /* eslint-disable no-underscore-dangle*/
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};