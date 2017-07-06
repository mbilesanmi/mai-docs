import faker from 'faker';
import colors from 'colors';
import log from 'npmlog';
import models from '../../models';

export const roles = [
  { title: 'Admin' },
  { title: 'Author' },
  { title: 'mai' }
];
export const users = [
  {
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
    firstname: 'dami',
    lastname: 'peju',
    username: 'damipeju',
    email: 'dami@peju.com',
    password: 'password',
    roleId: 2
  }
];

export const documents = [{
  title: 'seed document test',
  content: faker.lorem.paragraph(),
  access: 0,
  ownerId: 1,
  roleId: 1
}, {
  title: 'public seed document test',
  content: faker.lorem.paragraph(),
  access: -1,
  ownerId: 1,
  roleId: 1
}, {
  title: 'user 4 seed document test',
  content: faker.lorem.paragraph(),
  access: -1,
  ownerId: 3,
  roleId: 2
}];

const seeds = () => models.sequelize.sync({ force: true })
  .then(() => models.Role.bulkCreate(roles)
    .then(() => {
      log.info('Users created'.cyan);
      return models.User.bulkCreate(users, { individualHooks: true })
      .then(() => {
        log.info('Documents created'.yellow);
        return models.Document.bulkCreate(documents);
      });
    }));

export default seeds;

