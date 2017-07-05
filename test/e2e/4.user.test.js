const config = require('./config');

const loginId = 'mai';
const password = 'password';
const firstname = 'Maranatha A.';

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
      .pause(2000)
      .click('button[name=login]')
      .pause(2000)
      .waitForElementVisible('.dashboard', 10000)
      .assert.urlEquals('http://localhost:8080/dashboard')
      .waitForElementVisible('.editProfile', 5000)
      .click('.editProfile')
      .pause(2000)
      .waitForElementVisible('input[name=firstname]', 1000)
      .clearValue('input[name=firstname]')
      .setValue('input[name=firstname]', firstname)
      .waitForElementVisible('input[name=lastname]', 1000)
      .pause(2000)
      .click('button[name=updateProfile]')
      .pause(2000)
      .waitForElementVisible('.toast', 5000)
      .waitForElementVisible('.dashboard', 1000)
      .assert.urlEquals('http://localhost:8080/dashboard')
      .pause(5000)
      .end();
  }
};
