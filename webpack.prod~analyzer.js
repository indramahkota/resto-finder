/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge');
const production = require('./webpack.prod');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(production, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 'auto',
    }),
  ],
});
