const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader'],
};

const css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [pug, css],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
      inject: 'body',
      minify: /staging/.test(process.env.NODE_ENV),
    }),
  ],
};
module.exports = config;
