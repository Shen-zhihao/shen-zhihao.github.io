<a name="IUrEH"></a>

# 1、脚手架开局

```javascript
全局安装create-react-app：
$ npm install -g create-react-app

创建一个项目：
$ create-react-app your-app 注意命名方式

Creating a new React app in /dir/your-app.

如果不想全局安装，可以直接使用npx：
$ npx create-react-app your-app	也可以实现相同的效果
```

<a name="OTXpV"></a>

# 2、0-1 手撸 webpack 开局

<a name="I70F6"></a>

## 初始化项目空间

```javascript
新建一个项目目录，在目录下执行：npm init -y
此时将会生成 package.json 文件
之后新建 src、config（配置webpack）文件夹，新建index.html文件
```

<a name="QFMdQ"></a>

## 安装 webpack 和 react 相关依赖文件

```bash
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader path -D
npm i react react-dom
```

<a name="Ix2VM"></a>

## 在 src 目录配置 index.js 文件

```javascript
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <div>你好，React-webpack5-template</div>
  </React.StrictMode>,
  document.getElementById("root")
);
```

<a name="wmaHZ"></a>

## 在 src 目录配置 index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-app</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

<a name="YcSXj"></a>

## 配置 config 中 webpack 配置文件

<a name="mB2NQ"></a>

##### 新建 webpack.base.conf.js 文件，部分代码仅供参考

```javascript
"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口起点
  entry: {
    app: "./src/index.js",
  },
  // 输出
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  // 解析
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@components": path.join(__dirname, "../src/components"),
      "@utils": path.join(__dirname, "../src/utils"),
      "@pages": path.join(__dirname, "../src/pages"),
    },
  },
  // loader
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/, // 屏蔽不需要处理的文件（文件夹）（可选）
        loader: "babel-loader",
      },
      {
        //支持less
        // npm install style-loader css-loader less-loader less --save-dev
        test: /\.(le|c)ss$/, // .less and .css
        use: ["style-loader", "css-loader", "less-loader"], // 创建的css文件存在html的头部
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      inject: "body",
      hash: false,
      minify: {
        collapseWhitespace: true, //把生成文件的内容的没用空格去掉，减少空间
      },
    }),
  ],
};
```

<a name="qDRrF"></a>

##### 新建 webpack.deve.conf.js 文件，部分代码仅供参考

```javascript
"use strict";
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(baseWebpackConfig, {
  // 模式
  mode: "development",
  // 调试工具
  devtool: "inline-source-map",
  // 开发服务器
  devServer: {
    static: path.resolve(__dirname, "static"),
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    compress: true, // 启用gzip压缩
    hot: true, // 模块热更新，取决于HotModuleReplacementPlugin
    host: "127.0.0.1", // 设置默认监听域名，如果省略，默认为“localhost”
    port: 8888, // 设置默认监听端口，如果省略，默认为“8080”
  },
  optimization: {
    nodeEnv: "development",
  },
});
```

<a name="IsHLl"></a>

##### 新建 webpack.prod.conf.js 文件

```javascript
"use strict";
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  // 模式
  mode: "production",
  // 调试工具
  devtool: "source-map",
  // 输出
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[chunkhash].js",
  },
  // 插件
  plugins: [new CleanWebpackPlugin()],
  // 代码分离相关
  optimization: {
    nodeEnv: "production",
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
});
```

<a name="nai57"></a>

## 新建.babelrc 文件

```javascript
{
  "presets": ["latest", "react", "stage-2"],
  "plugins": []
}
```

<a name="O08oZ"></a>

## 修改 package.json 中的 script 代码

```javascript
  "scripts": {
    "dev": "webpack-dev-server --hot  --config config/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "webpack --progress --colors --config config/webpack.prod.conf.js"
  },
```

<a name="JMqxA"></a>

## 此时，package.json 中部分代码如下

```javascript
{
  "name": "webpack-react-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --hot  --config config/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "webpack --progress  --config config/webpack.prod.conf.js"
  },
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-import": "^1.13.5",
    "babel-preset-latest": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "clean-webpack-plugin": "^4.0.0",
    "css-loader": "^6.7.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "less-loader": "^11.0.0",
    "node-less": "^1.0.0",
    "style-loader": "^3.3.1",
    "url-loader": "^4.1.1",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.10.1",
    "webpack-merge": "^5.8.0"
  },
  "dependencies": {
    "less": "^4.1.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^5.1.2"
  }
}
```

