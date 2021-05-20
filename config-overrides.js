const {
  override,
  fixBabelImports,
  addWebpackPlugin,
  addWebpackExternals
} = require("customize-cra");
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
    fixBabelImports("import", {
      libraryName: "antd",
      style: "css",
    }),
    fixBabelImports("antd-mobile", {
      libraryName: "antd-mobile",
      style: "css",
    }),
    addWebpackExternals(
        {
          // antd: 'antd',
          // '@antv': '',
          // moment: 'moment',
        }
    ),
    addWebpackPlugin(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static', //输出静态报告文件report.html，而不是启动一个web服务
        })
    ),
);
