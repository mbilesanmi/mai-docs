import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import store from './store/configureStore';
import routes from './routes.jsx';
import setAuthorizationToken from './utils/authenticate';
import { setCurrentUser, getAllUsers } from './actions/userActions';
import { getAllDocuments } from './actions/documentActions';
import { getAllRoles } from './actions/roleActions';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/sweetalert/dist/sweetalert.css';
import '../node_modules/toastr/build/toastr.min.css';

const userToken = localStorage.maiDocsJwtToken;

if (userToken) {
  setAuthorizationToken(userToken);
  axios.defaults.headers.common.Authorization = userToken;
  store.dispatch(setCurrentUser(jwtDecode(userToken)));
  // store.dispatch(getAllDocuments());
  store.dispatch(getAllRoles());
  // store.dispatch(getAllUsers());
}

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  app
);
