const express = require('express');
const webpack = require('webpack');
const path = require('path');
const open = require('open');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('../webpack.config');

/* eslint-disable no-console */

// const port = process.env.PORT || 3001;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(require('webpack-hot-middleware')(compiler));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  })
});

export default app;
