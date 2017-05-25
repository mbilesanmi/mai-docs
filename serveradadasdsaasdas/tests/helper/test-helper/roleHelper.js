import faker from 'faker';

const roleHelper = {
  testSuperUser: {
    name: 'John Doe',
    username: 'jdoe',
    email: 'john@doe.com',
    password: 'johndoe',
    roleId: 1
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
    title: 'Admin'
  },
  updateTestRole: {
    title: 'Administrator'
  },
  newRole: {
    title: 'Author'
  },
  regRole: {
    title: 'normal'
  }
};

export default roleHelper;
