/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css|\.s([ca])ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
});
