'use strict';
const roles = [
  {
    title: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Author',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', roles, { returning: true, validate: true });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', null, {});
  }
};
