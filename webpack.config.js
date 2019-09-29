const path = require('path')

module.exports = {
  entry: './src/index.js',
  // mode: 'development',
  mode: 'production',

  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules|test)/
      }
    ]
  },
  // resolve: {
  //   extensions: [ '.ts' ]
  // },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd'
  }
}