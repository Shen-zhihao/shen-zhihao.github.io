# 安装与使用

## 全局安装

```bash
$npm -i typescrip -g         //全局安装
```

## tsconfig.json 配置文件

```json
{
  "compilerOptions": {
    "incremental": true, //增量编译

    "tsBuildInfoFile": ".tsbuildinfo", //增量编译文件的存储位置

    "diagnostics": true, //打印诊断信息

    "target": "ES5", //目标语言版本

    "module": "commonjs", //生成代码的模块标准

    "outFile": "./app.js", //将多个相互依赖的文件生成一个文件，可以用在AMD模块中

    "lib": [], //TS需要引用的库，即声明文件

    "allowJs": true, //允许编辑JS文件（js,jsx）

    "outDir": "./out", //指定输出的目录

    "rootDir": "./", //指定输入文件目录 （用于输出）

    "declaration": false, //生成声明文件

    "declarationDir": "./d", //声明文件的路径

    "emitDeclarationOnly": false, //只生成声明文件

    "sourceMap": false, //生成目标文件的sourecMap

    "inlineSourceMap": false, //声明目标文件的inline sourceMap

    "declarationMap": false, //生成声明文件的sourceMap

    "typeRoots": [], //声明文件目录 默认node_modules/@types

    "types": [], //声明文件包

    "removeComments": false, //删除注释

    "noEmit": false, //不输出文件

    "noEmitOnError": false, //发生错误时不输出文件

    "noEmitHelpers": false, //不生成helper函数，需要额外安装 ts-helpers

    "importHelpers": false, //通过tslib引入helper函数，文件必须是模块

    "downlevelIteration": false, //降级遍历器的实习（es3/es5）

    "strict": false, //严格的类型检查

    "alwaysStrict": false, //在代码中注入use strict

    "strictNullChecks": false, //不允许把null,undefined赋值给其他类型变量

    "strictFunctionTypes": false, //不允许函数参数双向协变

    "strictPropertyInitialization": false, //类的实例属性必须初始化

    "strictBindCallApply": false, //严格的bind/call/apply检查

    "noImplicitThis": false, //不允许this有隐式的any类型

    "noUnusedLocals": false, //检查只声明，未使用的局部变量

    "noUnusedParameters": false, //检查未使用的函数参数

    "noFallthroughCasesInSwitch": false, //防止switch语句贯穿

    "noImplicitReturns": false, //每个分支都要有返回值

    "esModuleInterop": false, //允许export = 导出, 由import from导入

    "allowUmdGlobalAccess": false, //允许在模块中访问UMD全局变量

    "moduleResolution": "node", //模块解析策略

    "baseUrl": "", //解析非相对模块的基地址

    "paths": {}, //路径映射，相对于baseUrl

    "rootDirs": [], //将多个目录放在一个虚拟目录下，用于运行时

    "listEmittedFiles": false, //打印输入的文件

    "listFiles": false //打印编译的文件（包括引用的声明文件）
  }
}
```

## 使用

```javascript
基本类型：
  let str : string = "hello"
  let num = 5
  let bool : boolean = true
	let x : null = null
	let y : undefined = undefined

数组：
  let arr1 : number[] = [1,2,3,4]
  let arr2 : Array<number>  = [1,2,3]
  let arr3 : Array<number | string> = [1,2,3,"hello"]  // 联合类型<number | string>
  let arr4 : Array<any> = [1,2,3,"hello"]              //any可以代表任意类型

文字类型（const）：
  let x:center = 'center';
  function location (l:'left' | 'right')               // 形参只能是 left 或者 right
    { return l };

定义对象:
  let obj: Record<string, string> = {key : value}:

type定义类型：
  type MyStr = string;
  type Person = {name:string;address?: string};
	& 符号扩展: type Obj = Person & { age:number }

interface(接口) 定义对象:
  interface Person {
    name : string;
    address?: string;         //可选属性
    //索引签名
    [propname : string] : any;
  }
  extends关键字扩展: interface Person2 extends Person {  age : number }

  const obj : Person = {
    name : "zhangsan",
    age : 19
  }

type 创建的类型不能修改；interface 同名类型可以合并；

类型断言:
	let str = 'hello' as string;
	let str = <string> 'hello';

泛型：
  function fn<T>(x:T){
    return x
  }

  fn<number>(5)

定义函数类型 function fn(形参类型):返回值类型 :
  function fn(x:number,y?:number):number{
    return x+y
  }
  const fn : (x:number,y?:number) => number  =
    function (x:number,y:number):number{
      return x+y
  }

void 它表示没有任何类型,只能为它赋予undefined和null：一般用于函数，没有返回值（函数的类型是返回值的类型）:
  function fn() : void {}

死循环或者报错never:死循环或者报错

定义React函数组件：FC
  const Home : FC = () => {}

Enum 定义枚举类型：
  enum Color { Red,Green,Blue }
  const c : Color = Color.Green
  const d : string = Color[1]

tuple 已知元素数量和类型的数组，可以精确控制数组长度并且可以规定每一项数据类型：
  let tup : [number,boolean] = [1,true]
  let tup : [number=1,boolean=2] = [1,true]      // tup[1] === 1;tup[2] === true;
```

