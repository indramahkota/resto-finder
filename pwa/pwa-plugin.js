/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const workboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const PWAManifestData = require("./manifest-data.js");

module.exports = [
    new WebpackPwaManifest(PWAManifestData),
    new workboxPlugin.InjectManifest({
        swSrc: resolve(__dirname, 'manifest/service-worker.js'),
        swDest: 'sw.js',
        maximumFileSizeToCacheInBytes: 5000000
    })
];