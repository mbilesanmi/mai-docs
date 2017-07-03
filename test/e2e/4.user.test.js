const config = require('./config');

const loginId = 'mai';
const password = 'password';
const firstname = '';

module.exports = {
  'Click edit profile button': browser => {
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
      .waitForElementVisible('.editProfile', 5000)
      .click('.editProfile')
      .waitForElementVisible('input[name=firstname]', 1000)
      .setValue('input[name=firstname]', firstname)
      .waitForElementVisible('input[name=lastname]', 1000)
      .waitForElementVisible('button[name=updateProfile]', 1000)
      .click('button[name=updateProfile]')
      .waitForElementVisible('.toast', 5000)
      .waitForElementVisible('.dashboard', 1000)
      .assert.urlEquals('http://localhost:8080/dashboard')
      .end();
  }
};
