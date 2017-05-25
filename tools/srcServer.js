import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from '../webpack.config';
import routes from '../server/routes/index';

/* eslint-disable no-console */

const port = process.env.PORT || 3001;
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


app.use(require('webpack-hot-middleware')(compiler, {
  publicPath: config.output.publicPath
}));
routes(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else if (process.env.NODE_ENV !== 'test') {
    open(`http://localhost:${port}`);
    console.log(`Express server is up on port ${port}`);
  }
});

export default app;
