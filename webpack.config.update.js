// webpack.config.update.js
const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");
module.exports = function update(webpackConfig) {
  console.log("current env", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    webpackConfig.plugins[7].options.include = /\.js$/;
    webpackConfig.plugins.push(
      new webpack.BannerPlugin({
        banner: `com.muxistudio.info, version ${package.version}, built time: ${Date()}`
      })
    );
  }

  return webpackConfig;
};
