const inquirer = require("inquirer");
const chalk = require("chalk");
const featuresList = ["TypeScript", "装饰器"];

const selectFeature = async () => {
  const answer = await inquirer.prompt([
    {
      type: "checkbox",
      name: "features",
      message:
        "请选择需要支持的特性",
      choices: featuresList,
    },
  ]);
  return answer.features;
};

module.exports = selectFeature;
