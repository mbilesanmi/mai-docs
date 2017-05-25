// import supertest from 'supertest';
// import expect from 'expect';
// import server from '../../tools/srcServer';
// import db from '../models';
// import helper from './helpers/testHelper';

// const app = supertest.agent(server);
// const adminRole = helper.adminRole;
// const userRole = helper.userRole;
// const regUser = helper.regUser;
// const adminUser = helper.adminUser;

// let role;
// let token;

// describe('Mai Docs ', () => {
//   // console.log('db', db.Role);
//   before((done) => {
//     // app.post('/api/ro')
//     db.Role.create(adminRole)
//       .then((newRole) => {
//         // console.log('here', newRole);
//         adminUser.roleId = newRole.id;
//         console.log('adminUser', adminUser);
//         console.log('db user', db.User);
//         db.User.create(adminUser)
//         // app.post('/api/users')
//           .then((adminUser) => {
//             console.log('adminUser', adminUser);
//             app.post('/api/users/login')
//               .send(adminUser)
//               .end((error, response) => {
//                 if (error) {
//                   console.log('error', error);
//                   return error;
//                 }
//                 console.log('respons', response.body);
//               });
//           });
//           // .send(adminUser)
//           // .end((error, response) => {
//           //   if (error) return error;
//           //   console.log('response', response.body);
//           //   app.post('/api/users/login')
//           //     .send(adminUser)
//           //     .end((error, res) => {
//           //       console.log('resp', res.body);
//           //       if (error) return error;
//           //       token = response.body.token;
//           //       done();
//           //     });
//           // });
//         // db.User.create(adminUser)
//         //   .then(() => {
//         //     console.log('adminUser', adminUser);
//         //     app.post('/api/users/login')
//         //       .send(adminUser)
//         //       .end((error, response) => {
//         //         console.log('error', error);
//         //         if (error) return error;
//         //         token = response.body.token;
//         //         done();
//         //       });
//         //   });
//       });
//   });
//   // before((done) => {
//   //   app
//   //     .post('/api/users')
//   //     .send(regUser)
//   //     .end((err, res) => {
//   //       author = res.body;
//   //       done();
//   //     });
//   // });

//   // describe('shuld create roles when this endpoint is hit', () => {
//   describe('Create roles', () => {
//     before((done) => {
//       app
//         .post('/api/users')
//         .send(adminUser)
//         .end((err, res) => {
//           admin = res.body;
//           done();
//         });
//     });

//     it('should create and return a role object', (done) => {
//       app
//         .post('/api/roles')
//         // .set('x-access-token', admin.token)
//         .send(roles.newRole)
//         .end((error, response) => {
//           expect('Content-Type', /json/);
//           console.log(error);
//           // role = res.body;
//           if (error) return done(error);
//           expect(response.body.message).toEqual('Role created successfully');
//           expect(response.status).toEqual(201);
//           done();
//         });
//     });
//   });
// });
