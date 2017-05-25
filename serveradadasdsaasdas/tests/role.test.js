// import expect from 'expect';
// import supertest from 'supertest';
// import server from '../../tools/srcServer';
// import roles from './helper/test-helper';
// // import db from '../models';

// process.env.NODE_ENV = 'test';

// // const app = request(server);
// const app = supertest.agent(server);
// const role = helper.newRole;
// const adminUser = helper.administrator;
// const regularUser = helper.regular;

// describe('Mai Docs ', () => {
//   it('should create and return a role object', (done) => {
//     app
//       .post('/api/roles/')
//       .send(roles.superUserRole)
//       .end((error, response) => {
//         // response.body.should.have.property('id');
//         // response.body.should.have.property('title');
//         expect(typeof response.body).toBe('object');
//         expect(response.body.id).toExist();
//         expect(response.body.title).toExist();
//       });
//     app
//       .post('/api/roles')
//       .send(roles.adminRole)
//       .expect(200)
//       .end((error, response) => {
//         expect(typeof response.body).toBe('object');
//         expect(response.body.id).toExist();
//         expect(response.body.title).toExist();
//       });
//     app
//       .post('/api/roles')
//       .send(roles.userRole)
//       .expect(200)
//       .end((error, response) => {
//         expect(typeof response.body).toBe('object');
//         expect(response.body.id).toExist();
//         expect(response.body.title).toExist();
//       });
//     done();
//   });
// });

// describe('Mai Docs ', () => {
//   it('should return a json object of all available roles', (done) => {
//     app
//       .get('/api/roles/')
//       .send(roles.superUserRole)
//       .end((error, response) => {
//         expect(typeof response.body).toBe('object');
//         expect(response.body.id).toExist();
//         expect(response.body.title).toExist();
//       });
//     done();
//   });
// });

// describe('Mai Docs ', () => {
//   it('should return a json object of all available roles', (done) => {
//     app
//       .get('/api/roles/')
//       .send(roles.superUserRole)
//       .end((error, response) => {
//         expect(typeof response.body).toBe('object');
//         expect(response.body.id).toExist();
//         expect(response.body.title).toExist();
//       });
//     done();
//   });
// });
