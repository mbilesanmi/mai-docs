import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import colors from 'colors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import serverRoutes from '../server/routes/index';
import config from '../webpack.config.dev';

const pathurl = path.join(__dirname + '/../server/routes/*.js');
console.log(pathurl);
/* eslint-disable no-console */

const app = express();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Mai Docs API Endpoints',
    version: '1.0.0',
    description: 'Describing the MaiDocs API Endpoints with Swagger',
  },
  host: 'localhost:3002',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: [pathurl],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const compiler = webpack(config);
let port;
if (process.env.NODE_ENV === 'test') {
  port = 3003;
} else {
  port = process.env.PORT || 3002;
}

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-hot-middleware')(compiler));
}

// app.use(express.static(path.join(__dirname, '/../dist/client/')))
// app.use('/bundle.js', )
app.use(express.static('dist'));
serverRoutes(app);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    if (process.env.NODE_ENV === 'development') {
      open(`http://localhost:${port}`);
    }
    console.log(`Express dev server is up on port ${port}`.blue);
  }
});

export default app;
