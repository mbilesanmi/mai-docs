const express = require('express');
const webpack = require('webpack');
const path = require('path');
const open = require('open');
const colors = require('colors');
const logger = require('morgan');
const bodyParser = require('body-parser');

import config from '../webpack.config.prod';
import serverRoutes from '../server/routes/index';

/* eslint-disable no-console */

const app = express();

let port;

if (process.env.NODE_ENV === 'test') {
  port = 3003;
} else {
  port = process.env.PORT || 3002;
}

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'));

serverRoutes(app);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Express prod server is up on port ${port}`.blue);
  }
});

module.exports = app;
