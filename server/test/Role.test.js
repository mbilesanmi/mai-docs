// import supertest from 'supertest';
// import expect from 'expect';
// import server from '../../index.js';
// import models from '../models';
// import seeds from './helper/seeders';
// import log from 'npmlog';
// import { role, newData } from './helper/testHelper';

// require('dotenv').config();

// // During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// const app = supertest.agent(server);
// let adminToken;
// // let authorToken;
// // let signinUser;

// describe('Mai Docs Documents Endpoints ', () => {
//   before((done) => {
//     seeds()
//     .then(() => {
//       log.info('seeding done for documents tests'.green);
//       done();
//     });
//   });

//   describe('Documents endpoints/controllers as Admin', () => {

//     before((done) => {
//       app
//         .post('/api/users/login')
//         .send({ loginId: user.adminUser1.username, password: 'password' })
//         .end((error, response) => {
//           expect(response.status).toEqual(200);
//           adminToken = response.body;
//           done();
//         });
//     });

//     it('should return an error if the userId is invalid', (done) => {
//       app
//         .get('/api/roles/dasdas/documents')
//         .set('x-access-token', adminToken.token)
//         .end((error, response) => {
//           expect(response.status).toEqual(400);
//           expect(response.body.message).toEqual('Invalid userID entered');
//         });
//       done();
//     });
//   });
// });

// // app
// //   .post('/api/users/login')
// //   .send({ loginId: 'Admin', password: 'password' })
// //   .end((error, response) => {
// //     adminToken = response.body;
// //     console.log('sdsd====', adminToken);
// //     expect(response.status).toEqual(200);
// //   });

// // describe('Mai Docs Roles Endpoints ', () => {
// //   before((done) => {
// //     app
// //       .post('/api/users/login')
// //       .send({ loginId: 'Admin', password: 'password' })
// //       .end((error, response) => {
// //         adminToken = response.body;
// //         console.log('sdsd====', adminToken);
// //         expect(response.status).toEqual(200);
// //       });
// //     done();
// //   });

// //   describe('Create Role', () => {
// //     it('should create new role', (done) => {
// //       console.log('sdbfjfsd', adminToken);
// //       app
// //         .post('/api/roles')
// //         .set('x-access-token', adminToken.token)
// //         .send(newData.newRole)
// //         .expect('Content-Type', /json/)
// //         .end((err, res) => {
// //           adminToken = res.body;
// //           expect(res.status).toEqual(201);
// //           expect(res.body.message).toEqual('Role created successfully');
// //         });
// //       done();
// //     });

// //     it('should not create new role', (done) => {
// //       app
// //         .post('/api/roles')
// //         .set('x-access-token', adminToken.token)
// //         .send({})
// //         .expect('Content-Type', /json/)
// //         .end((err, res) => {
// //           adminToken = res.body;
// //           expect(res.status).toEqual(400);
// //         });
// //       done();
// //     });
// //   });
// // });
