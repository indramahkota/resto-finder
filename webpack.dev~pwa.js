/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge');
const development = require('./webpack.dev');
const pwaPlugin = require('.pwa/pwa-plugin.js');

module.exports = merge(development, {
    entry: {
        sw: resolve(__dirname, 'src/sw.ts'),
        main: resolve(__dirname, 'src/index.ts')
    },
    plugins: [
        ...pwaPlugin
    ],
});
