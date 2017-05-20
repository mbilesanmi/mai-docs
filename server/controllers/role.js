import Role from '../models/role';

const RoleController = {
  create(req, res) {
    return Role
      .create({
        title:req.body.title,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(eror));
  },
  list(req, res) {
    return Role
      .findAll({
        include: [{
          model: User,
          as: 'users',
        }],
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
};
