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
    console.log('message :  ', 'reseting Database.......');
    models.sequelize.sync({ force: true }).then(() => {
      console.log('message :  ', 'Database reset succesful');
      done();
    });
  });

  describe('POST /api/users create/signup new user route', () => {
    it('should return a status of 201 when successful', (done) => {
      app
        .post('/api/users')
        .send(newData.newUser)
        .end((error, response) => {
          expect(response.status).toEqual(201);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Signup successful message if successful', (done) => {
      app
        .post('/api/users')
        .send(newData.newUser)
        .end((error, response) => {
          expect(response.body.message).toEqual(`Signup successful. Welcome ${newData.newUser.name}`);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the created user if successful', (done) => {
      app
        .get('/api/users/')
        .send(newData.newUser)
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should have a json response if successful', (done) => {
      app
        .post('/api/users')
        .send(newData.newUser)
        .end((error, response) => {
          expect('Content-Type', /json/);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 400 if any field is empty', (done) => {
      app
        .post('/api/users')
        .send(newData.emptyUser)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the error when the fields are empty', (done) => {
      app
        .post('/api/users/')
        .send(newData.emptyUser)
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 409 when the username/email isnt unique', (done) => {
      app
        .post('/api/users')
        .send(newData.newUser)
        .end(() => {
          app.post('/api/users')
          .send(newData.newUser)
          .end((error, response) => {
            expect(response.status).toEqual(409);
            if (error) { done(error); }
          });
        });
      done();
    });
    it('should return a User already exists message if the username/email isnt unique', (done) => {
      app
        .post('/api/users')
        .send(newData.newUser)
        .end(() => {
          app.post('/api/users')
          .send(newData.newUser)
          .end((error, response) => {
            expect(response.body.message).toEqual('User already exists');
            if (error) { done(error); }
          });
        });
      done();
    });
    it('should return a json object of the error message if the username/email isnt unique', (done) => {
      app
        .post('/api/users')
        .send(newData.newUser)
        .end(() => {
          app.post('/api/users')
          .send(newData.newUser)
          .end((error, response) => {
            expect(typeof response.body).toBe('object');
            if (error) { done(error); }
          });
        });
      done();
    });
    it('should have a json response if the username/email isnt unique', (done) => {
      app
        .post('/api/users')
        .send(newData.newUser)
        .end(() => {
          app.post('/api/users')
          .send(newData.newUser)
          .end((error, response) => {
            expect('Content-Type', /json/);
            if (error) { done(error); }
          });
        });
      done();
    });
    it('should generate a token if successful', (done) => {
      app
        .post('/api/users')
        .send(newData.newUser)
        .end(() => {
          app.post('/api/users')
          .send(newData.newUser)
          .end((error, response) => {
            expect(response.body.token).toExist();
            if (error) { done(error); }
          });
        });
      done();
    });
  });

  describe('/api/users get all users route ', () => {
    it('should return a status of 200', (done) => {
      app
        .get('/api/users/')
        .end((error, response) => {
          expect(response.status).toEqual(200);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch an array of user objects', (done) => {
      app
        .get('/api/users/')
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('POST /api/users/login login route', () => {
    it('should return a status of 400 if any field is empty', (done) => {
      app
        .post('/api/users/login')
        .send(newData.emptyUser)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the error when the fields are empty', (done) => {
      app
        .post('/api/users/login')
        .send(newData.emptyUser)
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Fields cannot be empty message when the fields are empty', (done) => {
      app
        .post('/api/users/login')
        .send(newData.emptyUser)
        .end((error, response) => {
          expect(response.body.message).toBe('Fields cannot be empty');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 404 if user doesnt exist', (done) => {
      app
        .post('/api/users/login')
        .send(newData.fakeUser)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          if (error) { done(error); }
        });
      done();
    });
    it('should return a json object of the error when the user doesnt exist', (done) => {
      app
        .post('/api/users/login')
        .send(newData.fakeUser)
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Fields cannot be empty message when the user doesnt exist', (done) => {
      app
        .post('/api/users/login')
        .send(newData.fakeUser)
        .end((error, response) => {
          expect(response.body.message).toBe('User does not exist');
          if (error) { done(error); }
        });
      done();
    });
    it('should generate a token if successful', (done) => {
      app
        .post('/api/users/login')
        .send(newData.adminUser1)
        .end((error, response) => {
          expect(response.body.token).toExist();
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 200 when successful', (done) => {
      app
        .post('/api/users/login')
        .send(newData.adminUser1)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('GET /api/users/:id get a users route ', () => {
    it('should return a json object for the selected user', (done) => {
      app
        .get('/api/users/1')
        .end((error, response) => {
          expect(typeof response.body).toBe('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 400 for an invalid userId', (done) => {
      app
        .get('/api/users/190290jks')
        .end((error, response) => {
          expect(response.status).toEqual(400);
          if (error) { done(error); }
          done();
        });
    });
    it('should fetch a json object for the invalid userId', (done) => {
      app
        .get('/api/users/190290jks')
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
          done();
        });
    });
    it('should return an Invalid userID message', (done) => {
      app
        .get('/api/users/190290jks')
        .end((error, response) => {
          expect(response.body.message).toEqual('Invalid userID');
          if (error) { done(error); }
          done();
        });
    });
    it('should return a status of 404 for a non-existent userId', (done) => {
      app
        .get('/api/users/123456789')
        .end((error, response) => {
          expect(response.status).toEqual(404);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for for a non-existent userId', (done) => {
      app
        .get('/api/users/123456789')
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a user does not exist message', (done) => {
      app
        .get('/api/users/123456789')
        .end((error, response) => {
          expect(response.body.message).toEqual('User does not exist');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('PUT /api/users/:id update a user route ', () => {
    it('should return a status of 404 for a non-existent userId', (done) => {
      app
        .put('/api/users/123456789')
        .send(newData.fakeUser)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for a non-existent userId', (done) => {
      app
        .put('/api/users/123456789')
        .send(newData.fakeUser)
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a user not found message', (done) => {
      app
        .put('/api/users/123456789')
        .send(newData.fakeUser)
        .end((error, response) => {
          expect(response.body.message).toEqual('User Not Found');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a status of 200 if the update is successful', (done) => {
      app
        .put('/api/users/1')
        .send(newData.adminUser1)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for a successful update', (done) => {
      app
        .put('/api/users/1')
        .send(newData.adminUser1)
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Profile successfully updated message on success', (done) => {
      app
        .put('/api/users/1')
        .send(newData.adminUser1)
        .end((error, response) => {
          expect(response.body.message).toEqual('Profile successfully updated');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('DELETE /api/users/:id delete a user route ', () => {
    it('should return a status of 404 for a non-existent userId', (done) => {
      app
        .delete('/api/users/123456789')
        .end((error, response) => {
          expect(response.status).toEqual(404);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for a non-existent userId', (done) => {
      app
        .delete('/api/users/123456789')
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a user not found message', (done) => {
      app
        .delete('/api/users/123456789')
        .end((error, response) => {
          expect(response.body.message).toEqual('User not found');
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for a successful delete', (done) => {
      app
        .delete('/api/users/1')
        .end((error, response) => {
          expect(typeof response.body).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a Profile successfully deleted message on success', (done) => {
      app
        .delete('/api/users/1')
        .end((error, response) => {
          expect(response.body.message).toEqual('User deleted successfully');
          if (error) { done(error); }
        });
      done();
    });
  });

  describe('GET /api/search/users/ search users route ', () => {
    it('should return a status of 404 for the not found search result', (done) => {
      app
        .get('/api/search/users/?search=maranathafaker')
        .end((error, response) => {
          expect(response.status).toEqual(404);
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for the not found search result', (done) => {
      app
        .get('/api/search/users/?search=maranathafaker')
        .end((error, response) => {
          expect(typeof response).toEqual('object');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a user not found message', (done) => {
      app
        .get('/api/search/users/?search=maranathafaker')
        .end((error, response) => {
          expect(response.body.message).toEqual('No users found matching your search criteria');
          if (error) { done(error); }
        });
      done();
    });
    it('should fetch a json object for the found users search result', (done) => {
      app
        .get('/api/search/users/?search=admin')
        .end((error, response) => {
          expect(typeof response.status).toEqual('number');
          if (error) { done(error); }
        });
      done();
    });
    it('should return a users found message', (done) => {
      app
        .get('/api/search/users/?search=admin')
        .end((error, response) => {
          expect(response.body.message).toEqual('No users found matching your search criteria');
          if (error) { done(error); }
        });
      done();
    });
  });
});
