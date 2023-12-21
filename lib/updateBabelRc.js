const fs = require("fs");
const path = require("path");

// 更新 .babelrc 文件的方法
function updateBabelRc(curSelectedFeature) {
  // 定义默认的 .babelrc 配置
  let babelConfig = {
    sourceType: "module",
    parserOpts: {
      plugins: ["jsx", "classProperties"],
    },
    presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };

  // 当 curSelectedFeature 包含 TypeScript 时，修改配置
  if (curSelectedFeature.includes("TypeScript")) {
    babelConfig.parserOpts.plugins.push("typescript");
  }

  // 当 curSelectedFeature 包含装饰器时，修改配置
  if (curSelectedFeature.includes("装饰器")) {
    babelConfig.parserOpts.plugins.push("decorators-legacy");
    babelConfig.plugins.unshift([
      "@babel/plugin-proposal-decorators",
      { legacy: true },
    ]);
  }

  // 将配置写入 .babelrc 文件
  fs.writeFileSync(
    path.join(process.cwd(), ".babelrc"),
    JSON.stringify(babelConfig, null, 2)
  );
}
module.exports = updateBabelRc;
