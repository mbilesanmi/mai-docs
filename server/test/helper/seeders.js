import faker from 'faker';
import models from '../../models';

export const roles = [{
  title: 'Admin' },
  { title: 'Author' },
  { title: 'Guest' }
];

export function users() {
  const user = [{
    firstname: 'Admin',
    lastname: 'Admin',
    username: 'Admin',
    email: 'admin@admin.com',
    password: 'password',
    roleId: 1
  }, {
    firstname: 'Mai',
    lastname: 'Iles',
    username: 'maiiles',
    email: 'mai@iles.com',
    password: 'password',
    roleId: 1
  }, {
    firstname: 'Hope',
    lastname: 'Tommy',
    username: 'hopetommy',
    email: 'hope@tommy.com',
    password: 'password',
    roleId: 2
  }, {
    firstname: faker.name,
    lastname: faker.name,
    username: faker.username,
    email: faker.email,
    password: 'faker.password',
    roleId: 2
  }];
  return models.User.bulkCreate(user);
}

export function documents() {
  const document = [{
    title: 'seed document test',
    content: faker.lorem.paragraph(),
    viewAccess: 'Private',
    ownerId: 1
  }, {
    title: 'public seed document test',
    content: faker.lorem.paragraph(),
    viewAccess: 'Public',
    ownerId: 2
  }];
  return models.Document.bulkCreate(document);
}
