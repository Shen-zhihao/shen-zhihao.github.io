<a name="N68Mn"></a>

# 模块化规范

```javascript
nodejs使用的模块化规范 叫做 common.js 规范:
每一个模块都有独立的作用域 代码在各自模块中执行 不会造成全局污染
每一个模块都是一个独立的文件（module对象）
模块可以被多次加载（module.exports 属性） 但是仅在第一次加载时执行一次
运行结果会被缓存 如果再次加载会从缓存中获得结果
模块的加载顺序和代码的书写顺序有关

// exports对象是module对象的属性，包含导出的信息
导出：module.exports ={}     // module.exports.a = a || exports.a = a;默认指向以module.exports为准
导入：count a = require('');  //只有自定义模块需要写路径('./index')，导入对象永远是module.exports指向的对象
```

<a name="KkRRy"></a>

# HTTP 模块

<a name="O35fh"></a>

##### HTTP 模块

```javascript
//导入模块
const http = require("http");
const https = require("https");

//创建服务
let server = http.createServer((req, res) => {
  // request：解析客户端的请求
  //常用属性及方法：url（请求路径） method（请求方法）headers（头部）
  //url：请求的路径，可以根据URL设置出路由模式，express的就是基于此设置的
  //methoe：请求的方式分为，post get delete put patch
  //headers: 请求的头部，客户单的cookie，数据传输的类型等都放在header中
  //data事件：createServer想要获取请求数据体需要监听data事件

  //response：相应客户端请求，常用属性及方法如下：
  //end：res.end()
  //setHeader(name,content)，可以设置单个header属性，可以多次设置
  //destory：取消返回
  //statusCode：设置返回的状态码，如200 404 400 500等
  //statusMessage：设置状态码对应返回的信息
  //writeHead：可以同时设置statusCode statusMessage 和多个header属性

  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  let data = ""; // 返回数据

  // 根据不同的请求类型 设置不同的响应头
  switch (req.method) {
    case "GET":
      // data事件流 接收到数据时触发的事件 参数 chunk 数据块，在函数内是将数据块拼接给data
      https.get("www.baidu.com", (res) => {
        res.on("data", (chunk) => (data += chunk));
        // end事件 在数据响应结束时触发
        res.on("end", () => {
          data = querystring.parse(data);
          // 接口路由设置 (后端数据接口)
          switch (req.url) {
            case "/users":
              console.log("获取用户信息");
              break;
            case "/addUser":
              // 将数据写入数据库
              data.add = true;
              res.end(JSON.stringify(data));
              break;
            case "/weather":
              weather(res);
          }
        });
      });
      break;
    case "POST":
      const options = {
        hostname: "",
        port: "443",
        path: "",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      };
      https.request(options, (res) => {
        res.on("data", (chunk) => (data += chunk));
        // end事件 在数据响应结束时触发
        res.on("end", () => {
          data = querystring.parse(data);
          console.log(daat);
        });
      });
      req.write(JSON.stringify({ name: "", age: "" })); // 发送的请求数据
      req.end();
      break;
    default:
  }
});
//监听3000端口，开启服务
server.listen(3000, () => {
  console.log("打开了3000端口");
});
```

<a name="iT6vp"></a>

##### jsonp 跨域

```javascript
const http = require("http");
const url = require("url");

//创建服务
http
  .createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    if (req.url === "/favicon.ico") return;
    const urlObj = url.parse(req.url, true);
    res.end(
      `${urlObj.query.callback}(${JSON.stringify({
        name: "xiaoming",
        age: 18,
      })})`
    ); // 返回一个函数 fn( ${urlObj.query.callback} ) 与前端定义的 fn 名称一致
  })
  .listen(3000, () => {
    console.log("打开了3000端口");
  });
```

<a name="y6yMo"></a>

##### cors 头跨域

