const {
  override,
  fixBabelImports,
} = require("customize-cra");
module.exports = override(
    fixBabelImports("import", {
      libraryName: "antd",
      style: "css",
    }),
    fixBabelImports("antd-mobile", {
      libraryName: "antd-mobile",
      style: "css",
    })
);
