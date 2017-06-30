/* eslint-disable */

// load environmental variables
require('dotenv').config();

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
  test: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};
