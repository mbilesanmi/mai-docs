import jwt from 'jsonwebtoken';
import model from '../models';

require('dotenv').config();

const User = model.User;
const Role = model.Role;
const secret = process.env.JWT_SECRET || 'secret';

const UserController = {
  signup(request, response) {
    return User.create(request.body)
    .then(user => {
      const token = jwt.sign({
        id: user.id,
        roleId: user.roleId,
        expiresIn: '1hr'
      }, secret);
      return response.status(201).send({
        token,
        message: `Signup successful. Welcome ${user.username}`
      });
    })
    .catch(error => response.status(400).send({
      message: error.errors[0].message || error.message
    }));
  },
  login(request, response) {
    const loginId = request.body.loginId;
    const password = request.body.password;
    if (loginId && password) {
      return User.findOne({
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
            message: 'Invalid login details'
          });
        } else if (user && user.validPassword(password)) {
          const token = jwt.sign({
            id: user.id,
            roleId: user.roleId,
            expiresIn: '1hr'
          }, secret);
          return response.status(200).send({
            token,
            message: 'Successfully logged in.'
          });
        }
        return response.status(401).json({
          message: 'Login failed. Verify your login info'
        });
      })
      .catch(() => response.status(401).send({
        message: 'Login failed. Verify your login detail'
      }));
    }
    return response.status(400).send({
      message: 'Fields cannot be empty'
    });
  },
  logout(request, response) {
    response.setHeader['x-access-token'] = '';
    response.status(200).send({
      success: true,
      message: 'You are now logged out.'
    });
  },
  getAllUsers(request, response) {
    const limit = request.query.limit ? request.query.limit : 20;
    const offset = request.query.offset ? request.query.offset : 0;

    return User
      .findAndCountAll({
        limit,
        offset,
        order: [['username', 'ASC']],
        include: {
          model: Role,
          attributes: ['title']
        }
      })
      .then((users) => {
        if (users.count <= 0) {
          return response.status(404).send({
            users: null,
            message: 'No users found'
          });
        }
        const metaData = {
          totalCount: users.count,
          pages: Math.ceil(users.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: users.rows.length
        };
        return response.status(200).send({
          users: users.rows,
          metaData
        });
      })
      .catch(error => response.status(400).send({
        message: error.errors || error.message
      }));
  },
  getOneUser(request, response) {
    const attributes = ['id', 'firstname', 'lastname', 'username', 'email', 'roleId'];
    return User.findById(request.params.id, {
      attributes,
      include: [{
        model: model.Role,
        attributes: ['title']
      }]
    })
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          // If the roleId does not exist
          message: 'User Not Found'
        });
      }
      return response.status(200).send(user);
    })
    .catch(error => response.status(400).send({
      // If the roleId is invalid
      message: error.errors || error.message
    }));
  },
  updateUser(request, response) {
    const userID = request.decoded.id;
    const userId = parseInt(request.params.id, 10);

    return User
      .findById(userId)
        .then((user) => {
          if (!user) {
            return response.status(404).send({
              message: 'User not found'
            });
          } else if (user && (userId !== userID)) {
            return response.status(403).send({
              message: 'Unauthorized access'
            });
          }
          return user
            .update(request.body, {
              where: { id: userID }
            })
            .then(() => {
              response.status(200).send({
                message: 'Profile successfully updated'
              });
            });
        })
        .catch(error => response.status(400).send({
          // If the role is but but the required field isn't unique
          message: error.errors || error.message
        }));
  },
  searchAllUsers(request, response) {
    const offset = request.query.offset ? request.query.offset : 0;
    const limit = request.query.limit ? request.query.limit : 20;
    const search = request.query.search;

    if (search) {
      User.findAndCountAll({
        limit,
        offset,
        where: {
          username: { $iLike: `%${search}%` }
        },
        order: [['username', 'ASC']]
      })
      .then((users) => {
        if (users.count <= 0) {
          return response.status(404).send({
            users: null,
            message: 'No users found matching your search criteria'
          });
        }
        const metaData = {
          totalCount: users.count,
          pages: Math.ceil(users.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: users.rows.length
        };
        return response.status(200).send({
          users: users.rows,
          metaData,
          message: `Found ${metaData.totalCount} users matching your search`,
        });
      });
    }
  },
  deleteUser(request, response) {
    const userID = request.decoded.id;
    const roleID = request.decoded.roleId;
    const userId = parseInt(request.params.id, 10);

    return User
      .findById(userId)
        .then((user) => {
          if (!user) {
            return response.status(404).send({
              message: 'User not found'
            });
          } else if (user.roleId === 1) {
            return response.status(400).send({
              message: 'You cannot delete an Admin'
            });
          } else if (userId !== userID) {
            return response.status(403).send({
              message: 'Unauthorized access'
            });
          }
          return user.destroy({
            where: {
              id: userID,
              roleId: { $ne: 1 }
            }
          })
          .then((done) => response.status(200).send({
            message: 'User profile deleted successfully'
          }));
        })
        .catch(error => response.status(400).send({
          // If the roleId is invalid
          message: error.errors || error.message
        }));
  }
};

export default UserController;
