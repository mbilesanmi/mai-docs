import faker from 'faker';

const Users = {
  superUser: {
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  admin: {
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  author: {
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  testSuperUser: {
    name: 'John Doe',
    username: 'jdoe',
    email: 'john.doe@andela.com',
    password: 'password',
    roleId: 1
  },
  testAdmin: {
    name: 'John Doe',
    username: 'jdoe',
    email: 'john@doe.com',
    password: 'password',
    roleId: 1
  },
  updateTestUser: {
    name: 'J.D. Doe',
    username: 'jdoe',
    email: 'john@doe.com',
    password: 'password',
    roleId: 1
  }
};

export default Users;
