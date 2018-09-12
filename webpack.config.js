const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 
module.exports = env => {
  return {
    entry: {
      app: './index.js',
      shotScreen: './src/webScripts/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist/web'),
      filename: '[name].js'
    },
    devServer: {
      contentBase: './dist/web'
    },
    plugins: [
      // new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({ template: './index.html' })
    ],
    mode: env.NODE_ENV == "production" ? "production" :"development"
  }
};