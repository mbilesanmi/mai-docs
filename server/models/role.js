export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'The title field cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations are defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId'
        });
      }
    }
  });
  return Role;
};
