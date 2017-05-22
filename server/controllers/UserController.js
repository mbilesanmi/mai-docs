import model from '../models';

const Users = model.User;
const Docs = model.Doc;

const UserController = {
  create(request, response) {
    return Users
      .create(request.body)
      .then((user) => {
        const token = 
        response.status(201).send(user);
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
  getMyDocs(request, response) {
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
      // .then((user) => {
      //   if (!user) {
      //     return response.status(404).send({
      //       message: 'User does not exist'
      //     });
      //   }
        // Docs
        //   .findAll({
        //     where: { ownerId: request.params.userId },
        //     include: [{
        //       model: User,
        //       as: 'users',
        //     }],
        //   })
        //   // .then((document) => {
        //   //   if (!document) {
        //   //     return response.status(404).send({
        //   //       message: 'This user doesnt have any documents'
        //   //     });
        //   //   }
        //   //   return response.status(200).send(document);
        //   // })
        //   .catch(error => response.status(400).send(error));
      // })
      // .catch(error => response.status(400).send(error));
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
