const inquirer = require("inquirer");
// 选择框架
const frameList = ["Vue框架", "React框架", "无框架"];
async function selectFramework() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "frame",
      message: "请选择框架",
      choices: frameList,
    },
  ]);
//   console.log("你选择的框架是：", answers);
  return answers.frame;
}
module.exports = selectFramework;
