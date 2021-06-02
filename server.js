const path = require('path');
const express = require('express');
const webpackConfig = require('./config/webpack.dev.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const  webpackHotMiddleware  = require('webpack-hot-middleware'); 
const webpack = require('webpack');
const compiler = webpack(webpackConfig);
const env = process.env.NODE_ENV; 
const app = express();
const PORT = 8881;
const DIST_DIR = webpackConfig.output.path;


if(env === 'development'){
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
    app.get('*', (req, res, next) => {
        const filename = path.join(DIST_DIR, 'index.html');
        // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    })
}
app.listen(PORT, () => {
    console.log('本地服务已启动： localhost:%s', PORT);
})