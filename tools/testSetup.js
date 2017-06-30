require('babel-register')();

const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document', 'node'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) =>  {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

if (!global.window.localStorage) {
  global.window.localStorage = {
    getItem(maiDocsJwtToken) { return undefined; },
    setItem() {},
    removeItem() { return undefined; },
  };
}
// global.document.URL = 'http//localHost';
const documentRef = document;
