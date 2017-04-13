const path = require('path');
const buildConfig = require('./webpack.config.js');

const istanbulIncludes = [];
buildConfig.resolve.modules.forEach((relativePath) => {
  if (relativePath.indexOf('node_modules') === -1) {
    istanbulIncludes.push(path.resolve(relativePath));
  }
});

const testConfig = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [require('webpack-node-externals')()], // in order to ignore all modules in node_modules folder
  devtool: 'inline-cheap-module-source-map',
  resolve: buildConfig.resolve,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(js|ts)/,
        include: istanbulIncludes, // instrument only testing sources with Istanbul, after ts-loader runs
        loader: 'istanbul-instrumenter-loader',
        options: {
          esModules: true
        }
      }
    ]
  }
};
testConfig.resolve = require('./webpack.config.js').resolve;
testConfig.resolve.modules.push('test');
module.exports = testConfig;
