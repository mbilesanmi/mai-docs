import model from '../models';

const Role = model.Role;

const RoleController = {
  create(request, response) {
    return Role.create({
      title: request.body.title
    })
    .then(role => response.status(201).send({
      role,
      message: 'Role created successfully'
    }))
    .catch(error => response.status(400).send({
      error: error.errors || error.message
    }));
  },
  getAllRoles(request, response) {
    return Role.all()
      .then(roles => response.status(200).send(roles))
      .catch(error => response.status(400).send({
        error: error.errors || error.message
      }));
  },
  getOneRole(request, response) {
    return Role.findById(request.params.id)
      .then(role => {
        if (!role) {
          return response.status(404).send({
            // If the roleId does not exist
            message: 'Role Not Found'
          });
        }
        return response.status(200).send(role);
      })
      .catch(error => response.status(400).send({
        // If the roleId is invalid
        error: error.errors || error.message
      }));
  },
  updateRole(request, response) {
    return Role.findById(request.params.id).then(role => {
      if (!role) {
        return response.status(404).send({
          // If the roleId does not exist
          message: 'Role Not Found'
        });
      }
      return role.update({
        title: request.body.title || role.title
      })
      .then(() => {
        response.status(200).send(role);
      })
      .catch(error => response.status(400).send({
        // If the role is but but the required field isn't unique
        error: error.errors || error.message
      }));
    })
    .catch(error => response.status(400).send({
      // If the roleId is invalid
      error: error.errors || error.message,
      message: 'Invalid roleID entered.'
    }));
  },
  deleteRole(request, response) {
    return Role.findById(request.params.id).then(role => {
      if (!role) {
        return response.status(404).send({
          // If the roleId does not exist
          message: 'Role Not Found'
        });
      }
      return role.destroy()
      .then(() => response.status(204).send({
        // SUCCESS
        message: 'Role successfully deleted'
      }))
      .catch(error => response.status(400).send({
        // If the role exists but but the required field isn't unique
        error: error.errors || error.message
      }));
    })
    .catch(error => response.status(400).send({
      // If the roleId is invalid
      error: error.errors || error.message,
      message: 'Invalid roleID entered.'
    }));
  }
};

export default RoleController;
