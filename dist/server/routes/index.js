'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _RoleController = require('../controllers/RoleController');

var _RoleController2 = _interopRequireDefault(_RoleController);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _DocumentController = require('../controllers/DocumentController');

var _DocumentController2 = _interopRequireDefault(_DocumentController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = function Routes(app) {
  app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../client/index.html'));
  });

  app.get('/api', function (req, res) {
    return res.status(200).send({
      message: 'Welcome to the Mai Docs API!'
    });
  });

  // ROLES API ENDPOINT ROUTES
  app.post('/api/roles', _RoleController2.default.create);
  app.get('/api/roles', _RoleController2.default.getAll);
  app.get('/api/roles/:id', _RoleController2.default.getOne);

  // USERS API ENDPOINT ROUTES
  app.post('/api/users/login', _UserController2.default.login);
  app.post('/api/users', _UserController2.default.create);
  app.get('/api/users/', _UserController2.default.getAll);
  app.get('/api/users/:id', _UserController2.default.getOne);
  app.put('/api/users/:id', _UserController2.default.update);
  app.delete('/api/users/:id', _UserController2.default.delete);

  // DOCUMENTS API ENDPOINT ROUTES
  app.post('/api/documents', _DocumentController2.default.create);
  app.get('/api/documents/', _DocumentController2.default.getAll);
  app.get('/api/documents/:id', _DocumentController2.default.getOne);
  app.get('/api/documents/:id', _DocumentController2.default.getOne);
  app.put('/api/documents/:id', _DocumentController2.default.update);
  app.delete('/api/documents/:id', _DocumentController2.default.delete);
  app.get('/api/users/:id/documents', _DocumentController2.default.getUserDocuments);

  // SEARCH API ENDPOINT ROUTES
  app.get('/api/search/users/', _UserController2.default.search);
  app.get('/api/search/documents/', _DocumentController2.default.search);
};

exports.default = Routes;