const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  cache: {
    type: "memory",
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: "3000",
    hot: true,
    compress: true, //是否启用gzip压缩
    proxy: {
      "/api": {
        target: "http://0.0.0.0:80",
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
});
