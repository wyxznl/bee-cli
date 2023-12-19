const path = require("path");
const initGitIgnore = require("../lib/initGitIgnore");
const initNpmIgnoreFile = require("../lib/initNpmIgnore");
const updatePackage = require("../lib/updatePackage");
const selectEntryFile = require("../lib/selectEntryFile");
const selectFramework = require("../lib/selectFramework");
const inputFrameVersion = require("../lib/inputFrameVersion");

const curComponentPath = process.cwd();
const componentName = path.basename(curComponentPath);

async function main() {
  // TODO登录
  initGitIgnore();
  initNpmIgnoreFile();
  updatePackage.init(componentName);
  const selectedEntryFile = await selectEntryFile(curComponentPath);
  updatePackage.updateByEntry(selectedEntryFile, componentName);
  const curFrame = await selectFramework();
  let curFrameVersion = "";
  if (curFrame === "vue框架" || curFrame === "React框架") {
    curFrameVersion = await inputFrameVersion(curFrame);
  }
  console.log(curFrameVersion, 'curFrameVersion')
}
main();
