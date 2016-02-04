var commonConfig = require('./webpack-common.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');


var prodLoaders = [
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader - without the react-hot loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel'],
  }
]

module.exports = {
  entry: [
  // our entry file
  './app/main.js'
  ],
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  devtool:'source-map',
  devServer: {
    // proxy calls to api to our own node server backend
    proxy: {
      '/api/*': 'http://localhost:5000/'
    }
  },
  module: {
    loaders: commonConfig.loaders.concat(prodLoaders)
  },
  plugins: [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
  commonConfig.indexPagePlugin
  ],
};
