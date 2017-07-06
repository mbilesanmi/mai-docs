/* eslint-disable */
'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync();
const encryptedPassword = bcrypt.hashSync(encryptedPassword, salt);

// Add a Real User
let users = [{
    firstname: 'Maranatha',
    lastname: 'Ilesanmi',
    email: 'mai@iles.com',
    password: 'password',
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
    // Generate 3 SuperAdmins
    roleId = 1;
  } else {
    // Generate over 20 Normal Users
    roleId = 2;
  }

  // Generate their details
  const details = {
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    email: faker.internet.email(),
    password: encryptedPassword,
    roleId: roleId,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // Add to the Users Array
  users.push(details);
};

// Generate for Document
let documents = [];

// Generate 300 documents
for (var i = 0; i < 400; i++) {
  let access;
  //generate a random user Id
  const userId = Math.floor(Math.random() * 30) + 1; 
  const roleId = Math.floor(Math.random() * 2) + 1; 

  // Generate 100 Public Documents
  if (i < 150) {
    access = -1;
  } else if (i < 220) {
    // Generate 100 Private Documents
    access = 0;
  } else {
    // Generate 100 Role Documents
    access = roleId;
  }

  // Generate Document Details
  const details = {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    ownerId: userId,
    access: access,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // Add to document
  documents.push(details);
};


// Generate Roles
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
]

// Add to the Database
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', users)
      .then(() => queryInterface.bulkInsert('Document', documents))
        .then(() => queryInterface.bulkInsert('Role', roles));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {})
      .then(() => queryInterface.bulkDelete('Document', null, {}))
        .then(() => queryInterface.bulkDelete('Role', null, {}));
  }
};
