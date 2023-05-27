<a name="em8qX"></a>

# 安装

```bash
npm init -y     // 初始化package.json
npm install webpack webpack-cli --save-dev

npx webpack --watch     // 监听文件修改
npx webpack-dev-server  // 以server的方式启动项目，不会打包物理文件，而是输出到内存
```

<a name="lXfOM"></a>

# 打包过程

```javascript
读取配置文件：Webpack会首先读取配置文件，根据配置文件中的入口、出口等信息进行打包。

解析模块依赖：Webpack会从指定的入口文件开始递归解析所有的模块依赖，直到找到所有的模块。

加载器处理：对于不同类型的模块，Webpack会使用相应的加载器对其进行处理。例如，对于JavaScript模块，Webpack会使用Babel加载器将ES6语法转换为ES5语法；对于CSS模块，Webpack会使用CSS加载器将CSS代码打包进JS文件中。

插件处理：在模块加载完成之后，Webpack会执行一系列插件，用于完成一些额外的任务，例如生成HTML文件、提取CSS文件等。

编译打包：Webpack将经过处理的模块和插件生成最终的打包文件。通常情况下，Webpack会生成一个或多个JavaScript文件，同时也可以生成其他类型的文件，例如CSS、图片等。

输出打包文件：Webpack将生成的打包文件输出到指定的目录中。通常情况下，Webpack会将打包文件输出到dist目录下。
```

<a name="xRvcP"></a>

## webpack 配置

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动引入资源插件  npm install --save-dev html-webpack-plugin
const MiniCssExtracPlugin = require("mini-css-extrac-plugin"); // css抽离
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //css压缩 npm install css-minimizer-webpack-plugin  --save-dev
const TerserPlugin = require("terser-webpack-plugin"); // js压缩  npm install --save-dev terser-webpack-plugin
//加载toml、yarm、json5数据资源 npm install toml yarm json5 -D
const toml = require("toml");
const yarm = require("yarm");
const json5 = require("json5");

