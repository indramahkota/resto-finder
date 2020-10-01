/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { merge } = require('webpack-merge');
const production = require('./webpack.prod');
const pwaPlugin = require('./pwa/pwa-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

module.exports = merge(production, {
  entry: {
    main: resolve(__dirname, 'src/index.ts'),
    sw: resolve(__dirname, 'src/sw.ts')
  },
  plugins: [
    ...pwaPlugin,
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
  ]
});
