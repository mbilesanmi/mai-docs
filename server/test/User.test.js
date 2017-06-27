import supertest from 'supertest';
import expect from 'expect';
import models from '../models';
import server from '../../index';
import seeds from './helper/seeders';
import { newData, user } from './helper/testHelper';

require('dotenv').config();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const app = supertest.agent(server);
let adminToken;
let authorToken;
let signinUser;
let signinUser2;

describe('Mai Docs Users Endpoints ', () => {
  before((done) => {
    seeds()
    .then(() => {
      console.log('seeding done');
      app
        .post('/api/users/login')
        .send({ loginId: 'damipeju', password: 'password' })
        .end((error, response) => {
          signinUser2 = response.body;
          expect(response.status).toEqual(200);
          expect(response.body.message).toEqual('Successfully logged in.');
        });
      app
        .post('/api/users')
        .send(newData.newUser)
        .end((error, response) => {
          expect(response.status).toEqual(201);
          authorToken = response.body;
        });
      done();
    });
  });

  after((done) => {
    models.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });

  describe('Create User', () => {
    it('should create new user', (done) => {
      app
        .post('/api/users')
        .send(newData.newAdmin)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          adminToken = res.body;
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual(`Signup successful. Welcome ${newData.newAdmin.username}`);
        });
      done();
    });

    it('should not create user with the same email', (done) => {
      app
        .post('/api/users')
        .send(newData.newAdmin)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          expect(response.body.error).toEqual('username must be unique');
        });
      done();
    });

    it('should not create user with empty fields', (done) => {
      app
        .post('/api/users')
        .send(newData.emptyUser)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          expect(response.body.error[0].message).toEqual('firstname cannot be null');
        });
      done();
    });
  });

  describe('Login API', () => {
    it('should successfully log user in', (done) => {
      app
        .post('/api/users/login')
        .send({ loginId: user.regularUser1.email, password: 'password' })
        .end((error, response) => {
          signinUser = response.body;
          expect(response.status).toEqual(200);
          expect(response.body.message).toEqual('Successfully logged in.');
          done();
        });
    });

    it('logged in user should have a token', (done) => {
      expect(signinUser.token).toExist();
      done();
    });

    it('should return Invalid login details for an invalid entry', (done) => {
      app
        .post('/api/users/login')
        .send({ loginId: 'random@gmail.com', password: '123456' })
        .end((error, response) => {
          expect(response.status).toEqual(404);
          expect(response.body.message).toEqual(
            'Invalid login details');
          done();
        });
    });

    it('should return login failed for a wrong password', (done) => {
      app
        .post('/api/users/login')
        .send({ loginId: 'admin@admin.com', password: '123456' })
        .end((error, response) => {
          expect(response.status).toEqual(401);
          expect(response.body.message).toEqual(
            'Login failed. Verify your login info');
          done();
        });
    });

    it('should not log user in with empty fields', (done) => {
      app
        .post('/api/users/login')
        .send({ loginId: '', password: '' })
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(response.status).toEqual(400);
          expect(response.body.message).toEqual('Fields cannot be empty');
        });
      done();
    });
  });

  describe('Get all Users', () => {
    it('should return users when offset is set', (done) => {
      app
        .get('/api/users/?offset=2')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.users).toExist();
          expect(typeof response.body.metaData).toBe('object');
        });
      done();
    });

    it('should return users when offset is not set', (done) => {
      app
        .get('/users')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
        });
      done();
    });

    it('should return error message when offset is invalid', (done) => {
      app
        .get('/api/users/?offset=sddsds')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(400);
        });
      done();
    });
  });

  describe('Get one User', () => {
    it('should return user when user id is set', (done) => {
      app
        .get('/api/user/2')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
        });
      done();
    });

    it('should return users when user id does not exist', (done) => {
      app
        .get('/api/user/121234')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          expect(response.body.message).toEqual('User Not Found');
        });
      done();
    });

    it('should return error message when user id is invalid', (done) => {
      app
        .get('/api/user/sd3k3sd')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(400);
        });
      done();
    });
  });

  describe('Update User', () => {
    it('should return an error if userid is invalid', (done) => {
      app
      .put('/api/user/vhhhhjjhv88vhkvu')
      .set('x-access-token', authorToken.token)
      .send({ firstname: 'tomiwa' })
      .end((error, response) => {
        expect(response.status).toEqual(400);
      });
      done();
    });

    it('should return an error if userid does not exist', (done) => {
      app
      .put('/api/user/8787923')
      .set('x-access-token', authorToken.token)
      .send({ firstname: 'tomiwa' })
      .end((error, response) => {
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual('User not found');
      });
      done();
    });

    it('should not allow a user to update another user\'s profile', (done) => {
      app
      .put('/api/user/1')
      .set('x-access-token', authorToken.token)
      .send({ firstname: 'tomiwa' })
      .end((error, response) => {
        expect(response.status).toEqual(403);
        expect(response.body.message).toEqual('Unauthorized access');
      });
      done();
    });

    it('should successfully update a user', (done) => {
      app
        .put('/api/user/1')
        .set('x-access-token', adminToken.token)
        .send({ firstname: 'tomiwa' })
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.message).toEqual('Profile successfully updated');
        });
      done();
    });
  });

  describe('Search User', () => {
    it('Should return a list of users based on search criteria', (done) => {
      app
        .get('/api/search/users/?search=a')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.users).toExist();
          expect(typeof response.body.metaData).toBe('object');
          done();
        });
    });

    it('Should return an error message when no users are found', (done) => {
      app
        .get('/api/search/users/?search=aadksjabdsbcsddsc')
        .set('x-access-token', adminToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(404);
          expect(response.body.users).toBe(null);
          expect(response.body.message).toBe('No users found matching your search criteria');
          done();
        });
    });

    it('Should return access denied to logged out users', (done) => {
      app
        .get('/api/search/users/?search=aadksjabdsbcsddsc')
        .set('x-access-token', '')
        .end((error, response) => {
          expect(response.status).toEqual(400);
          expect(response.body.message).toBe('Token required to access this route');
          done();
        });
    });

    it('Should return access denied to non-admin users', (done) => {
      app
        .get('/api/search/users/?search=aadksjabdsbcsddsc')
        .set('x-access-token', authorToken.token)
        .end((error, response) => {
          expect(response.status).toEqual(403);
          expect(response.body.message).toBe('Access denied.');
          done();
        });
    });
  });

  describe('/POST/logout', () => {
    it('successfully signs a user out', (done) => {
      app
      .post('/api/users/logout')
      .end((error, response) => {
        expect(response.status).toEqual(200);
        expect(typeof response.body).toBe('object');
        expect(response.body.message).toBe('You are now logged out.');
        done();
      });
    });
  });

  describe('Delete User', () => {
    it('should not allow a user to delete another user\'s profile', (done) => {
      app
      .delete('/api/user/4')
      .set('x-access-token', authorToken.token)
      .end((error, response) => {
        expect(response.status).toEqual(403);
        done();
      });
    });

    it('should not allow a user with an invalid token delete any user\'s profile', (done) => {
      app
      .delete('/api/user/4')
      .set('x-access-token', 'adsfdsfds')
      .end((error, response) => {
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Token authentication failed.');
        done();
      });
    });

    it('should not allow a non-authenticated user delete any user\'s profile', (done) => {
      app
      .delete('/api/user/4')
      .set('x-access-token', '')
      .end((error, response) => {
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual('Token required to access this route');
        done();
      });
    });

    it('should return an error if user is not found', (done) => {
      app
      .delete('/api/user/678867675')
      .set('x-access-token', authorToken.token)
      .end((error, response) => {
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual('User not found');
        done();
      });
    });

    it('should return an error if userid is invalid', (done) => {
      app
      .delete('/api/user/hvhvmh')
      .set('x-access-token', authorToken.token)
      .end((error, response) => {
        expect(response.status).toEqual(400);
        done();
      });
    });

    it('should return an error if you try to delete an admin', (done) => {
      app
      .delete('/api/user/1')
      .set('x-access-token', adminToken.token)
      .end((error, response) => {
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual('You cannot delete an Admin');
        done();
      });
    });

    it('should successfully delete a user', (done) => {
      app
        .delete('/api/user/4')
        .set('x-access-token', signinUser2.token)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.message).toEqual('User profile deleted successfully');
          done();
        });
    });
  });
});
