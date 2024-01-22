const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;

function processFile(filePath, projectRoot) {
  const code = `
  import { message } from 'antd';
import iframeBridge from './iframeBridge.js'

// 页面跳转通用方法
export const goPageClick = (buttonUrl) => {
    fetch(buttonUrl, {
        method: 'GET',
        mode: 'no-cors'
    }).then(function (res) {
        if (/(meituan)|(sankuai)|(dianping)|(dpurl)/.test(buttonUrl)) {
            iframeBridge.jumpTo({
                isMsg: true,
                href: buttonUrl
            })
            // jumpTo('/v2/shop/msgbox/wrap?redirect=' + encodeURIComponent(url))
        } else {
            window.open(buttonUrl, '_blank')
        }

    })
        .catch(e => {
            console.log('e', e)
            message.error('当前跳转链接无法访问')
        })
}

export const sayHello = () => {
    alert('hello!')
}`;

  // const ast111 = babylon.parse(code, { sourceType: "module" });

  // console.log(ast111, "ast111");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // console.log(fileContent, "filecccc=====");
  const ast = babylon.parse(fileContent, {
    sourceType: "module",
    plugins: ["js", "jsx", "typescript", "classProperties"],
  });
  // console.log(ast, "aaasssttt====");

  traverse(ast, {
    ImportDeclaration(path) {
      const { node } = path
      const importPath = node.source.value;
      console.log(importPath, 'path===nnn55566')

      if (isExternalDependency(importPath)) {
        console.log('xxxxxyyy')
        addDependencyToPackageJson(importPath);
      } else {
        const dirName = path.dirname(filePath);
        const resolvedPath = require.resolve(path.join(dirName, importPath), {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        });
        processFile(resolvedPath);
      }
    },
  });
}

function isExternalDependency(importPath) {
  return !importPath.startsWith(".") && !path.isAbsolute(importPath);
}

function addDependencyToPackageJson(dependency, projectRoot) {
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

function importDependencies(aliasDirArr) {
  aliasDirArr.forEach((item) => {
    processFile(item);
  });
}

const test = [
  "/Users/wangyaxin/Documents/montage/montage-open-developer-com-repo/src/common/util/index.js",
];
importDependencies(test);
