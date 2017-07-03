const faker = require('faker');
const config = require('./config');

const firstname = faker.name.findName();
const lastname = faker.name.findName();
const username = faker.name.findName();
const password = 'password';
const email = faker.name.findName();

module.exports = {
  'Disallow signup without correct details': browser =>
    browser
      .url('http://localhost:8080/signup')
      .waitForElementVisible('body', 20000)
      .waitForElementVisible('input[name=firstname]', 1000)
      .setValue('input[name=firstname]', '')
      .waitForElementVisible('input[name=lastname]', 1000)
      .setValue('input[name=lastname]', '')
      .waitForElementVisible('input[name=username]', 1000)
      .setValue('input[name=username]', '')
      .waitForElementVisible('input[name=password]', 1000)
      .setValue('input[name=password]', '')
      .waitForElementVisible('input[name=confirmPassword]', 1000)
      .setValue('input[name=confirmPassword]', '')
      .waitForElementVisible('button[name=signup]', 1000)
      .click('button[name=signup]')
      .waitForElementVisible('form', 1000)

      .url('http://localhost:8080/signup')
      .waitForElementVisible('body', 20000)
      .waitForElementVisible('input[name=firstname]', 1000)
      .setValue('input[name=firstname]', firstname)
      .waitForElementVisible('input[name=lastname]', 1000)
      .setValue('input[name=lastname]', lastname)
      .waitForElementVisible('input[name=username]', 1000)
      .setValue('input[name=username]', username)
      .waitForElementVisible('input[name=email]', 1000)
      .setValue('input[name=email]', email)
      .waitForElementVisible('input[name=password]', 1000)
      .setValue('input[name=password]', password)
      .waitForElementVisible('input[name=confirmPassword]', 1000)
      .setValue('input[name=confirmPassword]', password)
      .waitForElementVisible('button[name=signup]', 1000)
      .click('button[name=signup]')
      .waitForElementVisible('form', 1000)
      .end()
};
