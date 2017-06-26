const faker = require('faker');
const config = require('./config');

const loginId = 'mai';
const password = 'password';
const email = 'email@email.com';

module.exports = {
  'Register a user': browser =>
    browser
      .url('http://localhost:8080/login')
      .waitForElementVisible('body', 20000)
      .waitForElementVisible('input[name=loginId]', 1000)
      .setValue('input[name=loginId]', loginId)
      .waitForElementVisible('input[name=password]', 1000)
      .setValue('input[name=password]', 'password')
      .waitForElementVisible('button[name=login]', 1000)
      .click('button[name=login]')
      .waitForElementVisible('.dashboard', 10000)
      .assert.urlEquals('http://localhost:8080/dashboard')
      .end()
};
