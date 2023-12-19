const fs = require("fs");
const inquirer = require("inquirer");
// 询问用户入口文件是什么
const files = [];
function getAllFileFromPath(path) {
  const res = fs.readdirSync(path);
  for (let subPath of res) {
    const statObj = fs.statSync(path + "/" + subPath);
    if (statObj.isDirectory()) {
      console.log("Dir:" + subPath);
      getAllFileFromPath(path + "/" + subPath);
    } else {
      files.push(subPath);
    }
  }
}
// 与用户交互
async function promptForFile() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "file",
      message: "请选择组件入口文件",
      choices: files,
    },
  ]);
  // console.log("你选择的文件是：", answers.file);
  return answers.file;
}

async function main(curComponentPath) {
  getAllFileFromPath(curComponentPath);
  const res = await promptForFile();
  return res
}
module.exports = main
