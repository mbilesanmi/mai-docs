'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roles = undefined;
exports.users = users;
exports.documents = documents;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export function roles() {
var roles = exports.roles = [{
  title: 'Admin' }, { title: 'Author' }, { title: 'Guest' }];
// return models.Role.bulkCreate(role);
// }

function users() {
  var user = [{
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
    firstname: _faker2.default.name,
    lastname: _faker2.default.name,
    username: _faker2.default.username,
    email: _faker2.default.email,
    password: 'faker.password',
    roleId: 2
  }];
  return _models2.default.User.bulkCreate(user);
}

function documents() {
  var document = [{
    title: 'seed document test',
    content: _faker2.default.lorem.paragraph(),
    viewAccess: 'Private',
    ownerId: 1
  }, {
    title: 'public seed document test',
    content: _faker2.default.lorem.paragraph(),
    viewAccess: 'Public',
    ownerId: 2
  }];
  return _models2.default.Document.bulkCreate(document);
}