/* eslint-disable */

// load environmental variables
require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: 'postgres',
    logging: false
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};
