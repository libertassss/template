
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.config');
const PUBLIC_PATH = './'
module.exports = merge(commonConfig,{
    entry: path.join(__dirname, '../app.tsx'),
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'static/[name].[contenthash].js',
        publicPath: PUBLIC_PATH
    },
    module: {
        rules: [
            {
                test: /\.(less|css)/,
                use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ]
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
})