import path from 'path';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import DocumentController from '../controllers/DocumentController';

const Routes = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!'
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
    '/api/roles/:id', RoleController.delete
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
    '/api/users/:id', UserController.delete
  );

  app.post(
    '/api/documents', DocumentController.create
  );
  app.get(
    '/api/documents', DocumentController.getAll
  );
  app.get(
    '/api/documents/:id', DocumentController.getOne
  );
  app.get(
    '/api/documents/:id', DocumentController.getOne
  );
  app.put(
    '/api/documents/:id', DocumentController.update
  );
  app.delete(
    '/api/documents/:id', DocumentController.delete
  );
};

export default Routes;
