/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { merge } = require('webpack-merge');
const development = require('./webpack.dev');
const pwaPlugin = require('./pwa/pwa-plugin');

module.exports = merge(development, {
    entry: {
        sw: resolve(__dirname, 'src/sw.ts'),
        main: resolve(__dirname, 'src/index.ts')
    },
    plugins: [
        ...pwaPlugin
    ],
});
