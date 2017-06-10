import expect from 'expect';
import request from 'supertest';
import server from '../../tools/srcServer';
import roles from './helper/roles';

const app = request(server);

describe('Mai Docs ', () => {
  it('should create and return a roleId', (done) => {
    app
      .post('/api/roles/')
      .send(roles.superUserRole)
      .end((error, response) => {
        console.log('cghcmghmhgchchgfh', response.body);
        expect(typeof response.body).toBe('object');
        // expect(response.body.should.have.property('id');
        // (response.body.roleId === '1').should.equal(true);
        done();
      });
  });
});

describe('Mai Docs ', () => {
  it('should return a roleId ', (done) => {
    app
      .post('/api/roles/')
      .send(roles.superUserRole)
      .end((error, response) => {
        console.log(response.body);
        expect(response.body.id).toExist();
        // expect(response.body.should.have.property('id');
        // (response.body.roleId === '1').should.equal(true);
        done();
      });
  });
});
