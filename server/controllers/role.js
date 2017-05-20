import model from '../models';

const Roles = model.Role;

const RoleController = {
  create(req, res) {
    return Roles
      .create({
        title:req.body.title,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(eror));
  },
  getAll(req, res) {
    return Roles
      .findAll({})
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
  },
  getOne(req, res) {
    return Roles
      .findById(req.params.roleId, {})
      .then(role => {
        if (!role) {
          return res.status(404).send({
            message: 'Role does not exist'
          });
        }
        return res.status(200).send(role);
      })
      .catch(error => res.status(400).send(error));
  },
};

export default RoleController;
