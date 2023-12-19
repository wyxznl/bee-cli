const inquirer = require("inquirer");

module.exports = function inputFrameVersion(curFrame) {
  const defaultVersion = curFrame.includes("React") ? "17.0.2" : "2.6.11";
  return inquirer
    .prompt([
      {
        type: "input",
        name: "version",
        message: `请输入${curFrame}版本号`,
        default: defaultVersion,
      },
    ])
    .then((answers) => answers.version);
};
