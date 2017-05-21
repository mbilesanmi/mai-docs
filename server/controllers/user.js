import model from '../models';

const Users = model.User;

const UserController = {
  create(request, response) {
    return Users
      .create(request.body)
      .then(user => response.status(201).send(user))
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
      .findById(request.params.userId, {})
      .then(user => {
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
      .then(user => {
        if (!user) {
          return response.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update(request.body)
          .then(() => response.status(200).send(user))  // Send back the updated todo.
          .catch((error) => response.status(400).send(error));
      })
      .catch((error) => response.status(400).send(error));
  },
  deleteUser(request, response) {
    return Users
      .findById(request.params.userId)
      .then(user => {
        if (!user) {
          return response.status(400).send({
            message: 'User not found',
          });
        }
        return user
          .destroy()
          .then(() => response.status(200).send({ message: 'User deleted successfully.' }))
          .catch(error => response.status(400).send(error));
      })
      .catch(error => response.status(400).send(error));
  },
};

export default UserController;
