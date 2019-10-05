const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

function applyProxy(port, context) {
  const pathRewrite = {};
  pathRewrite[`^/${context}`] = '';
  const myProxy = proxy(`/${context}`, {
    target: `http://localhost:${port}/`,
    changeOrigin: true,
    pathRewrite
  });
  app.use(myProxy);
}

function start(port, proxyMap) {
    Object.keys(proxyMap).forEach((port) => {
        applyProxy(port, proxyMap[port]);
      });
      
    app.listen(port);
}

module.exports = {
    start
}
