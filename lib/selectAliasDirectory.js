const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const inquirerFileTreeSelection = require("inquirer-file-tree-selection-prompt");

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

function findRootDirectory(curComponentPath) {
    while (curComponentPath !== path.resolve(curComponentPath, '..')) {
        if (fs.existsSync(path.resolve(curComponentPath, '.git'))) {
            return curComponentPath;
        }
        curComponentPath = path.resolve(curComponentPath, '..');
    }
    return null;
}

const selectAliasDirectory = async (curComponentPath, curAliases) => {
  const aliasesArr = curAliases.split(",");
  const len = aliasesArr.length;
  let result = [];
  const rootDir = findRootDirectory(curComponentPath);
  for (let i = 0; i < len; i++) {
    console.log(aliasesArr, aliasesArr[i], "hhhh000");
    const answer = await inquirer.prompt([
      {
        type: "file-tree-selection",
        name: "aliasDir",
        message: `请选择别名【${aliasesArr[i]}】所对应的目录`,
        root: rootDir,
      },
    ]);
    result.push(answer.aliasDir);
  }
  return result;
};

module.exports = selectAliasDirectory;
