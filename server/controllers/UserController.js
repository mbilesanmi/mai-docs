import jwt from 'jsonwebtoken';
import model from '../models';

const Users = model.Users;
const Documents = model.Documents;
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
          $or: [{
            username: request.body.loginId
          }, {
            email: request.body.loginId
          }]
        }
      })
      .then((user) => {
        if (!user) {
          return response.status(404).send({
            status: 404,
            message: 'User does not exist'
          });
        } else if (user.validPassword(request.body.password)) {
          const userData = {
            Id: user.id,
            name: `${user.firstname} ${user.lastname}`,
            username: user.username,
            email: user.email,
            phone: user.phone,
            roleId: user.roleId
          };
          const token = jwt.sign({
            Id: user.id,
            roleId: user.roleId,
            expiresIn: '1hr'
          }, secret);
          response.status(200).send({
            status: 200,
            userData,
            message: 'User logged in successfully',
            token
          });
        } else {
          response.status(400).json({
            status: 400,
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
    Users.findAll({
      where: {
        username: request.body.username
      }
    })
    .then((user) => {
      if (user) {
        return response.status(409).send({ message: 'User already exist' });
      }
      Users.create(request.body)
        .then((newUser) => {
          const token = jwt.sign({
            userData: {
              id: newUser.id,
              name: `${newUser.firstname} ${newUser.lastname}`,
              username: newUser.username,
              email: newUser.email,
              roleId: newUser.roleId
            }
          }, secret, { expiresIn: '1h' });
          return response.status(201).send({
            newUser,
            message: 'User signup completed successfully',
            token
          });
        })
        .catch(error => response.status(400).send(error));
    })
    .catch(error => response.status(400).send(error));
  },
  getAll(request, response) {
    return Users
      .findAll()
      .then(users => response.status(200).send(users))
      .catch(error => response.status(400).send(error));
  },
  getOne(request, response) {
    return Users
      .findById(request.params.id, {
        include: [{
          model: Documents
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
      .findById(request.params.id, {})
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
      .findById(request.params.id)
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
