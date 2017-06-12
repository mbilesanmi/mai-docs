'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Role = _models2.default.Role;

var RoleController = {
  create: function create(request, response) {
    if (request.body.title === '') {
      return response.status(400).send({
        message: 'Title field cannot be empty'
      });
    }
    return Role.findOne({
      where: { title: request.body.title }
    }).then(function (foundRole) {
      if (!foundRole) {
        Role.create({
          title: request.body.title
        }).then(function (role) {
          return response.status(201).send({
            role: role,
            message: 'Role created successfully'
          });
        }).catch(function (error) {
          return response.status(400).send({
            error: error,
            message: 'Error creating new role'
          });
        });
      }
    }).catch(function (error) {
      return response.status(409).send({
        error: error,
        message: 'Role must be unique'
      });
    });
  },
  getAll: function getAll(request, response) {
    Role.findAll({}).then(function (role) {
      return response.status(200).send(role);
    }).catch(function (error) {
      return response.status(400).send(error);
    });
  },
  getOne: function getOne(request, response) {
    Role.findById(request.params.id, {}).then(function (role) {
      if (!role) {
        return response.status(404).send({
          message: 'Role does not exist'
        });
      }
      return response.status(200).send(role);
    }).catch(function (error) {
      return response.status(400).send({
        error: error,
        message: 'Invalid roleID'
      });
    });
  }
};

exports.default = RoleController;