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
    console.log('message : reseting Database.......'.red);
    _models2.default.sequelize.sync({ force: true }).then(function () {
      console.log('message : Database reset succesful'.cyan);
      done();
    });
  });

  describe('POST /api/documents create new document route', function () {
    it('should return a status of 201 when successful', function (done) {
      app.post('/api/documents').send(_testHelper.newData.newDocument1).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(201);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a document created successfully message if successful', function (done) {
      app.post('/api/documents').send(_testHelper.newData.newDocument1).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Document created successful');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the created document', function (done) {
      app.post('/api/documents').send(_testHelper.newData.newDocument1).end(function (error, response) {
        (0, _expect2.default)(_typeof(response.body.document)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 400 if the title field is empty', function (done) {
      app.post('/api/documents').send(_testHelper.newData.emptyDocument).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(400);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Fields cannot be empty message if the title field is empty', function (done) {
      app.post('/api/documents').send(_testHelper.newData.emptyDocument).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Fields cannot be empty');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object if the title field is empty', function (done) {
      app.post('/api/documents').send(_testHelper.newData.emptyDocument).end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('PUT /api/documents/:id update document route', function () {
    it('should return a status of 400 if the title field is empty', function (done) {
      app.put('/api/documents/1').send(_testHelper.newData.emptyDocument).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(400);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Fields cannot be empty message if the title field is empty', function (done) {
      app.put('/api/documents/1').send(_testHelper.newData.emptyDocument).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Fields cannot be empty');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object if the title field is empty', function (done) {
      app.put('/api/documents/1').send(_testHelper.newData.emptyDocument).end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 404 if document doesnt exist', function (done) {
      app.put('/api/documents/872392').send(_testHelper.newData.newDocument1).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(404);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Document Not Found message if document doesnt exist', function (done) {
      app.put('/api/documents/872392').send(_testHelper.newData.newDocument1).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Document Not Found');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the created document', function (done) {
      app.put('/api/documents/872392').send(_testHelper.newData.newDocument1).end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 200 if document update is successful', function (done) {
      app.put('/api/documents/1').send(_testHelper.newData.document1).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Document successfully updated message if document updates successfully', function (done) {
      app.put('/api/documents/1').send(_testHelper.newData.document1).end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Document successfully updated');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the created document', function (done) {
      app.put('/api/documents/1').send(_testHelper.newData.document1).end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 500 if document update is not successful', function (done) {
      app.put('/api/documents/102323323asadasa').send(_testHelper.newData.newDocument1).end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(500);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object of the created document', function (done) {
      app.put('/api/documents/102323323asadasa').send(_testHelper.newData.newDocument1).end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toBe('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('GET /api/documents/ get all documents route', function () {
    it('should return a status of 200 if the documents are found', function (done) {
      app.get('/api/documents').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return json oebject of the response if the documents are found', function (done) {
      app.get('/api/documents').end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('GET /api/search/documents/ search users route ', function () {
    it('should return a status of 404 for the not found search result', function (done) {
      app.get('/api/search/documents/?search=maranathafakerfolder').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(404);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for the not found search result', function (done) {
      app.get('/api/search/documents/?search=maranathafakerfolder').end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a document not found message', function (done) {
      app.get('/api/search/documents/?search=maranathafakerfolder').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('No documents found matching search criteria');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 200 for the found search result', function (done) {
      app.get('/api/search/documents/?search=document').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should fetch a json object for the found documents search result', function (done) {
      app.get('/api/search/documents/?search=document').end(function (error, response) {
        (0, _expect2.default)(_typeof(response.status)).toEqual('number');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a documents found message', function (done) {
      app.get('/api/search/documents/?search=document').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Dcuments found');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });

  describe('DELETE /api/documents/:id delete document route', function () {
    it('should return a status of 400 if the document is not found', function (done) {
      app.delete('/api/documents/13232432').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(400);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Document not found message if the document is not found', function (done) {
      app.delete('/api/documents/13232432').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Document not found');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json response if the document is not found', function (done) {
      app.delete('/api/documents/13232432').end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 200 if the document deleted', function (done) {
      app.delete('/api/documents/2').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(200);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a Document deleted successfully message if the document deleted', function (done) {
      app.delete('/api/documents/2').end(function (error, response) {
        (0, _expect2.default)(response.body.message).toEqual('Document deleted successfully');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a json object if the document deleted', function (done) {
      app.delete('/api/documents/2').end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 400 if the document delete fails', function (done) {
      app.delete('/api/documents/2dsd1e112e3e23').end(function (error, response) {
        (0, _expect2.default)(response.status).toEqual(400);
        if (error) {
          done(error);
        }
      });
      done();
    });
    it('should return a status of 500 if the document delete fails', function (done) {
      app.delete('/api/documents/2dsd1e112e3e23').end(function (error, response) {
        (0, _expect2.default)(typeof response === 'undefined' ? 'undefined' : _typeof(response)).toEqual('object');
        if (error) {
          done(error);
        }
      });
      done();
    });
  });
});