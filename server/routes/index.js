import path from 'path';

import RoleController from '../controllers/role';

const Routes = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/roles', RoleController.create);
  app.get('/api/roles', RoleController.getAll);
  app.get('/api/roles/:roleId', RoleController.getOne);
  app.put('/api/roles/:roleId', RoleController.update);
  app.delete('/api/roles/:roleId', RoleController.deleteRole);
};

export default Routes;
