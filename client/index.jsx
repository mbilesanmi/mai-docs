import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import { reducer } from 'react-redux-sweetalert';
import configureStore from './store/configureStore';
import routes from './routes.jsx';
import setAuthorizationToken from './utils/authenticate';
import { setCurrentUser } from './actions/userActions';
// import { getAllDocuments } from './actions/documentActions';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/sweetalert/dist/sweetalert.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();

// store.dispatch(courseActions.loadCourses());

// store.dispatch(roleActions.getAllRoles());

// store.dispatch(roleActions.createRole());

// store.dispatch(getAllDocuments());

const userToken = localStorage.maiDocsJwtToken;

if (userToken) {
  setAuthorizationToken(userToken);
  axios.defaults.headers.common.Authorization = userToken;
  store.dispatch(setCurrentUser(jwtDecode(userToken)));
}

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  app
);
