/*eslint-disable*/
'use strict';
const faker = require('faker');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();
const encryptedPassword = bcrypt.hashSync('password', salt);

// Add a Real User
const users = [{
  firstname: 'Maranatha',
  lastname: 'Ilesanmi',
  email: 'mai@iles.com',
  password: encryptedPassword,
  username: 'mai',
  roleId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}];

// Generate 30 Random Fakers User
for (var i = 0; i < 30; i++) {

  // Generate a random roleId
  let roleId;

  // Generate roles
  if (i < 4) {
    // Generate 3 Admins
    roleId = 1;
  } else {
    // Generate over 20 Authors
    roleId = 2;
  }

  // Generate their details
  const details = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: encryptedPassword,
    roleId,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Add to the Users Array
  users.push(details);
}

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', users, { returning: true, validate: true });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
