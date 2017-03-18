var path = require('path');
//var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  resolve: {
    modules: [
      './src',
      './node_modules',
    ],
    extensions: ['.js', '.vue', '.json'/*, '.css', '.node'*/],
    alias: {vue: 'vue/dist/vue.js'}
  },
  entry: {
    main: 'main/index.dev.js',
    renderer: 'renderer/index.js'
  },
  output: {
    filename: '[name].js',
    path: 'dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      dry: true
    }),
    new WebpackNotifierPlugin({
      skipFirstNotification: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
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
    ignored: /node_modules/
  },
  target: 'electron'
};
