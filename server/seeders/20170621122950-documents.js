const faker = require('faker');

// Generate for Document
const documents = [];

// Generate 300 documents
for (let i = 0; i < 500; i++) {
  let access;
  //generate a random user Id
  const userId = Math.floor(Math.random() * 30) + 1; 
  const roleId = Math.floor(Math.random() * 2) + 1; 

  // Generate 100 Public Documents
  if (i < 100) {
    access = 0;
  } else if (i < 300) {
    // Generate 100 Private Documents
    access = -1;
  } else {
    // Generate 100 Role Documents
    access = roleId;
  }

  // Generate Document Details
  const details = {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(4),
    ownerId: userId,
    access,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Add to document
  documents.push(details);
}

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', documents, {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {
      returning: true, validate: true
    });
  }
};
