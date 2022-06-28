const path = require('path');
const express = require('express');
const webpackConfig = require('./config/webpack.dev.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const compiler = webpack(webpackConfig);
const env = process.env.NODE_ENV;
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const portfinder = require('portfinder');
const DIST_DIR = webpackConfig.output.path;
const options = {
  target: 'http://172.16.24.193/',
  changeOrigin: true,
  ws: false,
  pathRewrite: {
    '^/api': '/',
  },
};
const subAppProxy = {
  target: 'http://192.168.66.59:5000/',
  changeOrigin: true,
  ws: false,
  pathRewrite: {
    '^/sub': '/',
  },
};
const testProxy = createProxyMiddleware(options);
app.use('/api', testProxy);
const subProxy = createProxyMiddleware(subAppProxy);
app.use('/sub', subProxy);
portfinder
  .getPortPromise()
  .then((port) => {
    const server = app.listen(port, '0.0.0.0', () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log('本地服务已启动： http://%s:%s', host, port);
    });
  })
  .catch((err) => {
    console.log('Could not get a free port');
    //
    // Could not get a free port, `err` contains the reason.
    //
  });

if (env === 'development') {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: '*',
        },
      ],
    }),
  );
  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }),
  );
  app.get('*', (req, res, next) => {
    const filename = path.join(DIST_DIR, 'index.html');
    res.set('content-type', 'text/html');
    // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.send(result);
      res.end();
    });
  });
}
