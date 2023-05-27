<a name="f2eBP"></a>

# 基础概念

<a name="vsQmH"></a>

##### 导入导出（CommonJS 规范和 ES6 规范）

```javascript
(1) CommonJS模块是运行时加载，ES6模块是编译时输出
(2) CommonJS模块输出的是一个值的复制，ES6模块输出的是值的引用
(3）CommonJS加载的是整个模块，即将所有的方法全部加载进来，ES6可以单独加载其中的某个方法
(4) CommonJS中this指向当前模块，ES6中this指向undefined
(5) CommonJS默认非严格模式，ES6的模块自动采用严格模式

ES6动态导入可以使用预获取（prefetch）、预加载（preload）加载技术。
  在浏览器中表现为：<link rel="preload" href="/main.js?t=3000" as="script">
  在js中表现问：import(/* webpackPreload */ './**.js').then(()=>{})
```

<a name="wXVqH"></a>

##### ES5--严格模式

```javascript
消除js语法不严谨之处、消除代码运行不安全之处、提高编译器效率、为新版本js做铺垫
进入严格模式：use strict；
将严格模式放在当前作用域顶部，声明之前不允许有任何代码；
全局环境下，表示全局都采用严格模式；
```

<a name="mJrhE"></a>

##### let 和 const

```javascript
都用来申明块级作用域（声明的变量在当前{}有效）的变量，不会申明提前；
ES6中通过const定义常量，常量通常用大写字母定义，多个单词之间用_分隔;
const声明的变量只允许一次赋值（基本数据类型）操作，引用情况下不能修改引用对象，但是可以修改对象属性；
let和const在变量声明预编译阶段不存在变量声明提升（var 提升到最先级）；
let和const在声明的变量不会绑定到window中（wiindow.a);
```

<a name="Tooem"></a>

##### 箭头函数

```javascript
ES6新增函数语法糖-简化函数写法； 基本语法： (形参) => {内容};
当形参只有一个时，可以省略();
当内容只有一条语句且为return时，可以省略return和{}，;
当返回一个对象时，需要加 ( ) ；
this在箭头函数中，指向静态（固定、父级环境），指向被调用者当前定义时的环境；
```

<a name="JZ5T7"></a>

##### 解构赋值-结构相同

```javascript
从数组和对象中提取值，对变量进行赋值；
本质是左右相等的一种匹配模式进行赋值；
它要求赋值符左右两边的结构相同；
解构将自动拆解，对应赋值；
展开运算符：...   结构时出现在变量身上为收缩，无法取值时获取空数组；
变量解构时，需要变量与属性名一致；

    let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    baz // "aaa"
交换变量 ：[a,b]=[b,a]
```

<a name="JgpjA"></a>

##### 空值合并运算符（ ?? ）

```javascript
逻辑操作符，当左侧的操作数为 null或者undefined时，返回其右侧操作数，否则返回左侧操作数。
  const foo = undefined ?? "foo"   =>   foo
  const bar = null ?? "bar"        =>   bar
  const str = '' ?? "bar"          =>   ''
```

<a name="YYwkO"></a>

##### 模板字符串（template string）

```javascript
是一种字符串格式，用 `` 表示；可以作为普通字符串使用，也可以定义多行字符串；
1、可以保留字符串原有格式，类似于标签<pre></pre>;
2、允许字符串换行；
3、变量拼接更加便利:`abc${}`;
```

<a name="jnPSK"></a>

##### 获取全局对象 globalThis

```javascript
从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 window、self 取到全局对象，在 Node.js 中，它们都无法获取，必须使用 global。
在松散模式下，可以在函数中返回 this 来获取全局对象，但是在严格模式和模块环境下，this 会返回 undefined。

以前获取全局this：
  var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };

  var globals = getGlobal();

  if (typeof globals.setTimeout !== 'function') {
    // 此环境中没有 setTimeout 方法！
  }

现在获取全局this：
  if (typeof globalThis.setTimeout !== 'function') {
    //  此环境中没有 setTimeout 方法！
  }
```

<a name="UI8pJ"></a>

# 数据类型

<a name="DNIX8"></a>

