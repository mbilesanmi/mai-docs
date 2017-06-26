import faker from 'faker';

export const role = {
  admin: {
    title: 'Admin'
  },

  author: {
    title: 'Author'
  },

  guest: {
    title: 'Guest'
  },

  newRole: {
    title: 'User'
  },

  emptyRole: {
    title: ''
  }
};

export const newData = {
  newRole: {
    title: 'User'
  },

  emptyRole: {
    title: ''
  },

  newAdmin: {
    firstname: 'Mark',
    lastname: 'Mark',
    username: 'mark',
    email: 'mark@mark.com',
    password: 'password',
    roleId: 1
  },
  newUser: {
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe',
    email: 'john@doe.com',
    password: 'password',
    roleId: 2
  },
  emptyUser: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    roleId: 2
  }
};

export const user = {
  adminUser1: {
    firstname: 'Admin',
    lastname: 'Admin',
    username: 'Admin',
    email: 'admin@admin.com',
    password: 'password',
    roleId: 1
  },

  adminUser2: {
    firstname: 'Mai',
    lastname: 'Iles',
    username: 'maiiles',
    email: 'mai@iles.com',
    password: 'password',
    roleId: 1
  },

  regularUser1: {
    firstname: 'Hope',
    lastname: 'Tommy',
    username: 'hopetommy',
    email: 'hope@tommy.com',
    password: 'password',
    roleId: 2
  },

  regularUser2: {
    firstname: 'dami',
    lastname: 'peju',
    username: 'damipeju',
    email: 'dami@peju.com',
    password: 'password',
    roleId: 2
  },

  fakeUser: {
    firstname: 'faker',
    lastname: 'faker',
    username: 'faker',
    email: 'fake@email.com',
    password: 'password',
    roleId: 2
  }
};

export const document = {
  document1: {
    title: 'seed document test',
    content: faker.lorem.paragraph(),
    viewAccess: 0,
    ownerId: 1,
    roleId: 1
  },

  document2: {
    title: 'public seed document test',
    content: faker.lorem.paragraph(),
    viewAccess: -1,
    ownerId: 1,
    roleId: 1
  },

  document3: {
    title: 'user 4 seed document test',
    content: faker.lorem.paragraph(),
    viewAccess: -1,
    ownerId: 3,
    roleId: 2
  },

  newDocument1: {
    title: 'New Doc 1',
    content: faker.lorem.paragraph(2),
    viewAccess: 2,
    ownerId: 3,
    roleId: 2
  },
  newDocument2: {
    title: 'New Doc 2',
    content: faker.lorem.paragraph(2),
    viewAccess: 'sdasds',
    ownerId: 3,
    roleId: 2
  },
  emptyDocument: {
    title: '',
    content: faker.lorem.paragraph(2),
    viewAccess: -1,
    ownerId: 3,
    roleId: 2
  }
};
