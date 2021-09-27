const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//打包抽离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩css
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
//将静态资源复制到dist中
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const rootDir = process.cwd(); //返回 Node.js 进程的当前工作目录
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(rootDir, "dist"),
    filename: "bundle.[contenthash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                compileType: "module",
                localIdentName: "[local]__[hash:base64:5]",
              },
            },
          },
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|webp|svg|svg|eot|ttf|woff|woff2)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "./public/index.html"),
      inject: "body",
      scriptLoading: "blocking",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "*.js",
          context: path.resolve(rootDir, "public/js"),
          to: path.resolve(rootDir, "dist/js"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new OptimizeCssPlugin(),
  ],
};
