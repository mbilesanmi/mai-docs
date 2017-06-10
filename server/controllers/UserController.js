import jwt from 'jsonwebtoken';
import model from '../models';

const User = model.User;
const Documents = model.Document;
const secret = 'secret';


const UserController = {
  login(request, response) {
    if (request.body.loginId === '' || request.body.password === '') {
      return response.status(400).json({
        status: 'Bad Request',
        message: 'Fields cannot be empty'
      });
    }
    User
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
            id: user.id,
            name: `${user.firstname} ${user.lastname}`,
            username: user.username,
            email: user.email,
            phone: user.phone,
            roleId: user.roleId
          };
          const token = jwt.sign({
            id: user.id,
            roleId: user.roleId,
            expiresIn: '1hr'
          }, secret);
          response.status(200).send({
            status: 200,
            userData,
            message: `Welcome ${userData.name}`,
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
        message: 'User logged out'
      });
  },
  create(request, response) {
    User
      .findOne({
        where: {
          $or: [{
            username: request.body.username
          }, {
            email: request.body.email
          }]
        }
      })
      .then((foundUser) => {
        if (foundUser) {
          return response.status(409).send({ message: 'User already exists' });
        }
        return User
          .create(request.body)
            .then((user) => {
              const userData = {
                id: user.id,
                name: `${user.firstname} ${user.lastname}`,
                username: user.username,
                email: user.email,
                phone: user.phone,
                roleId: user.roleId
              };
              const token = jwt.sign({
                id: user.id,
                roleId: user.roleId,
                expiresIn: '1hr'
              }, secret);
              return response.status(201).send({
                status: 200,
                userData,
                message: `Signup successful. Welcome ${userData.name}`,
                token
              });
            })
            .catch((error) => {
              response.status(403).send({
                error,
                message: 'User signup failed'
              });
            });
      })
      .catch(error => response.status(400).send(error));
  },
  getAll(request, response) {
    User
      .findAll({
        include: [{
          model: Documents,
          as: 'documents'
        }]
      })
      .then(users => response.status(200).send(users))
      .catch(error => response.status(400).send(error));
  },
  getOne(request, response) {
    User
      .findById(request.params.id, {
        include: [{
          model: Documents,
          as: 'documents'
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
    User
      .findById(request.params.id, {})
      .then((user) => {
        if (!user) {
          return response.status(404).send({
            message: 'User Not Found'
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
  delete(request, response) {
    User
      .findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(400).send({
            message: 'User not found'
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
  search(request, response) {
    const search = request.query.search;
    return User
      .findAll({
        where: {
          $or: [{
            username: {
              $iLike: `%${search}%`
            }
          }, {
            email: {
              $iLike: `%${search}%`
            }
          }]
        }
      })
      .then((users) => {
        if (users.length <= 0) {
          return response.status(404)
          .send({
            message: 'No users found matching your search criteria'
          });
        }
        return response.status(200).send({
          users,
          message: 'Users found'
        });
      })
      .catch((error) => {
        response.status(500).send({
          error,
          message: 'Error occurred while retrieving Users'
        });
      });
  }

};

export default UserController;
