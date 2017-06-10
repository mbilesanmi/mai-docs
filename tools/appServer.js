require('dotenv').config();
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import logger from 'morgan';
import bodyParser from 'body-parser';
import serverRoutes from '../server/routes/index';
import config from '../webpack.config';


/* eslint-disable no-console */

const port = 3002;
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

serverRoutes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
    console.log(`Express server is up on port ${port}`);
  }
});

export default app;
