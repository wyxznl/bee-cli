const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

// 创建 .gitignore 文件
const initGitIgnoreData = `node_modules
package.json
package-lock.json
README.md
ironcode.json
DEMO`;
fs.writeFileSync(".gitignore", initGitIgnoreData);

// 创建 .npmignore 文件
const initNpmIgnoreData = `
node_modules
DEMO
`;
fs.writeFileSync(".npmignore", initNpmIgnoreData);

// 创建并初始化 package.json 文件
const curComponentPath = process.cwd();
const componentName = path.basename(curComponentPath);
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
getAllFileFromPath(curComponentPath);
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
  console.log("你选择的文件是：", answers.file);
}

promptForFile();