##### set 数据结构

```javascript
ES6新增，类似于数组，有序结构，不同于数组的是，成员唯一（不可重复）；
引用类型数据，有构造函数：let set = new set([]);
数组的去重：
    var arr2 = [... new Set(arr)];         //...为展开运算；Set为ES6新增数据结构，不能有相同元素；
转为数组：
    let arr = Array.from(set);
方法：
set.protopyte.add():向数组中添加元素，出现在set结尾处，如果元素存在则忽略；返回值set对象；
set.protopyte.size():返回set元元素数量；
set.protopyte.delete():用于删除set中的指定元素，返回值是布尔值，表示是否删除成功；
set.protopyte.has():判断set中是否具有某个值，返回值是布尔值；
set.protopyte.clear():清空、删除所有元素；
```

<a name="Voc48"></a>

##### map 数据结构

```javascript
类似于对象的哈希结构，提供了值-值得对应；
map的键可以是任意数据类型；
let map = new map();
设置对象的值：map.set(key,value);
获取对象的值:map.get(key);
判断成员是否存在：map.has(key);
删除对象的值：map.delete(key);
清空：map.clear();
```

<a name="SGmSP"></a>

##### 基本数据类型-symbol

```javascript
ES中第六种数据类型-解决对象属性命名重复问题，但是普通方法无法遍历（symbol方法可以遍历取出）；
没有构造函数，需要symbol类型时用symbol函数创建；
let uname = symbol(username);
let o ={};
    o[uname] = 'zhangsan';
    console.log(o[uname]);
```

<a name="UzNeY"></a>

##### Iterator 和 for...of 遍历

```javascript
Iterator 的作用有三个：
一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；
三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
Iterator 的遍历过程是这样的:
（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
  for...of:能遍历的内容必须有Iterator接口；
  遍历数组：
  let set = new set([1,2,3])
  for (let value of set){
    console.log(value);
  }
使用for...of遍历map获得数组（第一个元素为key，第二个元素为value）:
  解构赋值：for(let[key,value] of map){
     console.log(key,value);
  }
原生具备 Iterator 接口的数据结构如下:Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象
```

<a name="YLXeG"></a>

# 异步方案

<a name="kA7Hy"></a>

##### Gnerator

```javascript
ES6新增遍历器对象；异步编程解决方案，让异步代码同步执行；一般情况配合co（co.js）模块使用；本质是一个自执行器；
定义一个Gnerator函数需要在函数名和关键字中添加 * ；
function * hello(){}
Generator 函数是一个普通函数，但是有两个特征:
一是，function关键字与函数名之间有一个星号；
二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
调用Generator函数时，表示创建一个遍历器对象，内部包含一个next函数，将函数拆分成多个部分执行，每次执行next函数将运行到下一个yield语句为止；
每次执行next会返回一个对象，返回值包含两个属性：yield表示产出内容，done表示简历是否结束；
```

<a name="JSb7C"></a>

##### promise

```javascript
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 fulfilled(resolved)），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

promise.then（）
  它的作用是为 Promise 实例添加状态改变时的回调函数；如果该对象状态变为resolved(resolved统一只指fulfilled状态)，则会调用then()方法指定的回调函数。

promise.catch（）
  Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数；
  如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。

promise.finally()
  finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的；使用场景：不管成功或者失败，都需要执行的代码（loading关闭）

Promise.all()
  Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
  const p = Promise.all([p1, p2, p3])。
```

<a name="sv1gX"></a>

##### 手写 promise

