/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { merge } = require('webpack-merge');
const production = require('./webpack.prod');
const pwaPlugin = require('./pwa/pwa-plugin.js');

module.exports = merge(production, {
  entry: {
    sw: resolve(__dirname, 'src/sw.ts'),
    main: resolve(__dirname, 'src/index.ts')
  },
  plugins: [
    ...pwaPlugin
  ]
});
