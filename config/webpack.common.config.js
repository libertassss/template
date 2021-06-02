
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const env = process.env.NODE_ENV; 
const PUBLIC_PATH = env === 'development' ? "/" : 'http://172.17.15.172:5000'; // 基础路径
const path = require('path');
import { PORT } from '../server';
module.exports = {
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'static/[name].[contenthash].js',
        publicPath: PUBLIC_PATH
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                use: ['babel-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    name: "commons",
                    maxInitialRequests: 5,
                    minSize: 0, // 默认是30kb，minSize设置为0之后
                },
                reactBase: {
                    test: (module) => {
                      return /react|redux|prop-types/.test(module.context);
                    }, // 直接使用 test 来做路径匹配，抽离react相关代码
                    chunks: "initial",
                    name: "reactBase",
                    priority: 10,
                }
            }
        },
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.jsx', '.ts']
    },
    plugins: [
        new BundleAnalyzerPlugin({ analyzerPort: PORT})
    ]
}