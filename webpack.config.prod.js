/* eslint camelcase: 0 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');


const BUILD_PATH = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './client');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: path.resolve(__dirname, 'client/index')
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx'],
    alias: {
      jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
    }
  },
  plugins: [
    new ExtractTextPlugin('./client/styles/styles.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    })
  ],
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
        loaders: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
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
