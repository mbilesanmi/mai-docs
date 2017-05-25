import faker from 'faker';

const documentHelper = {
  privateDocument: {
    title: faker.company.catchPhrase(),
    docContent: faker.lorem.paragraph(),
    viewAccess: 'private',
  },

  publicDocument: {
    title: 'This is a new test document',
    docContent: faker.lorem.paragraph(),
    viewAccess: 'public',
  },

  roleDocument: {
    title: faker.company.catchPhrase(),
    docContent: faker.lorem.paragraph(),
    viewAccess: 'role',
  }
};

export default documentHelper;