```javascript
const http = require("http");

//创建服务
http
  .createServer((req, res) => {
    res.writeHead(200, {
      "content-type": "application/json;charset=utf-8",
      "access-control-allow-origin": "*", // 跨域
    });

    res.end(
      JSON.stringify({
        name: "xiaoming",
        age: 18,
      })
    ); // 返回一个函数 fn( ${urlObj.query.callback} ) 与前端定义的 fn 名称一致
  })
  .listen(3000, () => {
    console.log("打开了3000端口");
  });
```

<a name="qiZ0D"></a>

# URL 模块

<a name="ouarV"></a>

##### parse 模块

```javascript
const http = require("http");
const url = require("url");

//创建服务
let server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  if (req.url === "/favicon.ico") return;
  console.log(url.parse(req.url, true)); // 接收第二个参数，为true则转化query对象
  // =Url {
  //   protocol: null,
  //   slashes: null,
  //   auth: null,
  //   host: null,
  //   port: null,
  //   hostname: null,
  //   hash: null,
  //   search: '?user=b&age=18',
  //   query: [Object: null prototype] { user: 'b', age: '18' },
  //   pathname: '/api',
  //   path: '/api?user=b&age=18',
  //   href: '/api?user=b&age=18'
  // }
  res.end();
});
//监听3000端口，开启服务
server.listen(3000, () => {
  console.log("打开了3000端口");
});
```

<a name="TmDjP"></a>

##### format 模块

```javascript
const url = require("url");
const urlObj= {
    protocol: 'https',
    slashes: true,
    auth: null,
    host: 'www.baidu.com:443',
    port: 443,
    hostname: 'www.baidu.com',
    hash: '#tag=110',
    search: '?user=b&age=18',
    query: { user: 'b', age: '18' },
    pathname: '/api',
    path: '/api?user=b&age=18',
  }
url.format(urlObj)   =>  https://www.baidu.com:443/api?user=b&age=18#tag=110
```

<a name="Oa1AW"></a>

##### resolve 模块

```javascript
url.resolve('/one/two','three')   => '/one/three'
url.resolve('/one/two/','three')   => '/one/two/three'
url.resolve('http://www.baidu.com/a/b/c','d')   => 'http://www.baidu.com/d'
```

<a name="NGg6u"></a>

##### 新 url 模块

```javascript
const http = require("http");

let server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  if (req.url === "/favicon.ico") return;
  const newUrl = new URL(req.url, "http://localhost:3000");
  console.log(newUrl);

  // URL {
  //   href: 'http://localhost:3000/api?user=b&age=18',
  //   origin: 'http://localhost:3000',
  //   protocol: 'http:',
  //   username: '',
  //   password: '',
  //   host: 'localhost:3000',
  //   hostname: 'localhost',
  //   port: '3000',
  //   pathname: '/api',
  //   search: '?user=b&age=18',
  //   searchParams: URLSearchParams { 'user' => 'b', 'age' => '18' }, // 可迭代对象
  //   hash: ''
  // }

  res.end();
});

server.listen(3000, () => {
  console.log("打开了3000端口");
});
```

<a name="nLuC6"></a>

# querystring 模块

```javascript
const queryatring = require("querystring");

const str = "name=abc&age=18&location=shanghai";
const obj = {
  name: "abc",
  age: "18",
  location: "shanghai",
};

// 将query格式转成对象
querystring.parse(str);
// => [Object: null prototype] {
//   name: 'abc',
//   age: '18',
//   location: 'shanghai'
// }

// 将对象转成query格式字符串
querystring.stringify(obj);
// => "name=abc&age=18&location=shanghai"
```

<a name="aLvdC"></a>

# 爬虫模块

<a name="D8Url"></a>

##### cheerio 模块

```javascript
cheerio模块为Node.js 爬虫第三方模块，内置jq基本操作 // npm i cheerio
//加载数据(网页)，进行元素操作
let $ = cheerio.load(rawData);
```

<a name="rrxqn"></a>

# path 模块

