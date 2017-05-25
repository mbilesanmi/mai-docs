import faker from 'faker';

const Role = {
  superUser: {
    firstname: faker.name.findName(),
    lastname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  testSuperUser: {
    name: 'John Doe',
    username: 'jdoe',
    email: 'john.doe@andela.com',
    password: 'password',
    roleId: 1
  },
  superUserRole: {
    title: faker.name.title()
  },
  adminRole: {
    title: faker.name.title()
  },
  userRole: {
    title: faker.name.title()
  },
  roleIdTest: {
    title: faker.name.title()
  },
  testRole: {
    title: 'Test-User'
  },
  updateTestRole: {
    title: 'Test User'
  },
};

export default Role;
