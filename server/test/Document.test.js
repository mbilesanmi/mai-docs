import supertest from 'supertest';
import expect from 'expect';
import colors from 'colors';
import server from '../../tools/appServer';
import { user, newData } from './helper/testHelper';
import { roles, users, documents } from './helper/seeders';
import models from '../models';

process.env.NODE_ENV = 'test';

const app = supertest.agent(server);

describe('Mai Docs Users Endpoints ', () => {
  before((done) => {
    console.log('message : reseting Database.......'.yellow);
    models.sequelize.sync({ force: true }).then(() => {
      console.log('roles', roles);
      models.Role.bulkCreate(roles).then(() => {
        console.log('message : seeding roles done.......'.green);
        models.Role.bulkCreate(users).then(() => {
          console.log('message : seeding users done.......'.green);
          models.Role.bulkCreate(users).then(() => {
            console.log('message : seeding documents done.......'.green);
          }).catch(() => {});
        }).catch(() => {});
      }).catch(() => {});
    }).catch(() => {});
    done();
  });

  after((done) => {
    console.log('message : reseting Database.......'.red);
    models.sequelize.sync({ force: true }).then(() => {
      console.log('message : Database reset succesful'.cyan);
      done();
    });
  });

  describe('POST /api/documents create new document route', () => {
    it('should return a status of 201 when successful', (done) => {
      app
        .post('/api/documents')
        .send(newData.newDocument1)
        .end((error, response) => {
          expect(response.status).toEqual(201);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a document created successfully message if successful', (done) => {
      app
        .post('/api/documents')
        .send(newData.newDocument1)
        .end((error, response) => {
          expect(response.body.message).toEqual('Document created successful');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the created document', (done) => {
      app
        .post('/api/documents')
        .send(newData.newDocument1)
        .end((error, response) => {
          expect(typeof response.body.document).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 400 if the title field is empty', (done) => {
      app
        .post('/api/documents')
        .send(newData.emptyDocument)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Fields cannot be empty message if the title field is empty', (done) => {
      app
        .post('/api/documents')
        .send(newData.emptyDocument)
        .end((error, response) => {
          expect(response.body.message).toEqual('Fields cannot be empty');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object if the title field is empty', (done) => {
      app
        .post('/api/documents')
        .send(newData.emptyDocument)
        .end((error, response) => {
          expect(typeof response).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('PUT /api/documents/:id update document route', () => {
    it('should return a status of 500 if the title field is empty', (done) => {
      app
        .put('/api/documents/1')
        .send(newData.emptyDocument)
        .end((error, response) => {
          expect(response.status).toEqual(500);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Fields cannot be empty message if the title field is empty', (done) => {
      app
        .put('/api/documents/1')
        .send(newData.emptyDocument)
        .end((error, response) => {
          expect(response.body.message).toEqual('Fields cannot be empty');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object if the title field is empty', (done) => {
      app
        .put('/api/documents/1')
        .send(newData.emptyDocument)
        .end((error, response) => {
          expect(typeof response).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 404 if document doesnt exist', (done) => {
      app
        .put('/api/documents/872392')
        .send(newData.newDocument1)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Document Not Found message if document doesnt exist', (done) => {
      app
        .put('/api/documents/872392')
        .send(newData.newDocument1)
        .end((error, response) => {
          expect(response.body.message).toEqual('Document Not Found');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the created document', (done) => {
      app
        .put('/api/documents/872392')
        .send(newData.newDocument1)
        .end((error, response) => {
          expect(typeof response).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 200 if document update is successful', (done) => {
      app
        .put('/api/documents/1')
        .send(newData.document1)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Document successfully updated message if document updates successfully', (done) => {
      app
        .put('/api/documents/1')
        .send(newData.document1)
        .end((error, response) => {
          expect(response.body.message).toEqual('Document successfully updated');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the created document', (done) => {
      app
        .put('/api/documents/1')
        .send(newData.document1)
        .end((error, response) => {
          expect(typeof response).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 500 if document update is not successful', (done) => {
      app
        .put('/api/documents/102323323asadasa')
        .send(newData.newDocument1)
        .end((error, response) => {
          expect(response.status).toEqual(500);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the created document', (done) => {
      app
        .put('/api/documents/102323323asadasa')
        .send(newData.newDocument1)
        .end((error, response) => {
          expect(typeof response).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('GET /api/documents/ get all documents route', () => {
    it('should return a status of 200 if the documents are found', (done) => {
      app
        .get('/api/documents')
        .end((error, response) => {
          expect(response.status).toEqual(200);
          if (error) { done(error); }
        });
      done();
    });
    it('should return json oebject of the response if the documents are found', (done) => {
      app
        .get('/api/documents')
        .end((error, response) => {
          expect(typeof response).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('GET /api/search/documents/ search users route ', () => {
    it('should return a status of 404 for the not found search result', (done) => {
      app
        .get('/api/search/documents/?search=maranathafakerfolder')
        .end((error, response) => {
          expect(response.status).toEqual(404);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for the not found search result', (done) => {
      app
        .get('/api/search/documents/?search=maranathafakerfolder')
        .end((error, response) => {
          expect(typeof response).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a document not found message', (done) => {
      app
        .get('/api/search/documents/?search=maranathafakerfolder')
        .end((error, response) => {
          expect(response.body.message).toEqual('No documents found matching search criteria');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 200 for the found search result', (done) => {
      app
        .get('/api/search/documents/?search=document')
        .end((error, response) => {
          expect(response.status).toEqual(200);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for the found documents search result', (done) => {
      app
        .get('/api/search/documents/?search=document')
        .end((error, response) => {
          expect(typeof response.status).toEqual('number');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a documents found message', (done) => {
      app
        .get('/api/search/documents/?search=document')
        .end((error, response) => {
          expect(response.body.message).toEqual('Dcuments found');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('DELETE /api/documents/:id delete document route', () => {
    it('should return a status of 400 if the document is not found', (done) => {
      app
        .delete('/api/documents/13232432')
        .end((error, response) => {
          expect(response.status).toEqual(400);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Document not found message if the document is not found', (done) => {
      app
        .delete('/api/documents/13232432')
        .end((error, response) => {
          expect(response.body.message).toEqual('Document not found');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json response if the document is not found', (done) => {
      app
        .delete('/api/documents/13232432')
        .end((error, response) => {
          expect(typeof response).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 200 if the document deleted', (done) => {
      app
        .delete('/api/documents/2')
        .end((error, response) => {
          expect(response.status).toEqual(200);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Document deleted successfully message if the document deleted', (done) => {
      app
        .delete('/api/documents/2')
        .end((error, response) => {
          expect(response.body.message).toEqual('Document deleted successfully');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object if the document deleted', (done) => {
      app
        .delete('/api/documents/2')
        .end((error, response) => {
          expect(typeof response).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 400 if the document delete fails', (done) => {
      app
        .delete('/api/documents/2dsd1e112e3e23')
        .end((error, response) => {
          expect(response.status).toEqual(400);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 500 if the document delete fails', (done) => {
      app
        .delete('/api/documents/2dsd1e112e3e23')
        .end((error, response) => {
          expect(typeof response).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
  });
});
