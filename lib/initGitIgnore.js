const fs = require("fs");
module.exports = function () {
  // 创建 .gitignore 文件
  const initGitIgnoreData = [
    "node_modules",
    "package.json",
    "package-lock.json",
    "README.md",
    "ironcode.json",
    "DEMO",
  ];
  try {
    fs.writeFileSync(".gitignore", initGitIgnoreData.join("\n"));
  } catch (err) {
    console.error("写入文件失败:", err);
  }
};