## 运行

```bash
1、手动编译
$tsc XXX.ts --outFile xxx.js
2、自动编译
//开启配置文件
$tsc --init
//修改outDir和rootDir文件
//开始监听
    $tsc --watch
```

# 在 JS 项目中添加 TS

## package.json 部分

##### 安装 typescript 和 ts-loader

```javascript
yarn add typescript --D
```

##### 安装 react 类型配置

```javascript
yarn add @types/node @types/react @types/react-dom @types/react-router-dom
```

##### 初始化 tsconfig.json 文件

```html
npx tsc --init
```

##### 配置 tsconfig.json

```javascript
{
  "compilerOptions": {
    	"target": "es2016", /**指定ECMAScript目标版本**/
      "module": "commonjs", /**指定生成哪个模块系统代码**/
      "esModuleInterop": true,
      "allowJs": true,  /**允许编译js文件**/
      "jsx": "preserve",  /**支持JSX**/
      "outDir": "dist",  /**编译输出目录**/
      "strict": true, /**启用所有严格类型检查选项**/
      "noImplicitAny": false, /**在表达式和声明上有隐含的any类型时报错**/
      "skipLibCheck": true,  /**忽略所有的声明文件的类型检查**/
      "forceConsistentCasingInFileNames": true   /**禁止对同一个文件的不一致的引用**/
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

##### package.json 中 scripts 新增 tsc 命令用于检测 typescript 类型

```javascript
"tsc": "tsc --noEmit"
```

## Webpack 部分

##### 安装 ts-loader

```javascript
yarn add ts-loader eslint-import-resolver-typescript --D
```

##### reslove:extensions 新增.ts 和.tsx

```javascript
resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
}
```

##### 配置 webpack，新增 ts-loader

```javascript
{
    test: /\.tsx?$/, // .ts或者tsx后缀的文件，就是typescript文件
    use: 'babel-loader',
    exclude: /node-modules/, // 排除node-modules目录
}
```

##### 安装@babel/preset-typescript

```javascript
yarn add @babel/preset-typescript -D
```

##### .babelrc 新增 typescript 配置

```javascript
"presets": [
    ...
    "@babel/typescript"
],
```

## Eslint 部分

##### 安装@typescript-eslint/parser 和@typescript-eslint/eslint-plugin

```javascript
yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

##### 引入 eslint 三方配置

```javascript
yarn add eslint-plugin-shopify -D
```

##### .eslintrc.js 中新增 overrides，检测.ts 文件

```javascript
overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      plugins: ['@typescript-eslint'],
      extends: ['plugin:shopify/esnext'],
      parserOptions: {
        // project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      rules: {
        'no-console': 0, // 如果有console，阻止抛出错误
        'no-use-before-define': 'off',
      },
    },
  ],
```

##### .eslintignore 新增忽略文件 tsconfig.json

##### .prettier 新增

```javascript
// jsxSingleQuote: true,
extends: [
    'plugin:shopify/typescript',
    'plugin:shopify/react',
    'plugin:shopify/prettier',
  ],

```

##### Tips：

:::danger
eslint 不会报告 typescript 类型错误，ts 如需要检测类型需要使用 tsc --noEmit 命令
:::

## 参考链接

[React 项目中引入 Typescript](https://www.cnblogs.com/Ming2021/p/15740287.html)<br />[如何配置 React 项目直接使用 TypeScript 包（babel 版）](https://juejin.cn/post/6844903933446455309)<br />[https://github.com/typescript-eslint/typescript-eslint/issues/352](https://github.com/typescript-eslint/typescript-eslint/issues/352)<br />[https://stackoverflow.com/questions/60514929/eslint-not-reporting-typescript-compiler-type-checking-errors](https://stackoverflow.com/questions/60514929/eslint-not-reporting-typescript-compiler-type-checking-errors)
