'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = 'secret';

var Authenticate = {
  validateToken: function validateToken(request, response, next) {
    var token = request.headers.authorization || request.body.token || request.headers['x-access-token'];

    if (token) {
      _jsonwebtoken2.default.verify(token, secret, function (error, decoded) {
        if (error) {
          response.status(401).send({
            status: 'Invalid token',
            message: 'Token authentication failed.'
          });
        }
        request.decoded = decoded;
        next();
      });
    }
    return response.status(400).send({
      status: 400,
      message: 'Token required to access this route'
    });
  }
};

exports.default = Authenticate;