module.exports = (env) => {
  return {
    // 手动分离公共文件，通过配置成对象的方式实现多入口代码分割
    // entry: {
    //  index:{
    //    import:"./src/index.js",
    //    dependOn: "shared"  // 抽离公共文件
    //  },
    //  shared: "lodash"      // 公共的js文件
    // },
    // 多入口
    // entry: {
    // 	 pageOne: './src/pageOne/index.js',
    //  	pageTwo: './src/pageTwo/index.js',
    //  	pageThree: './src/pageThree/index.js',
    // },
    // 单入口
    entry: {
      index: "./src/index.js",
    },
    output: {
      filename: "scripts/[name].[contenthash].js", // 将所有的js放入同一个文件夹，并且根据文件名自动命名
      path: path.resolve(__dirname, "./dist"),
      clean: true, // 清除上一次的垃圾文件
      assetModuleFilename: "images/[contenthash][ext]", // 在images目录下，根据文件内容自动生成hash文件名
      publicPath: "https://*****.com/", // 公共路径（cdn域名或者本地localhost）
    },
    mode: env.prodection ? "prodection" : "development", // 生产环境或者开发环境 package.json 启动命令：npx webpack --env prodection
    devtool: "cheap-module-source-map", // 真实报错文件指向,生产环境一般不开启sourcemap
    // 插件（非必要的，缺少也不影响项目打包）
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html", // 模板
        filename: "app.html",
        inject: "body", // script 存在的位置
        hash: true, // 解决缓存
        minify: {
          removeAttributeQuotes: true, // 压缩，去掉引号
        },
      }),
      new MiniCssExtracPlugin({
        filename: "style/[contenthash].css",
      }),
    ],
    devServer: {
      static: "./dist", // 监听根目录文件变化，自动刷新页面插件 npm install --save-dev webpack-dev-server
      //反向代理
      proxy: {
        "/ajax": {
          target: "https:**********",
          ws: true,
          changeOrigin: true,
        },
      },
    },
    // 模块（必要的，缺少影响项目打包）
    module: {
      rules: [
        //资源模块类型我们称之为Asset Modules Type，总共有四种，来代替loader，分别是：
        // asset/resource：发送一个单独的文件并导出URL，替代file-loader
        // asset/inline：导出一个资源的data URI(base64)，替代url-loader
        // asset/source：导出资源的源代码，之前通过使用raw-loader实现
        // asset：介于asset/resource和asset/inline之间， 之前通过url-loader+limit属性实现。
        {
          test: /\.(png|gif|jp?g|svg|webp|ico)$/, // 正则图片文件
          type: "asset",
          generator: {
            filename: "images/[contenthash][ext]", // 优先级高于 assetModuleFilename
          },
        },
        {
          // 支持less
          // npm install style-loader css-loader less-loader less --save-dev
          // 抽离 npm install mini-css-extrac-plugin  --save-dev   webpack5环境下构建的插件
          test: /\.(le|c)ss$/, // .less and .css
          use: [
            MiniCssExtracPlugin.loader,
            /* "style-loader", */ "css-loader",
            "less-loader",
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|oft)$/, // 正则字体文件
          type: "asset/resource",
        },
        //加载csv、xml数据资源 npm install csv-loader xml-loader -D
        {
          test: /\.(csv|tsv)$/,
          use: "csv-loader",
        },
        {
          test: /\.xml$/,
          use: "xml-loader",
        },
        //加载toml、yarm、json5数据资源
        {
          test: /\.toml$/,
          type: "json",
          parser: {
            parse: toml.parse,
          },
        },
        {
          test: /\.yarm$/,
          type: "json",
          parser: {
            parse: yarm.parse,
          },
        },
        {
          test: /\.json5$/,
          type: "json",
          parser: {
            parse: json5.parse,
          },
        },
        // loader工具 支持数组方式链式调用，数组靠后的元素先执行
        {
          // 压缩图片
          //图片小于一定大小使用base64 否则使用file-loader产生真实图片 npm install url-loader --save-dev
          test: /\.(png|gif|jp?g|svg|webp|ico)$/, // 正则
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 5000, //小于限定使用base64
                name: "home/images/[name].[hash:8].[ext]",
                publicPath: `../../`,
                esModule: false,
              },
            },
          ],
        },
        // 使用babel-loader npm install -D babel-loader @babel/core @babel/preset-env
        // regeneratorRuntime是webpack打包生成的全局辅助函数，由babel生成，用于兼容 async/await 的语法
        // npm install --save @babel/runtime
        // npm install --save-dev @babel/plugin-transform-runtime
        {
          test: /\.js$/,
          exclude: /node_modules/, // *业务代码里面可能会引入node_modules外部js，这些js不需要babel-loader编译，因此需要排除掉
          use: {
            loader: "babel-loader", // *引入babel-loader
            options: {
              presets: ["@babel/preset-env"], // *引入预设
              plugins: [
                [
                  "@babel/plugin-transform-runtime", // *配置插件信息
                ],
              ],
            },
          },
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()], //代码压缩 mode改为 production
      splitChunks: {
        // 缓存
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all", // 自动重复代码抽离
          },
        },
      },
    },
  };
};
```

<a name="Mxhqm"></a>

## webpack 配置拆分

<a name="jfQuB"></a>

##### webpack.config.common.js 文件公共环境配置

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动引入资源插件  npm install --save-dev html-webpack-plugin
const MiniCssExtracPlugin = require("mini-css-extrac-plugin"); // css抽离
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //css压缩 npm install css-minimizer-webpack-plugin  --save-dev
const TerserPlugin = require("terser-webpack-plugin"); // js压缩  npm install --save-dev terser-webpack-plugin
//加载toml、yarm、json5数据资源 npm install toml yarm json5 -D
const toml = require("toml");
const yarm = require("yarm");
const json5 = require("json5");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true, // 清除上一次的垃圾文件
    assetModuleFilename: "images/[contenthash][ext]", // 在images目录下，根据文件内容自动生成hash文件名
  },
  // 插件（非必要的，缺少也不影响项目打包）
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 模板
      filename: "app.html",
      inject: "body", // script 存在的位置
      hash: true, // 解决缓存
      minify: {
        removeAttributeQuotes: true, // 压缩，去掉引号
      },
    }),
    new MiniCssExtracPlugin({
      filename: "style/[contenthash].css",
    }),
  ],
  // 模块（必要的，缺少影响项目打包）
  module: {
    rules: [
      //资源模块类型我们称之为Asset Modules Type，总共有四种，来代替loader，分别是：
      // asset/resource：发送一个单独的文件并导出URL，替代file-loader
      // asset/inline：导出一个资源的data URI(base64)，替代url-loader
      // asset/source：导出资源的源代码，之前通过使用raw-loader实现
      // asset：介于asset/resource和asset/inline之间， 之前通过url-loader+limit属性实现。
      {
        test: /\.(png|gif|jp?g|svg|webp|ico)$/, // 正则图片文件
        type: "asset",
        generator: {
          filename: "images/[contenthash][ext]", // 优先级高于 assetModuleFilename
        },
      },
      {
        // 支持less
        // npm install style-loader css-loader less-loader less --save-dev
        // 抽离 npm install mini-css-extrac-plugin  --save-dev   webpack5环境下构建的插件
        test: /\.(le|c)ss$/, // .less and .css
        use: [
          MiniCssExtracPlugin.loader,
          /* "style-loader", */ "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|oft)$/, // 正则字体文件
        type: "asset/resource",
      },
      //加载csv、xml数据资源 npm install csv-loader xml-loader -D
      {
        test: /\.(csv|tsv)$/,
        use: "csv-loader",
      },
      {
        test: /\.xml$/,
        use: "xml-loader",
      },
      //加载toml、yarm、json5数据资源
      {
        test: /\.toml$/,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yarm$/,
        type: "json",
        parser: {
          parse: yarm.parse,
        },
      },
      {
        test: /\.json5$/,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
      // loader工具 支持数组方式链式调用，数组靠后的元素先执行
      {
        // 压缩图片
        //图片小于一定大小使用base64 否则使用file-loader产生真实图片 npm install url-loader --save-dev
        test: /\.(png|gif|jp?g|svg|webp|ico)$/, // 正则
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000, //小于限定使用base64
              name: "home/images/[name].[hash:8].[ext]",
              publicPath: `../../`,
              esModule: false,
            },
          },
        ],
      },
      // 使用babel-loader npm install -D babel-loader @babel/core @babel/preset-env
      // regeneratorRuntime是webpack打包生成的全局辅助函数，由babel生成，用于兼容 async/await 的语法
      // npm install --save @babel/runtime
      // npm install --save-dev @babel/plugin-transform-runtime
      {
        test: /\.js$/,
        exclude: /node_modules/, // *业务代码里面可能会引入node_modules外部js，这些js不需要babel-loader编译，因此需要排除掉
        use: {
          loader: "babel-loader", // *引入babel-loader
          options: {
            presets: ["@babel/preset-env"], // *引入预设
            plugins: [
              [
                "@babel/plugin-transform-runtime", // *配置插件信息
              ],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      // 缓存
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all", // 自动重复代码抽离
        },
      },
    },
  },
};
```

