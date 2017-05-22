export default (sequelize, DataTypes) => {
  const Doc = sequelize.define('Doc', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Doc.belongsTo(models.User, {
          foreignKey: 'ownerId'
        });
      }
    }
  });
  return Doc;
};
