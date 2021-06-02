
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(commonConfig, {
    mode: "development",
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', 
        path.join(__dirname, `../app.tsx`)
    ],
    module: {
        rules: [
            {
                test: /\.(less|css)/,
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, '../src/index.html')}),
        new webpack.HotModuleReplacementPlugin()
    ]
})