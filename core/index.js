#!/usr/bin/env node
const program = require("commander");

program
  .version(`bee ${require("../package.json")}.version`)
  .usage("<command> [options]");

program
  .command("publish") // config 命令
  .description("publish a component")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    // console.log(value, keys);
    require("./init");
  });

program.parse(process.argv);
