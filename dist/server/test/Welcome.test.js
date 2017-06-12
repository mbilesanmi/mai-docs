'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _appServer = require('../../tools/appServer');

var _appServer2 = _interopRequireDefault(_appServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

var app = _supertest2.default.agent(_appServer2.default);

describe('Mai Docs test for default server route', function () {
  it('it should return response 200', function (done) {
    app.get('/api').end(function (error, response) {
      (0, _expect2.default)(response.body.status).toBe(200);
      if (error) {
        done(error);
      }
    });
    done();
  });
  it('should return a Welcome to the Mai Docs API message', function (done) {
    app.get('/api').end(function (error, response) {
      (0, _expect2.default)(response.body.message).toEqual('Welcome to the Mai Docs API!');
      if (error) {
        done(error);
      }
    });
    done();
  });
  it('should return a json object', function (done) {
    app.get('/api').end(function (error, response) {
      (0, _expect2.default)(_typeof(response.body)).toBe('object');
      if (error) {
        done(error);
      }
    });
    done();
  });
});