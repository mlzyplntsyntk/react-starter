var WrapperPlugin = require('wrapper-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {

  entry: './src/app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'es2016', 'react']
        }
      }
    ]
  },
  plugins: [
    // strict mode for the whole bundle,
    //new UglifyJsPlugin(),
    new WrapperPlugin({
      test: /\.js$/, // only wrap output of bundle files with '.js' extension
      header: 'var appLoader = function() {\n',
      footer: '\n};'
    })
  ]
};
