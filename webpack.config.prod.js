const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');

const BUILD_PATH = path.resolve(__dirname, 'dist');
const APP_DIR = `${path.resolve(__dirname)}/app`;

export default {
  debug: true,
  devtool: 'cheap-eval-source-map',
  noInfo: false,
  entry: `${__dirname}/client/index.js`,
  target: 'web',
  output: {
    path: `${__dirname}/dist/client`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('style.css'),
    new BabiliPlugin()
  ],
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, include: path.join(__dirname, 'client'), loaders: ['babel'] },
      { test: /\.scss$/i, loader: ExtractTextPlugin.extract(['css', 'autoprefixer', 'sass']) },
      { test: /\.json$/, loader: 'json' },
      {
        test: /(\.css)$/,
        loaders: ['style', 'css']
      },
      { test: /\.(jpg|png|svg)$/, loader: 'url' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
