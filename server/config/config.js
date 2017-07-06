/* eslint-disable */

// load environmental variables
require('dotenv').config();

// CONFIG FOR TRAVIS
// test: {
//   use_env_variable: 'DATABASE_TEST_URL',
//   dialect: 'postgres',
//   logging: false
// },

module.exports = {
  development: {
    username: 'mai',
    password: 'mai',
    database: 'maidocsdev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  tests: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres',
    logging: false
  },
<<<<<<< HEAD
  tests: {
=======
  test: {
>>>>>>> a46700e42c2a67765ecffc5c02cfc79a9527abcf
    username: 'mai',
    password: 'mai',
    database: 'maidocstest',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};
