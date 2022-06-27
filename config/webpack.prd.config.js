const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.config');
const { name } = require('./package');
module.exports = merge(commonConfig, {
  entry: path.join(__dirname, '../app.tsx'),
  output: {
    library: `${name}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${name}`,
    globalObject: 'window',
  },
  module: {
    rules: [
      {
        test: /\.(less|css)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.less'), // 匹配.less文件来进行css模块化。
                localIdentName: '[local]_[hash:base64:10]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: `index.html`,
      chunks: `[name]`,
      inject: true,
    }),
    new MiniCssExtractPlugin({
      // 类似于 webpackOptions.output 中的选项
      // 所有选项都是可选的
      filename: 'static/[name].[contenthash].css',
      chunkFilename: 'static/[id].[contenthash].css',
    }),
  ],
});
