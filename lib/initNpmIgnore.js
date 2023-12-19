const fs = require("fs");

// 创建 .npmignore 文件
const createNpmIgnoreFile = () => {
  const ignoreItems = ["node_modules", "DEMO"];
  const data = ignoreItems.join("\n");
  fs.writeFileSync(".npmignore", data);
};
module.exports = createNpmIgnoreFile;
