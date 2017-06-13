import supertest from 'supertest';
import expect from 'expect';
import colors from 'colors';
import server from '../../tools/appServer';
import { role, newData } from './helper/testHelper';
import { roles, users, documents } from './helper/seeders';
import models from '../models';

process.env.NODE_ENV = 'test';

const app = supertest.agent(server);

describe('Mai Docs Roles Endpoints ', () => {
  describe('POST /api/roles create new role route', () => {
    it('should return a status of 201 when successful', (done) => {
      app
        .post('/api/roles')
        .send(newData.newRole)
        .end((error, response) => {
          expect(response.status).toEqual(201);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Role created successfully message if successful', (done) => {
      app
        .post('/api/roles')
        .send(newData.newRole)
        .end((error, response) => {
          expect(response.body.message).toEqual('Role created successfully');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the created role if successful', (done) => {
      app
        .get('/api/roles/')
        .send(newData.newRole)
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should have a json response if successful', (done) => {
      app
        .post('/api/roles')
        .send(newData.newRole)
        .end((error, response) => {
          expect('Content-Type', /json/);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 400 when the fields are empty', (done) => {
      app
        .post('/api/roles')
        .send(role.emptyRole)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Title field cannot be empty message when the fields are empty', (done) => {
      app
        .post('/api/roles')
        .send(role.emptyRole)
        .end((error, response) => {
          expect(response.body.message).toEqual('Title field cannot be empty');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the error message when the fields are empty', (done) => {
      app
        .get('/api/roles/')
        .send(role.emptyRole)
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should have a json response when the fields are empty', (done) => {
      app
        .post('/api/roles')
        .send(role.emptyRole)
        .end((error, response) => {
          expect('Content-Type', /json/);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 409 when the title isnt unique', (done) => {
      app
        .post('/api/roles')
        .send(newData.newRole)
        .end(() => {
          app.post('/api/roles')
          .send(newData.newRole)
          .end((error, response) => {
            expect(response.status).toEqual(409);
            if (error) { done(error); }
          });
        });
      done();
    });
    it('should return a Role must be unique message the title isnt unique', (done) => {
      app
        .post('/api/roles')
        .send(newData.newRole)
        .end(() => {
          app.post('/api/roles')
          .send(newData.newRole)
          .end((error, response) => {
            expect(response.body.message).toEqual('Role must be unique');
            if (error) { done(error); }
          });
        });
      done();
    });
    it('should return a json object of the error message if the title isnt unique', (done) => {
      app
        .post('/api/roles')
        .send(newData.newRole)
        .end(() => {
          app.post('/api/roles')
          .send(newData.newRole)
          .end((error, response) => {
            expect(typeof response).toBe('object');
            if (error) { done(error); }
          });
        });
      done();
    });
    it('should have a json response if the title isnt unique', (done) => {
      app
        .post('/api/roles')
        .send(newData.newRole)
        .end(() => {
          app.post('/api/roles')
          .send(newData.newRole)
          .end((error, response) => {
            expect('Content-Type', /json/);
            if (error) { done(error); }
          });
        });
      done();
    });
  });

  describe('GET /api/roles get all roles route', () => {
    it('should fetch an array of user objects', (done) => {
      app
        .get('/api/roles/')
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('GET /api/roles:id get selected role route', () => {
    it('should return a status of 200', (done) => {
      app
        .get('/api/roles/1')
        .end((error, response) => {
          expect(response.status).toEqual(200);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for the invalid roleId', (done) => {
      app
        .get('/api/roles/190290jks')
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
          done();
        });
    });
    it('should return an Invalid roleID message', (done) => {
      app
        .get('/api/roles/190290jks')
        .end((error, response) => {
          expect(response.body.message).toEqual('Invalid roleID');
          if (error) { done(error); }
          done();
        });
    });
    it('should return a status of 404 for a non-existent roleId', (done) => {
      app
        .get('/api/roles/123456789')
        .end((error, response) => {
          expect(response.status).toEqual(404);
          if (error) { done(error); }
          done();
        });
    });
    it('should fetch a json object for for a non-existent roleId', (done) => {
      app
        .get('/api/roles/123456789')
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
          done();
        });
    });
    it('should return a Role does not exist message', (done) => {
      app
        .get('/api/roles/123456789')
        .end((error, response) => {
          expect(response.body.message).toEqual('Role does not exist');
          if (error) { done(error); }
          done();
        });
    });
  });
});

