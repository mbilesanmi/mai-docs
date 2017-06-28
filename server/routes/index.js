import UserController from '../controllers/UserController';
import DocumentController from '../controllers/DocumentController';
import Authenticate from '../middleware/Authenticate';

const adminAccess = Authenticate.adminAccess;
const validateToken = Authenticate.validateToken;


const Routes = (app) => {
  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the api index page
   *     responses:
   *       200:
   *         description: Welcome to the Mai Docs API!
   */
  app.get('/api', (request, response) => response.status(200).send({
    message: 'Welcome to the Mai Docs API!'
  }));

  // API ENDPOINTS FOR USERS
  app.get('/api/users', validateToken, adminAccess, UserController.getAllUsers);
  app.post('/api/users', UserController.signup);
  app.post('/api/users/login', UserController.login);
  app.post('/api/users/logout', UserController.logout);
  app.get('/api/user/:id', validateToken, UserController.getOneUser);
  app.put('/api/user/:id', validateToken, UserController.updateUser);
  app.delete('/api/user/:id', validateToken, UserController.deleteUser);

  // API ENDPOINTS FOR DOCUMENTS
  app.get('/api/documents', validateToken, DocumentController.getAllDocuments);
  app.get('/api/document/:id', validateToken, DocumentController.getOneDocument);
  app.post('/api/documents', validateToken, DocumentController.createDocument);
  app.get('/api/users/:id/documents', validateToken, DocumentController.getUserDocuments);
  app.put('/api/document/:id', validateToken, DocumentController.updateDocument);
  app.delete('/api/document/:id', validateToken, DocumentController.deleteDocument);

  // API ENDPOINTS FOR SEARCH
  app.get('/api/search/users/', validateToken, adminAccess, UserController.searchAllUsers);
  app.get('/api/search/documents/', validateToken, DocumentController.searchAllDocuments);
  app.get('/api/search/userdocuments/', validateToken, DocumentController.searchUserDocuments);
};

export default Routes;
