const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules|test)/
      }
    ]
  },
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'window'
  }
}