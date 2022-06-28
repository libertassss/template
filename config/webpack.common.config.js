const env = process.env.NODE_ENV;
const PUBLIC_PATH = env === 'development' ? '/' : '/sub/child/template'; // 基础路径
const path = require('path');
const packageName = require('../package.json').name;
module.exports = {
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/[name].[contenthash].js',
    publicPath: PUBLIC_PATH,
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: path.join(__dirname, '../src'),
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'images/[name][ext]', // 单独指定 名字
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.join(__dirname, '../src'),
    },
    symlinks: false,
  },
};
