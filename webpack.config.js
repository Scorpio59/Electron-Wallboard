var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    modules: [
      './src',
      './node_modules',
    ],
    alias: {vue: 'vue/dist/vue.js'}
  },
  entry: {
    index: 'index.js',
    main: 'main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [], //new HtmlWebpackPlugin()
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }],
    }]
  },
  devtool: "cheap-eval-source-map",
  target: 'electron'
};
