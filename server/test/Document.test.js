import supertest from 'supertest';
import expect from 'expect';
import server from '../../index.js';
import models from '../models';
import seeds from './helper/seeders';
import { document, newData, user } from './helper/testHelper';

require('dotenv').config();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const app = supertest.agent(server);
let adminToken;
let authorToken1;
let authorToken2;
let signinUser;
const privateDoc = document.document1;
const publicDoc = document.document2;
const roleDoc = document.newDocument1;
let privateDocId;
let publicDocId;
let roleDocId;

describe('Mai Docs Documents Endpoints ', () => {
  before((done) => {
    seeds()
    .then(() => {
      console.log('seeding done for documents tests'.green);
      done();
    });
  });

  // after((done) => {
  //   models.sequelize.sync({ force: true })
  //   .then(() => {
  //     done();
  //   });
  // });

  // describe('Get all documents endpoint', () => {
    // it('should return an error if the user doesnt have any documents', (done) => {
    //   app
    //     .get('/api/users/3/documents')
    //     .end((error, response) => {
    //       expect(response.status).toEqual(404);
    //       expect(response.body.message).toEqual('No documents found');
    //     });
    //   done();
    // });
    // 
  // });

  describe('Documents endpoints as Admin', () => {

    before((done) => {
      app
        .post('/api/users/login')
        .send({ loginId: user.adminUser1.username, password: 'password' })
        .end((error, response) => {
          expect(response.status).toEqual(200);
          adminToken = response.body;
          done();
        });
    });

    it('should return an error if the userId is invalid', (done) => {
      app
        .get('/api/users/dasdas/documents')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          expect(response.body.message).toEqual('Invalid userID entered');
        });
      done();
    });

    it('should return an error if the token is invalid', (done) => {
      app
        .get('/api/users/1/documents')
        .set('x-access-token', '')
        .end((error, response) => {
          expect(response.status).toEqual(400);
        });
      done();
    });

    it('should return an error if the userId doesnt exist', (done) => {
      app
        .get('/api/users/3276434/documents')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          expect(response.body.message).toEqual('User not found');
        });
      done();
    });

    it('should return an error if the documentId is invalid', (done) => {
      app
        .get('/api/document/7hjgjh')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          expect(response.body.message).toEqual('Invalid document ID');
        });
      done();
    });

    it('should return an error if the document doesnt exist', (done) => {
      app
        .get('/api/document/1213234')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          expect(response.body.message).toEqual('Document ID not found');
        });
      done();
    });

    it('should return an error if the token is invalid', (done) => {
      app
        .get('/api/document/1')
        .set('x-access-token', '')
        .end((error, response) => {
          expect(response.status).toEqual(400);
        });
      done();
    });

    it('should return the document if successful', (done) => {
      app
        .get('/api/document/1')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
        });
      done();
    });

    it('should return errors if no token is set', (done) => {
      app
        .get('/api/documents')
        .set('x-access-token', '')
        .end((error, response) => {
          expect(response.status).toEqual(400);
          done();
        });
    });

    it('should not create a new document without logging in', (done) => {
      app
        .post('/api/documents')
        .set('x-access-token', '')
        .send(privateDoc)
        .end((error, response) => {
          expect(response.status).toEqual(400);
        });
      done();
    });

    it('should create new document', (done) => {
      app
        .post('/api/documents')
        .set('x-access-token', adminToken.token)
        .send(privateDoc)
        .end((error, response) => {
          expect(response.status).toEqual(201);
          expect(response.body.document.title).toEqual(privateDoc.title);
          expect(response.body.message).toEqual('Document saved successfully');
          privateDocId = response.body.document.id;
          done();
        });
    });

    it('should return all available documents', (done) => {
      app
        .get('/api/documents')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
        });
      done();
    });

    it('should return an error if document id is invalid', (done) => {
      app
      .put('/api/document/vhhhhjjhv88vhkvu')
      .set('x-access-token', adminToken.token)
      .send({ title: 'asdadsadsds' })
      .end((error, response) => {
        expect(response.status).toEqual(400);
      });
      done();
    });

    it('should return an error if documentId does not exist', (done) => {
      app
      .put('/api/document/8787923')
      .set('x-access-token', adminToken.token)
      .send({ firstname: 'tomiwa' })
      .end((error, response) => {
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual('Document not found');
      });
      done();
    });

    it('should not allow a user to update another user\'s document', (done) => {
      app
      .put('/api/document/4')
      .set('x-access-token', adminToken.token)
      .send({ title: 'sfdsdfsdfsvdfs' })
      .end((error, response) => {
        expect(response.status).toEqual(403);
        expect(response.body.message).toEqual('Unauthorized access');
      });
      done();
    });

    it('should return an error if an invalid field is to be updated', (done) => {
      app
      .put('/api/document/1')
      .set('x-access-token', adminToken.token)
      .send({ firstname: 'sfdsdfsdfsvdfs' })
      .end((error, response) => {
        expect(response.status).toEqual(400);
      });
      done();
    });

    it('should successfully update a document', (done) => {
      app
        .put('/api/document/1')
        .set('x-access-token', adminToken.token)
        .send({ title: 'tomiwa updated' })
        .end((error, response) => {
          expect(response.status).toEqual(200);
        });
      done();
    });

    it('Should return a list of documents based on search criteria', (done) => {
      app
        .get('/api/search/documents/?search=seed')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.documents).toExist();
          expect(typeof response.body.metaData).toBe('object');
          done();
        });
    });

    it('Should return an error message when no documents are found', (done) => {
      app
        .get('/api/search/documents/?search=ij34kj3jr3hjbthj5bjhb45hj')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          expect(response.body.documents).toBe(null);
          expect(response.body.message).toBe('No documents found');
          done();
        });
    });

    it('Should return access denied to logged out users', (done) => {
      app
        .get('/api/search/documents/?search=ij34kj3jr3hjbthj5bjhb45hj')
        .set('x-access-token', '')
        .end((error, response) => {
          expect(response.status).toEqual(400);
          done();
        });
    });

    it('Should return an error message when no search query is entered', (done) => {
      app
        .get('/api/search/documents/?search=')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          expect(response.body.message).toBe('You did not enter a search query');
          done();
        });
    });

    it('Should return a list of documents based on search criteria', (done) => {
      app
        .get('/api/search/userdocuments/?search=seed')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.documents).toExist();
          expect(typeof response.body.metaData).toBe('object');
          done();
        });
    });

    it('Should return an error message when no documents are found', (done) => {
      app
        .get('/api/search/userdocuments/?search=ij34kj3jr3hjbthj5bjhb45hj')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          expect(response.body.documents).toBe(null);
          expect(response.body.message).toBe('No documents found');
          done();
        });
    });

    it('Should return access denied to logged out users', (done) => {
      app
        .get('/api/search/userdocuments/?search=ij34kj3jr3hjbthj5bjhb45hj')
        .set('x-access-token', '')
        .end((error, response) => {
          expect(response.status).toEqual(400);
          done();
        });
    });

    it('Should return an error message when no search query is entered', (done) => {
      app
        .get('/api/search/userdocuments/?search=')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          expect(response.body.message).toBe('You did not enter a search query');
          done();
        });
    });

    it('it should not allow users search for other user\'s documents', (done) => {
      app
        .get('/api/search/userdocuments/?search=seed')
        .set({ 'x-access-token': adminToken.token })
        .end((error, response) => {
          expect(response.status).toBe(200);
          expect(typeof response.body.documents).toBe('object');
          const notMyDoc = response.body.documents.filter((docs) => {
            if (docs.ownerId !== 1) {
              return docs;
            }
            return undefined;
          });
          expect(notMyDoc).toEqual([]);
          done();
        });
    });

    it('should successfully delete a document', (done) => {
      app
        .delete('/api/document/1')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.message).toEqual('Document successfully deleted');
          done();
        });
    });
  });

  describe('Get a user\'s documents endpoint as Author', () => {

    before((done) => {
      app
        .post('/api/users/login')
        .send({ loginId: user.regularUser1.email, password: 'password' })
        .end((error, response) => {
          expect(response.status).toEqual(200);
          authorToken1 = response.body;
          done();
        });
    });

    it('it should not allow users search for private document', (done) => {
      app
        .get('/api/search/documents/?search=seed')
        .set({ 'x-access-token': authorToken1.token })
        .end((error, response) => {
          expect(response.status).toBe(200);
          expect(typeof response.body.documents).toBe('object');
          const noPrivate = response.body.documents.filter((docs) => {
            if (docs.access === 0) {
              return docs;
            }
            return undefined;
          });
          expect(noPrivate).toEqual([]);
        });
        done();
    });

    it('should not allow a user to delete another user\'s document', (done) => {
      app
      .delete('/api/document/2')
      .set('x-access-token', authorToken1.token)
      .end((error, response) => {
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Unauthorized access');
        done();
      });
    });

    it('should not allow a non-authenticated user delete any user\'s document', (done) => {
      app
      .delete('/api/document/4')
      .set('x-access-token', '')
      .end((error, response) => {
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual('Token required to access this route');
        done();
      });
    });

    it('should return an error if document is not found', (done) => {
      app
      .delete('/api/document/678867675')
      .set('x-access-token', authorToken1.token)
      .end((error, response) => {
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual('Document not found');
        done();
      });
    });

    it('should return an error if documentid is invalid', (done) => {
      app
      .delete('/api/document/hvhvmh')
      .set('x-access-token', authorToken1.token)
      .end((error, response) => {
        expect(response.status).toEqual(400);
        done();
      });
    });
  });
});
