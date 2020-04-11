
const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './src/main.js',
    output: {
      path: path.resolve('dist'),
      filename: 'tessellator.js',
    },
    resolve: {
      extensions: ['.js'],
    },
  },
  {
    mode: 'development',
    entry: './src/main.js',
    output: {
      path: path.resolve('dist'),
      filename: 'tessellator.es.js',
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
    },
    resolve: {
      extensions: ['.js'],
    },
  },
]