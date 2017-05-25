import path from 'path';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import DocumentController from '../controllers/DocumentController';

const Routes = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post(
    '/api/role', RoleController.create
  );
  app.get(
    '/api/role', RoleController.getAll
  );
  app.get(
    '/api/role/:id', RoleController.getOne
  );
  app.put(
    '/api/role/:id', RoleController.update
  );
  app.delete(
    '/api/role/:id', RoleController.delete
  );

  app.post(
    '/api/user/login', UserController.login
  );
  app.post(
    '/api/user', UserController.create
  );
  app.get(
    '/api/user', UserController.getAll
  );
  app.get(
    '/api/user/:id', UserController.getOne
  );
  app.put(
    '/api/user/:id', UserController.update
  );
  app.delete(
    '/api/user/:id', UserController.delete
  );

  app.post(
    '/api/document', DocumentController.create
  );
  app.get(
    '/api/document', DocumentController.getAll
  );
  app.get(
    '/api/document/:id', DocumentController.getOne
  );
  app.put(
    '/api/document/:id', DocumentController.update
  );
  app.delete(
    '/api/document/:id', DocumentController.delete
  );
};

export default Routes;
