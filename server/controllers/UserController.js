import jwt from 'jsonwebtoken';
import model from '../models';

const Users = model.User;
const Docs = model.Doc;
const secret = 'secret';

const UserController = {
  login(request, response) {
    if (request.body.loginId === '' || request.body.password === '') {
      return response.status(400).json({
        status: 'Bad Request',
        message: 'Fields cannot be empty'
      });
    }
    return Users
      .findOne({
        where: {
          username: request.body.loginId
        }
      })
      .then((user) => {
        if (!user) {
          return response.status(404).send({
            status: 404,
            message: 'User does not exist'
          });
        } else if (user.password === request.body.password) {
          const token = jwt.sign({
            expiresIn: '1hr',
            user
          }, secret);
          response.status(200).send({
            status: 200,
            user,
            message: 'User logged in successfully',
            token
          });
        } else {
          response.status(401).json({
            status: 401,
            message: 'Could not sign you in. Kindly check your login details'
          });
        }
      })
      .catch(error => response.status(400).send(error));
  },
  logout(request, response) {
    response.setHeader['x-access-token'] = ' ';
    response.status(200)
      .json({
        success: true,
        message: 'User logged out',
      });
  },
  create(request, response) {
    return Users
      .findOne({
        where: {
          username: request.body.username
        }
      })
      .then((user) => {
        if (!user) {
          Users
            .create(request.body)
            .then((user) => {
              const token = jwt.sign({
                userData: {
                  id: user.id,
                  name: `${user.firstname} ${user.lastname}`,
                  username: user.username,
                  email: user.email,
                  roleId: user.roleId
                }
              }, secret, { expiresIn: '1h' });
              return response.status(201).send({
                user,
                message: 'User signup completed successfully',
                token
              });
            })
            .catch(error => response.status(400).send(error));
        } else {
          return response.status(409).send({
            status: 409,
            message: 'User already exists',
          });
        }
      })
      .catch(error => response.status(400).send(error));
  },
  getAll(request, response) {
    return Users
      .findAll({})
      .then(users => response.status(200).send(users))
      .catch(error => response.status(400).send(error));
  },
  getOne(request, response) {
    return Users
      .findById(request.params.userId, {
        include: [{
          model: Docs
        }]
      })
      .then((user) => {
        if (!user) {
          return response.status(404).send({
            message: 'User does not exist'
          });
        }
        return response.status(200).send(user);
      })
      .catch(error => response.status(400).send(error));
  },
  update(request, response) {
    return Users
      .findById(request.params.userId, {})
      .then((user) => {
        if (!user) {
          return response.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update(request.body)
          .then(() =>
            // Send back the updated user data.
            response.status(200).send(user))
          .catch(error => response.status(400).send(error));
      })
      .catch(error => response.status(400).send(error));
  },
  deleteUser(request, response) {
    return Users
      .findById(request.params.userId)
      .then((user) => {
        if (!user) {
          return response.status(400).send({
            message: 'User not found',
          });
        }
        return user
          .destroy()
          .then(() =>
            response.status(200).send({
              message: 'User deleted successfully.'
            }))
          .catch(error => response.status(400).send(error));
      })
      .catch(error => response.status(400).send(error));
  },
};

export default UserController;
