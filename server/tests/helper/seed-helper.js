import faker from 'faker';
import models from '../../models/';

export const roles = [{
  title: 'Super User'
}, {
  title: 'Author'
}, {
  title: 'Guest'
}];

export const users = [{
  firstname: 'admin',
  lastname: 'admin',
  username: 'admin',
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
}];

export const documents = [{
  title: 'seed document test',
  content: faker.lorem.paragraph(),
  access: 'Private',
  ownerId: 1
}, {
  title: 'public seed document test',
  content: faker.lorem.paragraph(),
  access: 'Public',
  ownerId: 1
}];

const seeds = () => {
  models.sequelize.sync({ force: true }).then(() => {
    // Table created
    models.Roles.bulkCreate(roles);
    models.Users.bulkCreate(users, { individualHooks: true }).then(() => {
      models.Documents.bulkCreate(documents);
    });
  });
};

export default seeds();
