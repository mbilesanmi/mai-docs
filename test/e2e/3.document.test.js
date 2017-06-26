const faker = require('faker');
const config = require('./config');

const loginId = 'mai';
const password = 'password';

module.exports = {
  'Click add new document button': browser => {
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
      .waitForElementVisible('.addDocument', 5000)
      .click('.addDocument')
      .assert.urlEquals('http://localhost:8080/document')

      .waitForElementVisible('input[name=title]', 1000)
      .setValue('input[name=title]', 'E2E Test')
      .waitForElementVisible('select[name=access]', 1000)
      .setValue('select[name=access]', 'Public')
      .waitForElementVisible('div', 'fr-element')
      .waitForElementVisible('div', 'fr-view')
      .setValue('div.fr-element', faker.lorem.paragraph())
      .waitForElementVisible('#saveDocument', 1000)
      .click('#saveDocument')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.containsText('.toast-message', 'Document saved successfully')

      .waitForElementVisible('.dashboard', 5000)
      .assert.urlEquals('http://localhost:8080/dashboard')
      .waitForElementVisible('.docTitle', 5000)
      .click('.docTitle')
      .waitForElementVisible('h3', 5000)
      .assert.containsText('h3', 'E2E Test')
      .waitForElementVisible('.toDashboard', 3000)
      .click('.toDashboard')

      .waitForElementVisible('.dashboard', 5000)
      .assert.urlEquals('http://localhost:8080/dashboard')
      .waitForElementVisible('.editDoc', 5000)
      .click('.editDoc')
      .waitForElementVisible('input[name=title]', 1000)
      .waitForElementVisible('select[name=access]', 1000)
      .setValue('select[name=access]', 'Public')
      .waitForElementVisible('div', 'fr-element')
      .waitForElementVisible('div', 'fr-view')
      .waitForElementVisible('#saveDocument', 1000)
      .click('#saveDocument')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.containsText('.toast-message', 'Document successfully updated')
      .waitForElementVisible('.dashboard', 10000)
      .assert.urlEquals('http://localhost:8080/dashboard')
      .end();
  }
};
