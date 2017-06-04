import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes.jsx';
// import * as courseActions from './actions/courseActions';
// import  * as roleActions from './actions/roleActions';
// import * as documentActions from './actions/documentActions';
// import * as userActions from './actions/userActions';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/toastr/build/toastr.min.css';


// const initialState = [];
// const store = configureStore(initialState);
const store = configureStore();

// store.dispatch(courseActions.loadCourses());

// store.dispatch(roleActions.getAllRoles());

// store.dispatch(roleActions.createRole());

// store.dispatch(documentActions.getAllDocuments());

// store.dispatch(userActions.getAllUsers());

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  app
);
