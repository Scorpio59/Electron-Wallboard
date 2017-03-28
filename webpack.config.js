var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

// const production = process.argv.indexOf('-p') !== -1;

module.exports = {
  resolve: {
    modules: [
      './src',
      './node_modules'
    ],
    extensions: ['.js', '.vue', '.json'/*, '.css', '.node'*/],
    alias: { vue: 'vue/dist/vue.js' }
  },
  entry: {
    bundle: 'index.js'
    // main: production ? 'main.js' : 'main.dev.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      dry: true
    }),
    new WebpackNotifierPlugin({
      skipFirstNotification: true
      // alwaysNotify: true
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs'
      // excludeChunks: ['main']
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.resolve(__dirname, 'app/src/renderer')],
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
        enforce: 'pre',
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader'

        }
      },
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
    ]
  },
  devtool: 'cheap-eval-source-map',
  watchOptions: {
    ignored: /node_modules|resources|\.git|\.vscode/
  },
  target: 'electron'
};
