var testConfig = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [require('webpack-node-externals')()], // in order to ignore all modules in node_modules folder
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};
testConfig.resolve = require('./webpack.config.js').resolve;
testConfig.resolve.modules.push('test');
module.exports = testConfig;
