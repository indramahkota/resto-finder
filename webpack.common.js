/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:31:52
 * @modify date 2020-09-06 15:18:02
 * @desc [description]
 */
const { resolve } = require("path");
const { minify } = require("terser");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webcomponents_vendor_url = "node_modules/@webcomponents/webcomponentsjs";
const fileToCopy = [
  {
    from: resolve(`${webcomponents_vendor_url}/custom-elements-es5-adapter.js`),
    to: 'static/vendors',
    flatten: true,
    transform: function (fileContent) {
      return minify(fileContent.toString()).code;
    }
  },
  {
    from: resolve(`${webcomponents_vendor_url}/webcomponents-loader.js`),
    to: 'static/vendors',
    flatten: true,
    transform: function (fileContent) {
      return minify(fileContent.toString()).code;
    }
  }
];

module.exports = {
  entry: resolve(__dirname, "src/index.ts"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css|\.s([ca])ss$/,
        exclude: resolve(__dirname, "src/styles"),
        use: [
          {
            loader: "lit-scss-loader",
            options: {
              minify: true
            }
          },
          "extract-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css|\.s([ca])ss$/,
        exclude: resolve(__dirname, "src/scripts/components"),
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpe?g|gif|webp|ico|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "static/images/[name].[contenthash:8].[ext]" }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, "src/index.html"),
      minify: { collapseWhitespace: true, removeComments: true }
    }),
    new CopyWebpackPlugin({
      patterns: [
        ...fileToCopy,
        {
          from: resolve(__dirname, "public/"),
          to: resolve(__dirname, "dist/")
        }
      ]
    })
  ]
};
