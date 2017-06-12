'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.document = exports.user = exports.newData = exports.role = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _models = require('../../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var role = exports.role = {
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

var newData = exports.newData = {
  newRole: {
    title: 'User'
  },

  emptyRole: {
    title: ''
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

var user = exports.user = {
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
    firstname: _faker2.default.name,
    lastname: _faker2.default.name,
    username: _faker2.default.username,
    email: _faker2.default.email,
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

var document = exports.document = {
  document1: {
    title: 'seed document test',
    content: _faker2.default.lorem.paragraph(),
    viewAccess: 'Private',
    ownerId: 1
  },

  document2: {
    title: 'public seed document test',
    content: _faker2.default.lorem.paragraph(),
    viewAccess: 'Public',
    ownerId: 1
  },

  newDocument1: {
    title: 'New Doc 1',
    content: _faker2.default.lorem.paragraph(2),
    viewAccess: 'Private',
    ownerId: 1
  },
  newDocument2: {
    title: 'New Doc 2',
    content: _faker2.default.lorem.paragraph(2),
    viewAccess: 'Private',
    ownerId: 1
  },
  emptyDocument: {
    title: '',
    content: _faker2.default.lorem.paragraph(2),
    viewAccess: 'Private',
    ownerId: 1
  }
};