/* eslint-disable */
'use strict';
const faker = require('faker');
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
  };

  // Add to document
  documents.push(details);
}

module.exports = {
  up(queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('Document', [{
    //   name: 'John Doe',
    //   isBetaMember: false
    // }], {});
    return queryInterface.bulkDelete('Documents', documents, {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Documents', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
