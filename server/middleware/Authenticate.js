import jwt from 'jsonwebtoken';

const secret = 'secret';

const Authenticate = {
  validateToken(request, response, next) {
    const token = request.headers.authorization ||
      request.body.token || request.headers['x-access-token'];

    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          response.status(400).send({
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

export default Authenticate;
