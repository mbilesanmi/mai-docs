import supertest from 'supertest';
import expect from 'expect';
import server from '../../index';

process.env.NODE_ENV = 'test';

const app = supertest.agent(server);

describe('Mai Docs test for default server route', () => {
  it('it should return response 200', (done) => {
    app
      .get('/api')
      .end((error, response) => {
        expect(response.body.status).toBe(200);
        if (error) { done(error); }
      });
    done();
  });

  it('should return a Welcome to the Mai Docs API message', (done) => {
    app
      .get('/api')
      .end((error, response) => {
        expect(response.body.message).toEqual(
          'Welcome to the Mai Docs API!'
        );
        if (error) { done(error); }
      });
    done();
  });

  it('should return a json object', (done) => {
    app
      .get('/api')
      .end((error, response) => {
        expect(typeof response.body).toBe('object');
        if (error) { done(error); }
      });
    done();
  });
});
