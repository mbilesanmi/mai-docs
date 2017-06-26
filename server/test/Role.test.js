// import supertest from 'supertest';
// import expect from 'expect';

// import server from '../../index';
// import { role, newData, user } from './helper/testHelper';

// require('dotenv').config();

// // During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// const app = supertest.agent(server);
// let adminToken;
// // let authorToken;
// // let signinUser;
// app
//   .post('/api/users/login')
//   .send({ loginId: 'Admin', password: 'password' })
//   .end((error, response) => {
//     adminToken = response.body;
//     console.log('sdsd====', adminToken);
//     expect(response.status).toEqual(200);
//   });

// describe('Mai Docs Roles Endpoints ', () => {
//   before((done) => {
//     app
//       .post('/api/users/login')
//       .send({ loginId: 'Admin', password: 'password' })
//       .end((error, response) => {
//         adminToken = response.body;
//         console.log('sdsd====', adminToken);
//         expect(response.status).toEqual(200);
//       });
//     done();
//   });

//   describe('Create Role', () => {
//     it('should create new role', (done) => {
//       console.log('sdbfjfsd', adminToken);
//       app
//         .post('/api/roles')
//         .set('x-access-token', adminToken.token)
//         .send(newData.newRole)
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           adminToken = res.body;
//           expect(res.status).toEqual(201);
//           expect(res.body.message).toEqual('Role created successfully');
//         });
//       done();
//     });

//     it('should not create new role', (done) => {
//       app
//         .post('/api/roles')
//         .set('x-access-token', adminToken.token)
//         .send({})
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           adminToken = res.body;
//           expect(res.status).toEqual(400);
//         });
//       done();
//     });
//   });
// });
