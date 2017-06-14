import path from 'path';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import DocumentController from '../controllers/DocumentController';

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
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Mai Docs API!'
  }));

  // ROLES API ENDPOINT ROUTES
  /**
   * @swagger
   * definition:
   *   Roles:
   *     properties:
   *       title:
   *         type: string
   */
  /**
   * @swagger
   * definition:
   *   Documents:
   *     properties:
   *       title:
   *         type: string
   *       content:
   *         type: string
   *       viewAccess:
   *         type: enum
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
   */
  /**
   * @swagger
   * /api/roles:
   *   get:
   *     tags:
   *       - Roles
   *     description: Returns all roles
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of roles
   *         schema:
   *           $ref: '#/definitions/Roles'
   */
  app.get(
    '/api/roles', RoleController.getAll
  );
  /**
   * @swagger
   * /api/roles/{id}:
   *   get:
   *     tags:
   *       - Roles
   *     description: Returns a single role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Role's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single role
   *         schema:
   *           $ref: '#/definitions/Roles'
   */
  app.get(
    '/api/roles/:id', RoleController.getOne
  );
  /**
   * @swagger
   * /api/roles:
   *   post:
   *     tags:
   *       - Roles
   *     description: Creates a new role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: role
   *         description: Role object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Roles'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post(
    '/api/roles', RoleController.create
  );

  // USERS API ENDPOINT ROUTES
  /**
   * @swagger
   * /api/users:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of users
   *         schema:
   *           $ref: '#/definitions/Users'
   */
  app.get(
    '/api/users/', UserController.getAll
  );
  /**
   * @swagger
   * /api/users/{id}:
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
   */
  app.get(
    '/api/users/:id', UserController.getOne
  );
  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     tags:
   *       - Users
   *     description: Sign a user into the app
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post(
    '/api/users/login', UserController.login
  );
  /**
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     description: Creates a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post(
    '/api/users', UserController.create
  );
  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     tags: Users
   *     description: Updates a single user
   *     produces: application/json
   *     parameters:
   *       name: user
   *       in: body
   *       description: Fields for the User resource
   *       schema:
   *         type: array
   *         $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: Successfully updated
   */
  app.put(
    '/api/users/:id', UserController.update
  );
  /**
   * @swagger
   * /api/users/{id}:
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
   */
  app.delete(
    '/api/users/:id', UserController.delete
  );

  // DOCUMENTS API ENDPOINT ROUTES
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
   *       - name: document
   *         description: Document object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Documents'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post(
    '/api/documents', DocumentController.create
  );
  /**
   * @swagger
   * /api/documents:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  app.get(
    '/api/documents/', DocumentController.getAll
  );
  /**
   * @swagger
   * /api/documents/{id}:
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
   */
  app.get(
    '/api/documents/:id', DocumentController.getOne
  );
  /**
   * @swagger
   * /api/documents/{id}:
   *   put:
   *     tags: Documents
   *     description: Updates a single document
   *     produces: application/json
   *     parameters:
   *       name: document
   *       in: body
   *       description: Fields for the Document resource
   *       schema:
   *         type: array
   *         $ref: '#/definitions/Documents'
   *     responses:
   *       200:
   *         description: Successfully updated
   */
  app.put(
    '/api/documents/:id', DocumentController.update
  );
  /**
   * @swagger
   * /api/documents/{id}:
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
   */
  
  app.delete(
    '/api/documents/:id', DocumentController.delete
  );
  /**
   * @swagger
   * /api/users/{id}/documents:
   *   get:
   *     tags:
   *       - Users Documents
   *     description: Returns all of the users Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  
  app.get(
    '/api/users/:id/documents', DocumentController.getUserDocuments
  );

  // SEARCH API ENDPOINT ROUTES
  /**
   * @swagger
   * /api/search/users:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users based on the search criteria
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of users
   *         schema:
   *           $ref: '#/definitions/Users'
   */
  app.get(
    '/api/search/users/', UserController.search
  );
  /**
   * @swagger
   * /api/search/documents:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all documents based on the search criteria
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  app.get(
    '/api/search/documents/', DocumentController.search
  );
};

export default Routes;
