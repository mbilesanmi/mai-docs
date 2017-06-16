import webpack from 'webpack';
import path from 'path';

const BUILD_PATH = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './client');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [`${APP_DIR}/index.js`],
  output: {
    path: BUILD_PATH,
    publicPath: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        include: [
          path.join(__dirname, 'client')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader'
      }
    ]
  }
};