<a name="XMANx"></a>

## 在项目中添加代码规范检测

```bash
yarn add babel-eslint --save-dev
yarn add @umijs/fabric -D   //@umijs/fabric一个包含 prettier，eslint，stylelint 的配置文件合集。
yarn add prettier --save-dev  //默认@umijs/fabric已经给我们安装了需要的依赖，但是默认是没有pretter。
```

<a name="fJufe"></a>

## 新增如下文件（用于规范项目组代码）

<a name="toxL0"></a>

##### .eslintrc.js 文件

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  parser: "babel-eslint",
  globals: {
    gtag: true,
    $: true,
    _g_deflang: true,
    require: true,
    envConfig: true,
    process: true,
    React: true,
    ysf: true,
    initNECaptcha: true,
    initNECaptchaWithFallback: true,
  },
  // plugins: ["react"],
  rules: {
    //"react/jsx-uses-react": 2,
    "no-nested-ternary": 0, // 允许嵌套三元表达式
    "no-script-url": 0, // 允许javascript:;
    "prefer-destructuring": 0, // 关闭强制使用解构
    "no-plusplus": 0, // 允许使用++和--的操作
    "array-callback-return": 0, // 允许数组map不返回值
    "consistent-return": 0,
    "no-param-reassign": 0, // 允许修改函数形参
    "no-unused-expressions": 0,
    "no-restricted-syntax": 0,
    "react/prop-types": 0,
    "no-prototype-builtins": 0,
    "react/no-deprecated": 0, // 关闭react弃用检测
    "react/no-string-refs": 0,
    "no-useless-escape": 0,
  },
};
```

<a name="PWrjd"></a>

##### .eslintignore 文件

```javascript
/lambda/
/scripts/*
.history
serviceWorker.ts
/config/*
/public/*
*.js
```

<a name="n872A"></a>

##### .prettierrc.js 文件

```javascript
module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
};
```

<a name="vdDRM"></a>

##### .prettierignore 文件

```javascript
**/*.svg
package.json
.umi
.umi-production
/dist
.dockerignore
.DS_Store
.eslintignore
*.png
*.toml
docker
.editorconfig
Dockerfile*
.gitignore
.prettierignore
LICENSE
.eslintcache
*.lock
yarn-error.log
.history
```

<a name="XzLYM"></a>

##### .stylelintrc.js 文件

```javascript
const fabric = require("@umijs/fabric");
module.exports = {
  ...fabric.stylelint,
};
```

<a name="xDhwC"></a>

## 替换 package.json 中命令

```javascript
  "scripts": {
    "lint": "umi g tmp && npm run lint:js && npm run lint:style && npm run lint:prettier",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",
    "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src && npm run lint:style",
    "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "lint:prettier": "prettier --check \"src/**/*\" --end-of-line auto",
    "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",
    "prettier": "prettier -c --write \"src/**/*\"",
    "precommit": "lint-staged",
    "precommit:fix": "npm run lint:fix && npm run prettier && npm run lint:prettier && npm run lint:style",
    "dev": "webpack-dev-server --hot  --config config/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "webpack --progress  --config config/webpack.prod.conf.js"
  },
```

<a name="wiqWE"></a>

## 安装 cross-env（运行跨平台设置和使用环境变量的脚本）

```javascript
1、安装：npm install --save-dev cross-env
2、修改启动命令（原命令前加上 cross-env APP_ENV=development 环境变量）：
	 "start:dev": "cross-env APP_ENV=development webpack serve --config webpack.development.js",
 	 "testing": "cross-env APP_ENV=testing webpack --config webpack.testing.js",
   "build": "cross-env APP_ENV=production webpack --config webpack.production.js",
   "preBuild": "cross-env APP_ENV=preProduction webpack --config webpack.production.js",
3、读取环境变量：process.env.APP_ENV
```

<a name="WlgGX"></a>

## 添加提交前检测

```bash
#使用husky lint-staged在commit的时候校检你提交的代码是否符合规范
yarn add husky lint-staged -D
```

<a name="Pvweh"></a>

## package.json 新增如下代码

```javascript
  "lint-staged": {
    "**/*.less": "stylelint--syntaxless",
    "**/*.{js,jsx,ts,tsx}": "npmrunlint-staged:js",
    "**/*.{js,jsx,tsx,ts,less,md,json}": [
      "prettier--write"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "npmrunlint-staged"
    }
  }
```

<a name="zKnyP"></a>

# <br />
