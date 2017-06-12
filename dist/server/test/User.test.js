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

describe('Mai Docs Users Endpoints ', function () {
  before(function (done) {
    console.log('message : reseting Database.......'.yellow);
    _models2.default.sequelize.sync({ force: true }).then(function () {
      console.log('roles', _seeders.roles);
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

  describe('POST /api/users create/signup new user route', function () {
    it('should return a status of 201 when successful', function (done) {
      app.post('/api/users').send(_testHelper.newData.newUser).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(201);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Signup successful message if successful', function (done) {
      app.post('/api/users').send(_testHelper.newData.newUser).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Signup successful. Welcome ' + _testHelper.newData.newUser.name);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the created user if successful', function (done) {
      app.get('/api/users/').send(_testHelper.newData.newUser).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should have a json response if successful', function (done) {
      app.post('/api/users').send(_testHelper.newData.newUser).end(function (error, response) {
        (0, _expect2.default)('Content-Type', /json/);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 400 if any field is empty', function (done) {
      app.post('/api/users').send(_testHelper.newData.emptyUser).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(400);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the error when the fields are empty', function (done) {
      app.post('/api/users/').send(_testHelper.newData.emptyUser).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 409 when the username/email isnt unique', function (done) {
      app.post('/api/users').send(_testHelper.newData.newUser).end(function () {
        app.post('/api/users').send(_testHelper.newData.newUser).end(function (error, response) {
          (0, _expect2.default)(response.status).toEqual(409);
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
    it('should return a User already exists message if the username/email isnt unique', function (done) {
      app.post('/api/users').send(_testHelper.newData.newUser).end(function () {
        app.post('/api/users').send(_testHelper.newData.newUser).end(function (error, response) {
          (0, _expect2.default)(response.body.message).toEqual('User already exists');
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
    it('should return a json object of the error message if the username/email isnt unique', function (done) {
      app.post('/api/users').send(_testHelper.newData.newUser).end(function () {
        app.post('/api/users').send(_testHelper.newData.newUser).end(function (error, response) {
          (0, _expect2.default)(_typeof(response.body)).toBe('object');
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
    it('should have a json response if the username/email isnt unique', function (done) {
      app.post('/api/users').send(_testHelper.newData.newUser).end(function () {
        app.post('/api/users').send(_testHelper.newData.newUser).end(function (error, response) {
          (0, _expect2.default)('Content-Type', /json/);
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
    it('should generate a token if successful', function (done) {
      app.post('/api/users').send(_testHelper.newData.newUser).end(function () {
        app.post('/api/users').send(_testHelper.newData.newUser).end(function (error, response) {
          (0, _expect2.default)(response.body.token).toExist();
          if (error) {
            done(error);
          }
        });
      });
      done();
    });
  });

  describe('/api/users get all users route ', function () {
    it('should return a status of 200', function (done) {
      app.get('/api/users/').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch an array of user objects', function (done) {
      app.get('/api/users/').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('POST /api/users/login login route', function () {
    it('should return a status of 400 if any field is empty', function (done) {
      app.post('/api/users/login').send(_testHelper.newData.emptyUser).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(400);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the error when the fields are empty', function (done) {
      app.post('/api/users/login').send(_testHelper.newData.emptyUser).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Fields cannot be empty message when the fields are empty', function (done) {
      app.post('/api/users/login').send(_testHelper.newData.emptyUser).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toBe('Fields cannot be empty');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 404 if user doesnt exist', function (done) {
      app.post('/api/users/login').send(_testHelper.newData.fakeUser).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(404);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the error when the user doesnt exist', function (done) {
      app.post('/api/users/login').send(_testHelper.newData.fakeUser).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Fields cannot be empty message when the user doesnt exist', function (done) {
      app.post('/api/users/login').send(_testHelper.newData.fakeUser).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toBe('Invalid login details');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should generate a token if successful', function (done) {
      app.post('/api/users/login').send(_testHelper.newData.adminUser1).end(function (error, response) {
        (0, _expect2.default)(response.body.token).toExist();
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 200 when successful', function (done) {
      app.post('/api/users/login').send(_testHelper.newData.adminUser1).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('GET /api/users/:id get a users route ', function () {
    it('should return a json object for the selected user', function (done) {
      app.get('/api/users/1').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 400 for an invalid userId', function (done) {
      app.get('/api/users/190290jks').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(400);
        if (error) {
          done(error);
        }
        done();
      });
    });
    it('should fetch a json object for the invalid userId', function (done) {
      app.get('/api/users/190290jks').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
        done();
      });
    });
    it('should return an Invalid userID message', function (done) {
      app.get('/api/users/190290jks').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Invalid userID');
        if (error) {
          done(error);
        }
        done();
      });
    });
    it('should return a status of 404 for a non-existent userId', function (done) {
      app.get('/api/users/123456789').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(404);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for for a non-existent userId', function (done) {
      app.get('/api/users/123456789').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a user does not exist message', function (done) {
      app.get('/api/users/123456789').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('User does not exist');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('PUT /api/users/:id update a user route ', function () {
    it('should return a status of 404 for a non-existent userId', function (done) {
      app.put('/api/users/123456789').send(_testHelper.newData.fakeUser).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(404);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for a non-existent userId', function (done) {
      app.put('/api/users/123456789').send(_testHelper.newData.fakeUser).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    // it('should return a user not found message', (done) => {
    //   app
    //     .put('/api/users/123456789')
    //     .send(newData.fakeUser)
    //     .end((error, response) => {
    //       expect(response.body.message).toEqual('User Not Found');
    //       if (error) { done(error); }
    //     });
    //   done();
    // });
    it('should return a status of 200 if the update is successful', function (done) {
      app.put('/api/users/1').send(_testHelper.newData.adminUser1).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for a successful update', function (done) {
      app.put('/api/users/1').send(_testHelper.newData.adminUser1).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Profile successfully updated message on success', function (done) {
      app.put('/api/users/1').send(_testHelper.newData.adminUser1).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Profile successfully updated');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('GET /api/search/users/ search users route ', function () {
    it('should return a status of 404 for the not found search result', function (done) {
      app.get('/api/search/users/?search=maranathafaker').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(404);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for the not found search result', function (done) {
      app.get('/api/search/users/?search=maranathafaker').end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a user not found message', function (done) {
      app.get('/api/search/users/?search=maranathafaker').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('No users found matching your search criteria');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for the found users search result', function (done) {
      app.get('/api/search/users/?search=admin').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.status)).toEqual('number');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a users found message', function (done) {
      app.get('/api/search/users/?search=admin').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('No users found matching your search criteria');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('DELETE /api/users/:id delete a user route ', function () {
    it('should return a status of 404 for a non-existent userId', function (done) {
      app.delete('/api/users/123456789').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(404);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for a non-existent userId', function (done) {
      app.delete('/api/users/123456789').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a user not found message', function (done) {
      app.delete('/api/users/123456789').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('User not found');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for a successful delete', function (done) {
      app.delete('/api/users/1').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Profile successfully deleted message on success', function (done) {
      app.delete('/api/users/1').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('User not found');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });
});