```javascript
function myPromise(excutor) {
  // 1、执行结构
  let self = this;
  self.status = "pending";
  self.value = null; // 成功结果
  self.reason = null; // 失败原因
  // 6、添加缓存数组
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  // 4、判断状态作相应处理
  function resolve(value) {
    if (self.status === "pending") {
      self.value = value; // 保存成功结果
      self.status = "fulfilled";
      // 8、状态改变依次取出callback
      self.onFulfilledCallbacks.forEach((item) => item(value));
    }
  }
  function reject(reason) {
    if (self.status === "pending") {
      self.reason = reason; // 保存失败原因
      self.status = "rejected";
      // 8、状态改变依次取出callback
      self.onRejectedCallbacks.forEach((item) => item(reason));
    }
  }

  // 3、执行
  try {
    excutor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
// 2、then方法
myPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  // 5、状态改变调用then方法
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function (data) {
          resolve(data);
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (err) {
          throw err;
        };

  // 7、添加callback
  // if (self.status === 'pending') {
  // self.onFulfilledCallbacks.push(onFulfilled);
  // self.onRejectedCallbacks.push(onRejected);
  // }
  if (self.status === "fulfilled") {
    return new myPromise((resolve, reject) => {
      try {
        let res = onFulfilled(self.value);
        // 判断传入的值是不是Promise ，是就.then 不是就抛出结果
        res instanceof myPromise ? res.then(resolve, reject) : resolve(x);
      } catch (err) {
        reject(err);
      }
    });
  }
  if (self.status === "rejected") {
    return new myPromise((resolve, reject) => {
      try {
        let res = onRejected(self.value);
        // 判断传入的值是不是Promise ，是就.then 不是就抛出结果
        res instanceof myPromise ? res.then(resolve, reject) : resolve(x);
      } catch (err) {
        reject(err);
      }
    });
  }
  if (self.status === "pending") {
    return new myPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push(() => {
        let res = onRejected(self.value);
        // 判断传入的值是不是Promise ，是就.then 不是就抛出结果
        res instanceof myPromise ? res.then(resolve, reject) : resolve(x);
      });
      self.onRejectedCallbacks.push(() => {
        let res = onRejected(self.value);
        // 判断传入的值是不是Promise ，是就.then 不是就抛出结果
        res instanceof myPromise ? res.then(resolve, reject) : resolve(x);
      });
    });
  }
};
myPromise.prototype.catch = function (fn) {
  return this.then(null, fn);
};
```

<a name="QqAOj"></a>

# Proxy 的基本使用

作用：简单的来说，监听对一个对象的操作，可以先创建一个代理对象（Proxy 对象）；<br /> 之后对该对象的操作，都是通过对代理对象操作来完成的，代理对象可以监听了对原来对象进行了哪些的操作，进行捕捉。<br />参考文件：[https://www.bookstack.cn/read/es6-3rd/spilt.1.docs-proxy.md](https://www.bookstack.cn/read/es6-3rd/spilt.1.docs-proxy.md)
<a name="kdGvL"></a>

##### get 捕捉器（常用）

```javascript
const obj = {
  name: "copyer",
  age: 12,
};
const objProxy = new Proxy(obj, {
  /**
   * @param {*} target :目标对象
   * @param {*} key : 键值
   * @param {*} receiver ：代理对象（后面会专门讲解）
   */
  get: function (target, key, receiver) {
    console.log("get捕捉器");
    return target[key];
  },
});
console.log(objProxy.name); // copyer
```

<a name="WIVhO"></a>

##### set 捕捉器（常用）

```javascript
const obj = {
  name: "copyer",
  age: 12,
};
const objProxy = new Proxy(obj, {
  /**
   * @param {*} target : 目标对象
   * @param {*} key ：键值
   * @param {*} newValue ：新增
   * @param {*} receiver ：代理对象
   */
  set: function (target, key, newValue, receiver) {
    console.log("set捕捉器");
    target[key] = newValue;
  },
});
objProxy.age = 23;
console.log(obj.age); // 23
```

<a name="dx22D"></a>

##### has 捕捉器（常用）

```javascript
const obj = {
  name: "copyer",
  age: 12,
};
const objProxy = new Proxy(obj, {
  has: function (target, key) {
    console.log("has捕捉器");
    return Object.keys(target).includes(key);
  },
});
console.log("name" in objProxy);
```

<a name="XAZHp"></a>

##### deleteProperty 捕捉器（常用）

```javascript
const obj = {
  name: "copyer",
  age: 12,
};
const objProxy = new Proxy(obj, {
  deleteProperty: function (target, key) {
    console.log("deleteProperty捕捉器");
    return delete target[key];
  },
});
console.log(delete objProxy.name); // true
```