<a name="oYpFE"></a>

##### webpack.config.dev.js 文件开发环境配置 npx webpack -c ./webpack.config.dev.js

```javascript
module.exports = {
  output: {
    filename: "scripts/[name].js", // 将所有的js放入同一个文件夹，并且根据文件名自动命名
  },
  mode: "development", // 生产环境或者开发环境 package.json 启动命令：npx webpack --env prodection
  devtool: "cheap-module-source-map", // 真实报错文件指向,生产
  devServer: {
    static: "./dist", // 监听根目录文件变化，自动刷新页面插件 npm install --save-dev webpack-dev-server
    //反向代理
    proxy: {
      "/ajax": {
        target: "https:**********",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
```

<a name="wFcdO"></a>

##### webpack.config.prod.js 文件生产环境配置 npx webpack -c ./webpack.config.prod.js

```javascript
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //css压缩 npm install css-minimizer-webpack-plugin  --save-dev
const TerserPlugin = require("terser-webpack-plugin"); // js压缩  npm install --save-dev terser-webpack-plugin

module.exports = {
  output: {
    filename: "scripts/[name].[contenthash].js", // 将所有的js放入同一个文件夹，并且根据文件名自动命名
    publicPath: "https://*****.com/", // 公共路径（cdn域名或者本地localhost）
  },
  mode: "prodection", // 生产环境或者开发环境 package.json 启动命令：npx webpack --env prodection
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()], //代码压缩 mode改为 production
  },
  performance: {
    hints: false, // 关闭性能提示
  },
};
```

<a name="FxgEj"></a>

##### webpack.config.js 运行：webpack -c ./webpack.config.js --env development

```javascript
const { merge } = require("webpack-merge"); // npm install webpack-merge -D
const commonConfig = require("./webpack.config.common");
const productionConfig = require("./webpack.config.prod");
const developmentConfig = require("./webpack.config.dev");

module.exports = (env) => {
  switch (true) {
    case env.development:
      return merge(commonConfig, developmentConfig);
    case env.production:
      return merge(commonConfig, productionConfig);
      defult: return new Error();
  }
};
```

<a name="rcJzo"></a>

## 封装 webpack 自定义插件

```javascript
1. 创建一个 JavaScript 文件，并导出一个函数。这个函数将作为你的插件的构造函数。

2. 在函数中定义一个 apply 方法，该方法接收一个 compiler 参数。这个 compiler 对象是 Webpack 的核心，它包含了 Webpack 的所有配置和工作流程。

3. 在 apply 方法中，可以通过 compiler.hooks 对象访问 Webpack 的生命周期钩子。通过这些钩子，你可以在 Webpack 运行的不同阶段执行自定义代码。

4. 实现你的插件逻辑，例如在特定的 Webpack 钩子上注册回调函数，向编译器添加自定义插件等。

5. 将你的插件打包成一个 npm 模块，并在项目中引入和使用它。

下面是一个简单的 Webpack 插件示例：

const MyPlugin = function() {};

MyPlugin.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('MyPlugin', stats => {
    console.log('Webpack is done!');
  });
};

module.exports = MyPlugin;

在这个示例中，我们定义了一个 MyPlugin 插件，它在 Webpack 编译完成后输出一条信息。
在 apply 方法中，我们使用 compiler.hooks.done 钩子注册了一个回调函数，在编译完成后输出一条消息。

要使用这个插件，你需要将它打包成一个 npm 模块，并在 Webpack 配置文件中引入和使用它：

const MyPlugin = require('my-plugin');

module.exports = {
  plugins: [
    new MyPlugin()
  ]
};

这个示例中，我们在 Webpack 配置文件中引入了 MyPlugin 插件，并将它作为插件数组的一项传递给 plugins 选项。
这样，当 Webpack 编译时，MyPlugin 将会被启用并执行它的逻辑。
```

<a name="AN2kp"></a>

# <br />
