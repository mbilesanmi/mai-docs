import path from 'path';

import RoleController from '../controllers/role';
import UserController from '../controllers/user';
import DocumentController from '../controllers/document';

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

  app.post('/api/users', UserController.create);
  app.get('/api/users', UserController.getAll);
  app.get('/api/users/:userId', UserController.getOne);
  app.put('/api/users/:userId', UserController.update);
  app.delete('/api/users/:userId', UserController.deleteUser);
  
  app.post('/api/documents', DocumentController.create);
  app.get('/api/documents', DocumentController.getAll);
  app.get('/api/documents/:documentId', DocumentController.getOne);
  app.put('/api/documents/:documentId', DocumentController.update);
  app.delete('/api/documents/:documentId', DocumentController.deleteDocument);
};

export default Routes;
