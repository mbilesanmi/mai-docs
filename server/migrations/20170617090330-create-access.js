// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     queryInterface.createTable('Access', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         type: Sequelize.INTEGER
//       },
//       accessid: {
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.NUMBER
//       },
//       title: {
//         type: Sequelize.STRING,
//         unique: true
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: queryInterface =>
//     queryInterface.dropTable('Access')
// };