```javascript
console.log(__dirname); // 当前目录 绝对路径
console.log(__filename); // 当前文件 绝对路径
拼接路径：
path.join(path):
    path.join('__dirname,'a','b');       //拼接当前文件绝对路径
获得文件后缀：
path.extname(path)
获得路径名：
path.dirname(path)
```

<a name="mcP7V"></a>

# event 模块

```javascript
//导入模块
const EventEmitter = require("events");

const event = new EventEmitter();

event.on("start", (data) => {
  console.log("触发了");
  console.log(data);
});

setTimeout(() => {
  event.emit("start", "开始");
}, 2000);
```

<a name="DERuB"></a>

# fs 模块

```javascript
//导入模块
count fs = require('fs');
//读取文件
fs.readFile(url,'utf8',(err,data)=>{
    if (err) throw err;
})
//写入文件
fs.writeFile(file,data[,options],callback)
//文件追加
fs.appendFile(file,data[,options],callback)
//修改文件名
fs.rename(oldpath,newpath,callback)
//读取目录
fs.readdir(path[,option],callback(err,files))
```

<a name="BObrG"></a>

# mysql 模块

```javascript
连接池文件：
const mysql = require('mysql');
var pool = mysql.createPool({ //  创建连接池
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'h5_2013'
});
module.exports = pool;        //导出模块

文件2：
const mysql = require('pool');   //引入导出的配置
执行sql语句：
 mysql.query('select * from users', (err, data) =>
{ // 查数据
            if (err) console.log(err);
            res.send(data); // 发送查询到的数据
});
```

<a name="Htsy6"></a>

# jwt 模块

```javascript
token 令牌
它是一个三段式的加密字符串
xxxxxxxxxx.yyyyyyyyyyyyyyyy.zzzzzzz
第一段: 头信息 签证:安全信息验证 口令 使用不可逆的哈希算法进行加密
第二段: 你需要存储的信息  采用base64 可逆加密 截取一部分
第三段: 额外信息 使用不可逆哈希算法进行加密
浏览器在发送请求进行登陆时
服务器验证完信息 信息正确 则生产一个 token
服务器将这个token发送给前端 前端进行存储
如果前端请求了需要验证登录权限的页面或数据 前端将token跟随请求发回后端
后端通过解密 验证token的有效性

const jwt = require('jsonwebtoken');

// 生成 token：
// jwt.sign(存储的数据,口令,参数);
// 口令 是一个验证需要的 额外字符串
// 解码token的时候 如果口令不同就无法正确解码

// 解码token：
// jwt.verify(token,口令,回调);

let userInfo = {
    username: 'zhangsan',
    age: 25,
    sex: 'nan',
    phone: 13688888888
};

// 生成token
let token = jwt.sign(userInfo, 'rootbk', { expiresIn: 60 });        //expiresIn 过期时间

// console.log(token);

// 解码token
jwt.verify(token, 'rootbk', (err, data) => {
    if (err) console.log(err.message);
    console.log(data);
})
```

<a name="Js2Ji"></a>

# 项目脚手架 express

<a name="cOEFf"></a>

##### 安装

```javascript
#你可以通过 npx （包含在 Node.js 8.2.0 及更高版本中）命令来运行 Express 应用程序生成器。
$ npx express-generator
#对于较老的 Node 版本，请通过 npm 将 Express 应用程序生成器安装到全局环境中并执行即可。
$ npm install -g express-generator
$ express name
#然后安装所有依赖包：
$ cd myapp
$ npm install
#然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了，通过生成器创建的应用一般都有如下目录结构：

- 项目名
    - [bin]       # 存放可执行程序
        - www     # 开启http服务
    - [public]    # 存放静态前端文件
        - [images]
        - [javascripts]
        - [stylesheet]
    - [routes]    # 存放路由文件
        - index.js
        - users.js
    - [views]     # 前端视图模板
        - error.ejs
        - index.ejs
    - app.js      # 主程序
    - package.json   # 依赖信息
```

