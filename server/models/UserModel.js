export default (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    loggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        UserModel.belongsTo(models.Role, {
          foreignKey: 'roleId'
        });
        UserModel.hasMany(models.Doc, {
          foreignKey: 'ownerId'
        });
      }
    }
  });
  return UserModel;
};
