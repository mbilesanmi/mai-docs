module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Document', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      access: {
        type: Sequelize.ENUM('Public', 'Private', 'Role'),
        defaultValue: 'Public'
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
          as: 'ownerId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface /*  , Sequelize*/ =>
    queryInterface.dropTable('Document'),
};
