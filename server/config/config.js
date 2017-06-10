// require('dotenv').config();

module.exports = {
  development: {
    username: 'mai',
    password: 'Adetomiwa1234',
    database: 'maidocs-dev',
    dialect: 'postgres',
    logging: false
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'mai',
    password: 'Adetomiwa1234',
    database: 'maidocs-prod',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};

// {
//   "development": {
//     "username": "mai",
//     "password": "Adetomiwa1234",
//     "database": "maidocs-dev",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "mai",
//     "password": "Adetomiwa1234",
//     "database": "maidocs-test",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres",
//     "logging": false
//   },
//   "production": {
//     "username": "mai",
//     "password": "Adetomiwa1234",
//     "database": "maidocs-prod",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres"
//   }
// }