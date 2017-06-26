const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    //'webpack-dev-server/client?/'
    'webpack-hot-middleware/client?reload=true',
    './src/index.jsx'
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  devServer: {
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx?$/,
        use: ['babel-loader?presets[]=react,presets[]=es2015,plugins[]=transform-decorators-legacy'],
        exclude: [path.resolve(__dirname, 'node_modules/')]
      },
      {
        test: /\.scss|\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.(jpeg|jpg|jpe|png|gif|svg)$/i,
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
  },
  target: 'web',
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};
