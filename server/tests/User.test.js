import expect from 'expect';
import request from 'supertest';
// const request = require('supertest');
// import express from 'express';
import server from '../../tools/srcServer';
import user from './helper/Users';
// const env = process.env.NODE_ENV || 'test';
// const config = require('../config/config.json')[env];

// const sequelize = new Sequelize(, {logging: false});
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

const app = request(server);

describe('Mai Docs ', () => {
  it('should create and return a userId and roleId', (done) => {
    app
      .post('/api/users/')
      .send(user.superUser)
      .end((error, response) => {
        // console.log('cghcmghmhgchchgfh', response.body);
        expect(response.body).toBe('object');
        // response.body.should.have.property('id');
        // (response.body.roleId === '1').should.equal(true);
        done();
      });
  });
});
