import path from 'path';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import DocController from '../controllers/DocController';

const Routes = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post(
    '/api/roles', RoleController.create
  );
  app.get(
    '/api/roles', RoleController.getAll
  );
  app.get(
    '/api/roles/:id', RoleController.getOne
  );
  app.put(
    '/api/roles/:id', RoleController.update
  );
  app.delete(
    '/api/roles/:id', RoleController.deleteRole
  );

  app.post(
    '/api/users/login', UserController.login
  );
  app.post(
    '/api/users', UserController.create
  );
  app.get(
    '/api/users', UserController.getAll
  );
  app.get(
    '/api/users/:id', UserController.getOne
  );
  app.put(
    '/api/users/:id', UserController.update
  );
  app.delete(
    '/api/users/:id', UserController.deleteUser
  );

  app.post(
    '/api/docs', DocController.create
  );
  app.get(
    '/api/docs', DocController.getAll
  );
  app.get(
    '/api/docs/:id', DocController.getOne
  );
  app.put(
    '/api/docs/:id', DocController.update
  );
  app.delete(
    '/api/docs/:id', DocController.deleteDoc
  );
};

export default Routes;
