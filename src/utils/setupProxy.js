const { createProxyMiddleware } = require("http-proxy-middleware");
const { BASE_URL } = require("./config");

module.exports = function (app) {
  app.use(
    "/api", 
    createProxyMiddleware({
      target:`${BASE_URL}`,
      changeOrigin: true,
    })
  );
};