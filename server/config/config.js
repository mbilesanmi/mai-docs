require('dotenv').config();

module.exports = {
  development: {
    username: 'mai',
    password: 'Adetomiwa1234',
    database: 'maidocs-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DATABASE_URL_DEV,
    logging: false
  },
  production: {
    url: process.env.HEROKU_URL,
    port: 5432,
    dialect: 'postgres'
  }
};
