const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "alias",
    message:
      "请输入别名，多个别名请以英文逗号分隔（如：@,@lib,@common,@component）：",
  },
];

const inputAlias = async function () {
    const answer = await inquirer.prompt(questions)
    return answer.alias
};
module.exports = inputAlias;
