import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import colors from 'colors';
import logger from 'morgan';
import bodyParser from 'body-parser';
// const serverRoutes = require('../server/routes');
import serverRoutes from '../server/routes';
const config = require('../webpack.config');

/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);
let port;
if (process.env.NODE_ENV === 'test') {
  port = 3003;
} else {
  port = process.env.PORT || 3002;
}

if (process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('webpack-hot-middleware')(compiler));


// console.log(typeof serverRoutes, serverRoutes);
serverRoutes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    if (process.env.NODE_ENV !== 'test') {
      open(`http://localhost:${port}`);
    }
    console.log(`Express server is up on port ${port}`.blue);
  }
});

export default app;
