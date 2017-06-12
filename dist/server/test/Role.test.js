'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _appServer = require('../../tools/appServer');

var _appServer2 = _interopRequireDefault(_appServer);

var _testHelper = require('./helper/testHelper');

var _seeders = require('./helper/seeders');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

var app = _supertest2.default.agent(_appServer2.default);

describe('Mai Docs Roles Endpoints ', function () {
  before(function (done) {
    console.log('message : reseting Database.......'.yellow);
    _models2.default.sequelize.sync({ force: true }).then(function () {
      _models2.default.Role.bulkCreate(_seeders.roles).then(function () {
        console.log('message : seeding roles done.......'.green);
        _models2.default.Role.bulkCreate(_seeders.users).then(function () {
          console.log('message : seeding users done.......'.green);
          _models2.default.Role.bulkCreate(_seeders.users).then(function () {
            console.log('message : seeding documents done.......'.green);
          }).catch(function () {});
        }).catch(function () {});
      }).catch(function () {});
    }).catch(function () {});
    done();
  });
  after(function (done) {
    console.log('message :  ', 'reseting Database.......');
    _models2.default.sequelize.sync({ force: true }).then(function () {
      console.log('message :  ', 'Database reset succesful');
      done();
    });
  });

  describe('POST /api/roles create new role route', function () {
    it('should return a status of 201 when successful', function (done) {
      app.post('/api/roles').send(_testHelper.newData.newRole).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(201);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Role created successfully message if successful', function (done) {
      app.post('/api/roles').send(_testHelper.newData.newRole).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Role created successfully');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the created role if successful', function (done) {
      app.get('/api/roles/').send(_testHelper.newData.newRole).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should have a json response if successful', function (done) {
      app.post('/api/roles').send(_testHelper.newData.newRole).end(function (error, response) {
        (0, _expect2.default)('Content-Type', /json/);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 400 when the fields are empty', function (done) {
      app.post('/api/roles').send(_testHelper.role.emptyRole).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(400);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Title field cannot be empty message when the fields are empty', function (done) {
      app.post('/api/roles').send(_testHelper.role.emptyRole).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Title field cannot be empty');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the error message when the fields are empty', function (done) {
      app.get('/api/roles/').send(_testHelper.role.emptyRole).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should have a json response when the fields are empty', function (done) {
      app.post('/api/roles').send(_testHelper.role.emptyRole).end(function (error, response) {
        (0, _expect2.default)('Content-Type', /json/);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 409 when the title isnt unique', function (done) {
      app.post('/api/roles').send(_testHelper.newData.newRole).end(function () {
        app.post('/api/roles').send(_testHelper.newData.newRole).end(function (error, response) {
          (0, _expect2.default)(response.status).toEqual(409);
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
    it('should return a Role must be unique message the title isnt unique', function (done) {
      app.post('/api/roles').send(_testHelper.newData.newRole).end(function () {
        app.post('/api/roles').send(_testHelper.newData.newRole).end(function (error, response) {
          (0, _expect2.default)(response.body.message).toEqual('Role must be unique');
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
    it('should return a json object of the error message if the title isnt unique', function (done) {
      app.post('/api/roles').send(_testHelper.newData.newRole).end(function () {
        app.post('/api/roles').send(_testHelper.newData.newRole).end(function (error, response) {
          (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toBe('object');
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
    it('should have a json response if the title isnt unique', function (done) {
      app.post('/api/roles').send(_testHelper.newData.newRole).end(function () {
        app.post('/api/roles').send(_testHelper.newData.newRole).end(function (error, response) {
          (0, _expect2.default)('Content-Type', /json/);
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
  });

  describe('GET /api/roles get all roles route', function () {
    it('should return a status of 200', function (done) {
      app.get('/api/roles/').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
        done();
      });
    });
    it('should fetch an array of user objects', function (done) {
      app.get('/api/roles/').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('GET /api/roles:id get selected role route', function () {
    it('should return a status of 200', function (done) {
      app.get('/api/roles/1').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for the selected role', function (done) {
      app.get('/api/roles/1').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for the invalid roleId', function (done) {
      app.get('/api/roles/190290jks').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
        done();
      });
    });
    it('should return an Invalid roleID message', function (done) {
      app.get('/api/roles/190290jks').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Invalid roleID');
        if (error) {
          done(error);
        }
        done();
      });
    });
    it('should return a status of 404 for a non-existent roleId', function (done) {
      app.get('/api/roles/123456789').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(404);
        if (error) {
          done(error);
        }
        done();
      });
    });
    it('should fetch a json object for for a non-existent roleId', function (done) {
      app.get('/api/roles/123456789').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
        done();
      });
    });
    it('should return a Role does not exist message', function (done) {
      app.get('/api/roles/123456789').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Role does not exist');
        if (error) {
          done(error);
        }
        done();
      });
    });
  });
});