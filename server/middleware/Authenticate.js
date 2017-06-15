import jwt from 'jsonwebtoken';
import model from '../models';

const secret = 'secret';

const Authenticate = {
  validateToken(request, response, next) {
    const token = request.headers.authorization
    || request.body.token || request.headers['x-access-token'];

    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          response.status(401).send({
            status: 'Invalid token',
            message: 'Token authentication failed.'
          });
        } else if (decoded) {
          request.decoded = decoded;
          next();
        }
      });
    } else {
      return response.status(400).send({
        status: 400,
        message: 'Token required to access this route'
      });
    }
  },

  adminAccess(request, response, next) {
    model.Roles.findById(request.decoded.data.roleId)
      .then((foundRole) => {
        if (foundRole.id === 1) {
          next();
        }
        return response.status(403)
          .send({ message: 'Access denied.' });
      })
      .catch(error => response.status(400).send({
        error,
        message: 'Error authenticating'
      }));
  }
};

export default Authenticate;
