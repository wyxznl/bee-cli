const path = require("path");
const fs = require("fs");

// 创建并初始化 package.json 文件
const initPackage = function (componentName) {
  // TODO -- 是不是应该去数据库中取？
  const obj = { id: 1 };
  const prefix = Buffer.from(JSON.stringify(obj)).toString("base64");

  var data = {
    buildOptions: {
      op: 0,
    },
    name: `@sfe/montage.${componentName}.${prefix}`,
    virtualId: `${componentName}.${prefix}`,
    _isCreate: true,
  };
  fs.writeFileSync("package.json", JSON.stringify(data, null, 2));
};

// 选择入口文件后，更新package.json文件
function updateByEntry(selectedEntryFile, componentName) {
  try {
    let packageData = fs.readFileSync("package.json", "utf8");
    packageData = JSON.parse(packageData);
    const updateEntryFileData = {
      _entry: selectedEntryFile,
      main: `dist/${componentName}.umd.js`,
      version: "1.0.0",
      browserslist: {
        production: [">0.2%", "not dead", "not op_mini all"],
        development: [],
      },
      componentName,
    };
    packageData = { ...packageData, ...updateEntryFileData };
    fs.writeFileSync("package.json", JSON.stringify(packageData, null, 2));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  init: initPackage,
  updateByEntry,
};
