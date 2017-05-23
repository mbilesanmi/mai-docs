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
    '/api/roles/:roleId', RoleController.getOne
  );
  app.put(
    '/api/roles/:roleId', RoleController.update
  );
  app.delete(
    '/api/roles/:roleId', RoleController.deleteRole
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
    '/api/users/:userId', UserController.getOne
  );
  // app.get(
  //   '/api/users/:userId/docs', UserController.getMyDocs
  // );
  app.put(
    '/api/users/:userId', UserController.update
  );
  app.delete(
    '/api/users/:userId', UserController.deleteUser
  );

  app.post(
    '/api/docs', DocController.create
  );
  app.get(
    '/api/docs', DocController.getAll
  );
  app.get(
    '/api/docs/:docId', DocController.getOne
  );
  app.put(
    '/api/docs/:docId', DocController.update
  );
  app.delete(
    '/api/docs/:docId', DocController.deleteDoc
  );
};

export default Routes;
