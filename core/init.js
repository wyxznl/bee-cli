const path = require("path");
const initGitIgnore = require("../lib/initGitIgnore");
const initNpmIgnoreFile = require("../lib/initNpmIgnore");
const updatePackage = require("../lib/updatePackage");
const selectEntryFile = require("../lib/selectEntryFile");
const selectFramework = require("../lib/selectFramework");
const inputFrameVersion = require("../lib/inputFrameVersion");
const selectFeature = require("../lib/selectFeature");
const updateBabelRc = require("../lib/updateBabelRc");
const updateTsConfig = require("../lib/updateTsConfig");
const inputAlias = require("../lib/inputAlias");
const selectAliasDirectory = require("../lib/selectAliasDirectory");
const importDependencies = require("../lib/importDependencies");

const curComponentPath = process.cwd();
const componentName = path.basename(curComponentPath);

async function main() {
  // TODO登录
  // 初始化 .gitignore 文件
  initGitIgnore();
  // 初始化 .npmignore 文件
  initNpmIgnoreFile();
  // 初始化 package.json 文件
  updatePackage.init(componentName);
  // 选择入口文件
  const selectedEntryFile = await selectEntryFile(curComponentPath);
  // 根据入口文件更新 package.json 文件
  updatePackage.updateByEntry(selectedEntryFile, componentName);
  // 选择框架
  const curFrame = await selectFramework();
  let curFrameVersion = "";
  // 如果选择的框架是 vue 或 React，那么需要输入框架的版本
  if (curFrame === "vue框架" || curFrame === "React框架") {
    curFrameVersion = await inputFrameVersion(curFrame);
  }
  // 选择特性
  const curSelectedFeature = await selectFeature();
  // 打印选择的框架版本和特性
  console.log(curFrameVersion, curSelectedFeature, "curFrameVersion");
  // 更新 .babelrc 文件
  const devDepencies = updateBabelRc(curSelectedFeature);
  // 输入别名
  const curAliases = await inputAlias();
  // 选择别名目录
  const aliasDirArr = await selectAliasDirectory(curComponentPath, curAliases);
  console.log(aliasDirArr, "curAliases");
  // 导入依赖
  importDependencies(aliasDirArr, curComponentPath);

  // 更新引用处的路径
  // 增加webpack配置
  // 自动编译
  // 上传git

  //   // 根据选择的特性更新 package.json 文件
  //   updatePackage.updateByFeature();
  //   // 如果选择了 TypeScript 特性，那么需要更新 tsconfig.json 文件
  //   curSelectedFeature.includes("TypeScript") && updateTsConfig();
}
main();
