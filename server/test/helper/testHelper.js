import faker from 'faker';
import models from '../../models/';

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
    title: 'User'
  }
};

export const user = [{
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
}];

export const document = [{
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
    models.Role.bulkCreate(role);
    models.User.bulkCreate(user, { individualHooks: true }).then(() => {
      models.Document.bulkCreate(document);
    });
  });
};

export default seeds();
