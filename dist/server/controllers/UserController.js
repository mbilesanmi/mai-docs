'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;
var Documents = _models2.default.Document;
var secret = 'secret';

var UserController = {
  login: function login(request, response) {
    if (request.body.loginId === '' || request.body.password === '') {
      return response.status(400).send({
        status: 400,
        message: 'Fields cannot be empty'
      });
    }
    return User.findOne({
      where: {
        $or: [{
          username: request.body.loginId
        }, {
          email: request.body.loginId
        }]
      }
    }).then(function (user) {
      if (!user) {
        return response.status(404).send({
          status: 404,
          message: 'Invalid login details'
        });
      } else if (user.validPassword(request.body.password)) {
        var userData = {
          id: user.id,
          name: user.firstname + ' ' + user.lastname,
          username: user.username,
          email: user.email,
          phone: user.phone,
          roleId: user.roleId
        };
        var token = _jsonwebtoken2.default.sign({
          id: user.id,
          roleId: user.roleId,
          expiresIn: '1hr'
        }, secret);
        return response.status(200).send({
          status: 200,
          userData: userData,
          message: 'Welcome ' + userData.name,
          token: token
        });
      }
      return response.status(400).json({
        status: 400,
        message: 'Could not sign you in. Kindly check your login details'
      });
    }).catch(function (error) {
      return response.status(500).send(error);
    });
  },
  logout: function logout(request, response) {
    response.setHeader['x-access-token'] = ' ';
    response.status(200).json({
      success: true,
      message: 'User logged out'
    });
  },
  create: function create(request, response) {
    User.findOne({
      where: {
        $or: [{
          username: request.body.username
        }, {
          email: request.body.email
        }]
      }
    }).then(function (foundUser) {
      if (foundUser) {
        return response.status(409).send({ message: 'User already exists' });
      }
      return User.create(request.body).then(function (user) {
        var userData = {
          id: user.id,
          name: user.firstname + ' ' + user.lastname,
          username: user.username,
          email: user.email,
          phone: user.phone,
          roleId: user.roleId
        };
        var token = _jsonwebtoken2.default.sign({
          id: user.id,
          roleId: user.roleId,
          expiresIn: '1hr'
        }, secret);
        return response.status(201).send({
          status: 201,
          userData: userData,
          message: 'Signup successful. Welcome ' + userData.name,
          token: token
        });
      }).catch(function (error) {
        response.status(403).send({
          error: error,
          message: 'User signup failed. Ensure valid  form data is entered.'
        });
      });
    }).catch(function (error) {
      return response.status(400).send(error);
    });
  },
  getAll: function getAll(request, response) {
    var offset = request.query.offset || 0;
    var limit = 12;

    User.findAndCountAll({
      limit: limit,
      offset: offset,
      include: [{
        model: Documents,
        as: 'documents'
      }],
      order: [['updatedAt', 'DESC']]
    }).then(function (users) {
      var metaData = {
        totalCount: users.count,
        pages: Math.ceil(users.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: users.rows.length
      } || null;
      return response.status(200).send({
        users: users.rows,
        metaData: metaData
      });
    }).catch(function (error) {
      return response.status(400).send(error);
    });
  },
  getOne: function getOne(request, response) {
    User.findById(request.params.id, {
      include: [{
        model: Documents,
        as: 'documents'
      }]
    }).then(function (user) {
      if (!user) {
        return response.status(404).send({
          message: 'User does not exist'
        });
      }
      return response.status(200).send(user);
    }).catch(function (error) {
      return response.status(400).send({
        error: error,
        message: 'Invalid userID'
      });
    });
  },
  update: function update(request, response) {
    User.findById(request.params.id, {}).then(function (user) {
      if (!user) {
        return response.status(404).send({
          message: 'User Not Found'
        });
      }
      return user.update(request.body).then(function () {
        return (
          // Send back the updated user data.
          response.status(200).send({
            user: user,
            message: 'Profile successfully updated'
          })
        );
      }).catch(function (error) {
        return response.status(400).send({
          error: error
        });
      });
    }).catch(function (error) {
      return response.status(400).send(error);
    });
  },
  delete: function _delete(request, response) {
    User.findById(request.params.id).then(function (user) {
      if (!user) {
        return response.status(404).send({
          message: 'User not found'
        });
      }
      return user.destroy().then(function () {
        return response.status(200).send({
          message: 'User deleted successfully.'
        });
      }).catch(function (error) {
        return response.status(400).send(error);
      });
    }).catch(function (error) {
      return response.status(400).send(error);
    });
  },
  search: function search(request, response) {
    var search = request.query.search;
    return User.findAll({
      where: {
        $or: [{
          username: {
            $iLike: '%' + search + '%'
          }
        }, {
          email: {
            $iLike: '%' + search + '%'
          }
        }]
      }
    }).then(function (users) {
      if (users.length <= 0) {
        return response.status(404).send({
          message: 'No users found matching your search criteria'
        });
      }
      return response.status(200).send({
        users: users,
        message: 'Users found'
      });
    }).catch(function (error) {
      response.status(500).send({
        error: error,
        message: 'Error occurred while retrieving Users'
      });
    });
  }
};

exports.default = UserController;