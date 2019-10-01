const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const ts = {
  test: /\.ts(x)?$/,
  use: [
    {
      loader: 'ts-loader',
    },
  ],
};

const staticFiles = {
  test: /\.(ttf|png)$/,
  use:[
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        publicPath: '/static',
      }
    }
  ]
}

const config = {
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  module: {
    rules: [css, ts, staticFiles],
  },
  resolve: {
    extensions: [' ', '.js', '.jsx', '.ts', '.tsx'],
  },
};
module.exports = config;
