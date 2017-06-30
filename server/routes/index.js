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

  /**
   * @swagger
   * definition:
   *   Documents:
   *     properties:
   *       title:
   *         type: string
   *       content:
   *         type: string
   *       access:
   *         type: number
   */
  /**
   * @swagger
   * definition:
   *   Users:
   *     properties:
   *       firstname:
   *         type: string
   *       lastname:
   *         type: string
   *       username:
   *         type: string
   *       email:
   *         type: string
   *       password:
   *         type: string
   */

  // API ENDPOINTS FOR USERS
  /**
   * @swagger
   * /api/users:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: offset
   *         type: integer
   *         required: false
   *         default: 0
   *         minimum: 0
   *         description: The number of items to skip before starting to collect the result
   *       - in: query
   *         name: limit
   *         type: integer
   *         required: false
   *         default: 12
   *         description: The number of items to return
   *     responses:
   *       200:
   *         description: An array of users
   *         schema:
   *           $ref: '#/definitions/Users'
   *     security:
   *       - x-auth: []
   */
  app.get('/api/users', validateToken, adminAccess, UserController.getAllUsers);

  /**
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     description: Creates a new user profile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: firstname
   *         description: user's firstname
   *         in: body
   *         required: true
   *       - name: lastname
   *         description: user's lastname
   *         in: body
   *         required: true
   *       - name: username
   *         description: user's username
   *         in: body
   *         required: true
   *       - name: email
   *         description: user's email
   *         in: body
   *         required: true
   *       - name: password
   *         description: user's password
   *         in: body
   *         required: true
   *     responses:
   *       201:
   *         description: Successfully created
   *         schema:
   *           $ref: '#/definitions/Users'
   *       400:
   *         description: Form submission error
   *     security:
   *       - x-auth: []
   */
  app.post('/api/users', UserController.signup);

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     tags:
   *       - Users
   *     description: Sign a user into the app
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: loginId
   *         description: User object
   *         in: formData
   *         required: true
   *       - name: password
   *         description: User's password
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Successfully created
   *         schema:
   *           $ref: '#/definitions/Users'
   *       404:
   *         description: Invalid login details
   *       401:
   *         description: Validation Errors
   */
  app.post('/api/users/login', UserController.login);

  /**
   * @swagger
   * /api/users/logout:
   *   get:
   *     tags:
   *       - Users
   *     description: Logs a user out
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Logout Successful
   *     security:
   *       - x-auth: []
   */
  app.post('/api/users/logout', UserController.logout);

  /**
   * @swagger
   * /api/user/{id}:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns a single user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single user
   *         schema:
   *           $ref: '#/definitions/Users'
   *     security:
   *       - x-auth: []
   */
  app.get('/api/user/:id', validateToken, UserController.getOneUser);

  /**
   * @swagger
   * /api/user/{id}:
   *   put:
   *     tags:
   *       - Users
   *     description: Returns an updated user object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: firstname
   *         description: user's firstname
   *         in: body
   *         required: true
   *       - name: lastname
   *         description: user's lastname
   *         in: body
   *         required: true
   *       - name: password
   *         description: user's password
   *         in: body
   *         required: false
   *       - name: id
   *         description: user's ID
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: Profile updated
   *         schema:
   *           $ref: '#/definitions/Users'
   *       403:
   *         description: Unauthorized access
   *       404:
   *         description: User not found
   *       400:
   *         description: Exception error
   *     security:
   *       - x-auth: []
   */
  app.put('/api/user/:id', validateToken, UserController.updateUser);

  /**
   * @swagger
   * /api/user/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     description: Deletes a single user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   *       404:
   *         description: User cannot be found
   *     security:
   *     - x-auth: []
   */
  app.delete('/api/user/:id', validateToken, UserController.deleteUser);

  // API ENDPOINTS FOR DOCUMENTS
  /**
   * @swagger
   * /api/documents:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all documents
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: offset
   *         type: integer
   *         required: false
   *         default: 0
   *         minimum: 0
   *         description: The number of items to skip before starting to collect the result
   *       - in: query
   *         name: limit
   *         type: integer
   *         required: false
   *         default: 12
   *         description: The number of items to return
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *     security:
   *       - x-auth: []
   */
  app.get('/api/documents', validateToken, DocumentController.getAllDocuments);

  /**
   * @swagger
   * /api/document/{id}:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns a single document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single document
   *         schema:
   *           $ref: '#/definitions/Documents'
   *     security:
   *       - x-auth: []
   */
  app.get('/api/document/:id', validateToken, DocumentController.getOneDocument);

  /**
   * @swagger
   * /api/documents:
   *   post:
   *     tags:
   *       - Documents
   *     description: Creates a new document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: title
   *         description: document's title
   *         in: body
   *         required: true
   *       - name: access
   *         description: document's access
   *         in: body
   *         required: true
   *       - name: content
   *         description: document's content
   *         in: body
   *         required: true
   *     responses:
   *       201:
   *         description: Successfully created
   *         schema:
   *           $ref: '#/definitions/Users'
   *       400:
   *         description: Form submission error
   *     security:
   *       - x-auth: []
   */
  app.post('/api/documents', validateToken, DocumentController.createDocument);

  /**
   * @swagger
   * /api/users/{id}/documents:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all of the users Documents
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: offset
   *         type: integer
   *         required: false
   *         default: 0
   *         minimum: 0
   *         description: The number of items to skip before starting to collect the result
   *       - in: query
   *         name: limit
   *         type: integer
   *         required: false
   *         default: 12
   *         description: The number of items to return
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *     security:
   *       - x-auth: []
   */
  app.get('/api/users/:id/documents', validateToken, DocumentController.getUserDocuments);

  /**
   * @swagger
   * /api/document/{id}:
   *   put:
   *     tags:
   *       - Documents
   *     description: Returns an updated document object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: title
   *         description: document title
   *         in: body
   *         required: true
   *       - name: access
   *         description: document access
   *         in: body
   *         required: true
   *       - name: content
   *         description: document content
   *         in: body
   *         required: false
   *     responses:
   *       200:
   *         description: Document updated
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       403:
   *         description: Unauthorized access
   *       404:
   *         description: Document not found
   *       400:
   *         description: Exception error
   *     security:
   *       - x-auth: []
   */
  app.put('/api/document/:id', validateToken, DocumentController.updateDocument);

  /**
   * @swagger
   * /api/document/{id}:
   *   delete:
   *     tags:
   *       - Documents
   *     description: Deletes a single document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   *       404:
   *         description: Document cannot be found
   *     security:
   *     - x-auth: []
   */
  app.delete('/api/document/:id', validateToken, DocumentController.deleteDocument);

  // API ENDPOINTS FOR SEARCH
  /**
   * @swagger
   * /api/search/users/:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns an array of users
   *     summary: Search for Users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: query
   *         description: The user term to search for
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: List of users to return
   *       404:
   *         description: No users found
   *     security:
   *       - x-auth: []
   */
  app.get('/api/search/users/', validateToken, adminAccess, UserController.searchAllUsers);

  /**
   * @swagger
   * /api/search/documents/:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns an array of documents
   *     summary: Search for Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: query
   *         description: The term to search for
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: List of documents to return
   *       404:
   *         description: No document found
   *     security:
   *       - x-auth: []
   */
  app.get('/api/search/documents/', validateToken, DocumentController.searchAllDocuments);

  /**
   * @swagger
   * /api/search/userdocuments/:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns an array of documents
   *     summary: Search for Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: query
   *         description: The term to search for
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: List of documents to return
   *       404:
   *         description: No document found
   *     security:
   *       - x-auth: []
   */
  app.get('/api/search/userdocuments/', validateToken, DocumentController.searchUserDocuments);
};

export default Routes;