<a name="tGQoV"></a>

##### 处理数据

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

<a name="vPtw7"></a>

##### 搭建静态 web 服务

```javascript
const express = require("express"); // 引入第三方模块的方式和引入内置模块的方式相同
const path = require("path");
const app = express(); // 创建一个express应用
const conf = {
  port: 8888,
  host: "10.31.168.73",
};
// 使用express搭建一个静态的web服务器

// 静态服务器 使用一个中间件实现
// 将public目录 设置成静态的web目录
// public中所有内容都可以在web服务中被访问

// app.use()  使用中间件
app.use(express.static(path.join(__dirname, "public"))); // 静态服务

app.listen(conf.port, conf.host, () => {
  // 监听端口启动服务
  console.log(`server is running at http://${conf.host}:${conf.port}`);
});
```

<a name="P83vL"></a>

##### api 服务

```javascript
// 搭建一个api 服务    应用程序接口
// express可以快速搭建api服务
// 接口的作用是给前端提供数据支持(CRUD)
// 前端如何发送请求
// ajax    get/post
// href    get
// form    get/post
// jsonp   get

const express = require("express");
const app = express(); // 创建一个express应用
const conf = {
  port: 8088,
  host: "localhost",
};

// app.get(url,callback);   用于接受get请求
// 参数
// url[string] 请求路径
// callback[function] 回调函数
//    回调参数
//    req      request
//    res      response
//    next     函数 交出中间的控制权 将这个请求交给下一个中间件

app.get("/getItem", (req, res, next) => {
  console.log("我收到了一个请求");
  // 响应内容
  // res.send() 发送数据 接受一个字符串作为参数 发送数据后自动终止请求
  // res.send('hahaha');
  // res.send({ username: 'zhangsan', age: 20 });

  // res.json() 发送数据 接受一个JSON 发送后自动终止请求
  res.json({ data: { username: "zhangsan", age: 20 }, status: success });
});
app.get("/getuser", (req, res, next) => {
  res.json({ username: "lisi", age: 20, success: 1 });
});
app.post("/getuser", (req, res, next) => {
  res.json({ username: "xiaoming", age: 20, success: 1 });
});
app.listen(conf.port, conf.host, () => {
  console.log(`server is running at http://${conf.host}:${conf.port}`);
});
```

<a name="cs5zD"></a>

##### use 中间件

```javascript
const express = require("express");
const path = require("path");
const app = express();
const conf = {
  port: 8888,
  host: "localhost",
};
// 配置静态web服务器
app.use(express.static(path.join(__dirname, "public")));

// express 封装的是 http 服务器
// express 接受到前端发送过来的请求 会交给 中间件 依次处理

// 当前回调函数就是我的自定义中间件
app.use((req, res, next) => {
  console.log("我是中间件一号");

  // 如果在中间中没有使用 send 或 json 结束请求
  // 这个请求会被认为没有完成 进程将被挂起
  // next 调用next可以将中间件的控制权交出
  // 将这个请求传递给下一个中间件
  next();
  // res.send('hahah');
});
app.use((req, res, next) => {
  console.log("我是中间件二号");
  next();
});
app.listen(conf.port, conf.host, () => {
  console.log(`server is running at http://${conf.host}:${conf.port}`);
});
```

<a name="CWCJq"></a>

##### request 模块-实现跨源请求（代理）

```javascript
const express = require("express");
const request = require("request");
const querystring = require("querystring");
const app = express();
let requestUrl = "http://api.k780.com/?";
let props = {
  app: "weather.future",
  cityNm: "杭州",
  appkey: "38926",
  sign: "f8b4121c2d581be2623569b24f798dee",
  format: "json",
};
requestUrl += querystring.stringify(props);
app.get("/api", (req, res, next) => {
  request(requestUrl, (err, response, body) => {
    if (err) console.log(err);
    res.send(body);
  });
});
app.listen(8877, "localhost", () => {
  console.log("start");
});
```
