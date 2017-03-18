var path = require('path');
//var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  resolve: {
    modules: [
      './app/src',
      './node_modules',
    ],
    extensions: ['.js', '.vue', '.json'/*, '.css', '.node'*/],
    alias: {vue: 'vue/dist/vue.js'}
  },
  entry: {
    index: 'index.js'
  },
  output: {
    filename: 'bundle.js',
    path: 'app/dist'
  },
  plugins: [
    new CleanWebpackPlugin(['app/dist'], {
      dry: true
    }),
    new WebpackNotifierPlugin({
      skipFirstNotification: true,
      alwaysNotify: true
    }),
    /*new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })*/
  ],
  module: {
    rules: [
/*
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
*/
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [ path.resolve(__dirname, 'app/src/renderer') ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
/*
      {
        test: /\.node$/,
        use: 'node-loader'
      },
*/
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ],
  },
  devtool: "cheap-eval-source-map",
  watchOptions: {
    ignored: /node_modules|resources|\.git|\.vscode/
  },
  target: 'electron'
};
