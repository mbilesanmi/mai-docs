import supertest from 'supertest';
import expect from 'expect';
import server from '../../tools/appServer';
import { user } from './helper/testHelper';

process.env.NODE_ENV = 'test';

const app = supertest.agent(server);

describe('Mai Docs ', () => {
  describe('/api/users get all users route ', () => {
    it('should return a status of 200', (done) => {
      app
        .get('/api/users/')
        .end((error, response) => {
          // console.log('cghcmghmhgchchgfh', response.body[0]);
          expect(response.status).toEqual(200);
          if (error) { done(error); }
          done();
        });
    });
    it('should fetch an array of user objects', (done) => {
      app
        .get('/api/users/')
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
          done();
        });
    });
  });
});
