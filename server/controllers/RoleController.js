import model from '../models';

const Role = model.Role;

const RoleController = {
  create(request, response) {
    if (request.body.title === '') {
      return response.status(400).send({
        message: 'Title field cannot be empty'
      });
    }
    return Role
      .findOne({
        where: { title: request.body.title }
      })
      .then((foundRole) => {
        if (!foundRole) {
          Role
            .create({
              title: request.body.title
            })
            .then(role => response.status(201).send({
              role,
              message: 'Role created successfully'
            }))
            .catch(error => response.status(400).send({
              error,
              message: 'Error creating new role'
            }));
        }
      })
      .catch(error => response.status(409).send({
        error,
        message: 'Role must be unique'
      }));
  },
  getAll(request, response) {
    Role
      .findAll({})
      .then(role => response.status(200).send(role))
      .catch(error => response.status(400).send(error));
  },
  getOne(request, response) {
    Role
      .findById(request.params.id, {})
      .then((role) => {
        if (!role) {
          return response.status(404).send({
            message: 'Role does not exist'
          });
        }
        return response.status(200).send(role);
      })
      .catch(error => response.status(400).send({
        error,
        message: 'Invalid roleID'
      }));
  }
};

export default RoleController;
