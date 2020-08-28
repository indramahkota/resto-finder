/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:31:52
 * @modify date 2020-08-28 22:38:23
 * @desc [description]
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackInjector = require("html-webpack-injector");

const webcomponentsjs = "node_modules/@webcomponents/webcomponentsjs";

module.exports = {
  entry: {
    cElEs5Adapter_head: resolve(
      __dirname,
      `${webcomponentsjs}/custom-elements-es5-adapter.js`
    ),
    cElEsOlderBrowser_head: resolve(
      __dirname,
      `${webcomponentsjs}/webcomponents-loader.js`
    ),
    bundle: resolve(__dirname, "src/index.js"),
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.css|\.s([ca])ss$/,
        exclude: resolve(__dirname, "src/styles"),
        use: [
          {
            loader: "lit-scss-loader",
            options: {
              minify: true,
            },
          },
          "extract-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css|\.s([ca])ss$/,
        exclude: resolve(__dirname, "src/scripts/components"),
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpe?g|gif|webp|ico|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "assets/[name].[contenthash:8].[ext]" },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, "public/index.html"),
      inject: true,
      chunks: ["cElEs5Adapter_head", "cElEsOlderBrowser_head", "bundle"],
      minify: { collapseWhitespace: true, removeComments: true },
    }),
    /* inject script di head atau body dengan menambahkan suffix _head */
    new HtmlWebpackInjector(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, "public/"),
          to: resolve(__dirname, "dist/"),
        },
      ],
    }),
  ],
};
