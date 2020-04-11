
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve('dist'),
    path: __dirname + "/dist",
    filename: 'tessellator.js',
    // libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js'],
  },
}