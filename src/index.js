import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes.jsx';
import { setDefaultHeader } from './utils/helper';

import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/sweetalert/dist/sweetalert.css';

import '../dist/css/style.scss';
import './styles/style.scss';


// Require Editor CSS files.
import '../node_modules/froala-editor/css/froala_style.min.css';
import '../node_modules/froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import '../node_modules/font-awesome/css/font-awesome.css';

setDefaultHeader(window.localStorage.getItem('maiDocsJwtToken'));

const app = document.getElementById('app');

/**
 * React Render
 * @return {object} html
 */
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  app
);
