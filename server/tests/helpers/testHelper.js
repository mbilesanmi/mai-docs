import faker from 'faker';

const testHelper = {
  newRole: {
    title: faker.name.title()
  },
  adminRole: {
    title: 'Admin'
  },
  userRole: {
    title: 'Author'
  },
  documentRole: {
    title: 'Admin'
  },
  adminUser: {
    firstname: 'Maranatha',
    lastname: 'Iles',
    username: 'maranatha',
    email: 'maranatha@iles.com',
    password: 'admin',
  },
  userOne: {
    firstname: 'Hope',
    lastname: 'Tommy',
    username: 'hopetommy',
    email: 'hope@tommy.com',
    password: 'author',
  },
  userTwo: {
    firstname: 'Maranatha',
    lastname: 'Iles',
    username: 'maranatha',
    email: 'maranatha@iles.com',
    password: 'author',
  },
  documentOwner: {
    firstname: 'Babs',
    lastname: 'Tope',
    username: 'babstope',
    email: 'babs@tope.com',
    password: 'docuser',
  },
  publicDocument: {
    title: 'hello world',
    content: 'hello world, I love to program ',
    access: 'Public'
  },
  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'Private'
  }
};

export default testHelper;
