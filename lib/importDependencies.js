const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;

function copyFileToRoot(filePath, projectRoot) {
  const absolutePath = path.resolve(projectRoot, filePath);
  const newDir = path.join(projectRoot, "outfiles");
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir);
  }
  const suffix = absolutePath.split("/").slice(-2).join("-");
  const newFilePath = path.join(newDir, suffix);
  fs.writeFileSync(newFilePath, fs.readFileSync(absolutePath, "utf-8"));
}

function processFile(filePath, projectRoot) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // console.log(fileContent, "filecccc=====");
  const ast = babylon.parse(fileContent, {
    sourceType: "module",
    plugins: ["js", "jsx", "typescript", "classProperties"],
  });
  // console.log(ast, "aaasssttt====");

  traverse(ast, {
    ImportDeclaration(pathNode) {
      const { node } = pathNode;
      const importPath = node.source.value;
      if (isExternalDependency(importPath)) {
        addDependencyToPackageJson(importPath, projectRoot);
      } else {
        const dirPath = path.dirname(filePath);
        const absolutePath = path.join(dirPath, importPath);
        console.log(filePath, importPath, absolutePath, "path===nnn55566");
        copyFileToRoot(absolutePath, projectRoot)
        processFile(absolutePath, projectRoot);
      }
    },
  });
}

function isExternalDependency(importPath) {
  return !importPath.startsWith(".") && !path.isAbsolute(importPath);
}

function addDependencyToPackageJson(dependency, projectRoot) {
  console.log(projectRoot, "projectRoot===");
  const packageJsonPath = path.join(projectRoot, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  if (!packageJson.dependencies[dependency]) {
    packageJson.dependencies[dependency] = "latest";
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
}

function importDependencies(aliasDirArr, projectRoot) {
  aliasDirArr.forEach((item) => {
    copyFileToRoot(item, projectRoot);
    processFile(item, projectRoot);
  });
}

// const test = [
//   "/Users/wangyaxin/Documents/montage/bee-examples/src/common/util/index.js",
// ];
// importDependencies(test);
module.exports = importDependencies;
