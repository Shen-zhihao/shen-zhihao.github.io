<a name="tVXu5"></a>

# 常用函数部分

<a name="EUYYw"></a>

##### 1、自定义一个缓存函数

```javascript
const memoize = (fn) => {
  let cache = {} ;
  return function () {
    let key = JSON.stringify(arguments);
    cache[key] = cache[key] || fn(...arguments);
    return cache[key];
  };
};

接收一个函数作为参数：
	function szie(r) {
  	return r * r;
	}
	let getRes = memoize(szie);
调用：
	console.log(getRes(2));
```

<a name="oxBgn"></a>

##### 2、检查对象是否为空

```javascript
即使对象为空，每次检查对象是否等于 {} 也会返回 false。
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
```

<a name="iv7r3"></a>

##### 3、检查设备上的触摸支持

```javascript
const touchSupported = () =>
  "ontouchstart" in window ||
  (DocumentTouch && document instanceof DocumentTouch);
```

<a name="MVwS4"></a>

##### 4、重定向到另一个 URL

```javascript
const redirect = (url) => (location.href = url);
```

<a name="Gdp2r"></a>

##### 5、检测某个元素是否聚焦

```javascript
const hasFocus = (el) => el === document.activeElement;
```

<a name="V6uU5"></a>

##### 6、获取所有 cookie 并转为对象

```javascript
const getCookies = () =>
  document.cookie
    .split(";")
    .map((item) => item.split("="))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});
```

<a name="TjcZU"></a>

##### 7、清除所有 cookie

```javascript
const clearCookies = () => document.cookie
  .split(';')
  .forEach(c => document.cookie = c.splace(/^+/, '')
          .replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`))
  )
```

<a name="DoAwb"></a>

##### 8、从对象中删除值为 null 和 undefined 的属性

```javascript
const removeNullAndUndefined = (obj) =>
  Object.entries(obj).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
```

<a name="z9Rnq"></a>

##### 9、js 下载图片

```javascript
const imgUrl = ""; // 图片链接
const a = document.createElement("a");
// 这里是将url转成blob地址，
fetch(imgUrl) // 跨域时会报错
  .then((res) => res.blob())
  .then((blob) => {
    // 将链接地址字符内容转变成blob地址
    a.href = URL.createObjectURL(blob);
    a.download = "追溯二维码.jpg"; // 下载文件的名字
    document.body.appendChild(a);
    a.click();
    //在资源下载完成后 清除 占用的缓存资源
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  });
```

<a name="EqlP3"></a>

##### 10、瀑布流布局

```javascript
const waterFall = () => {
  //瀑布流核心代码
  let img = $(".img-item"); //获取图片集合
  let imgWidth = $(".img-item").width(); //当前图片宽度
  let boxWidth = $(".img-box").width(); //瀑布流布局框宽度
  let cols = parseInt(boxWidth / imgWidth); //求出列数
  let heightArr = []; //创建高度数组，用于存储各行当前高度
  // 遍历图片集合
  $.each(img, function (index, item) {
    let imgHeight = $(item).height(); //取出对应图片的高度
    if (index < cols) {
      //判断是不是第一行,第一行索引0~cols-1,
      //第一行直接存入高度数组
      heightArr[index] = imgHeight;
    } else {
      //非第一行操作，将此次图片定位到高度最低的一列
      //获取高度数组中的最小值,即所有列中最小的一列，是此次图片定位的起始高度，即top
      let minBoxHeight = Math.min(...heightArr);
      //获取最小高度对应的列索引,$.inArray()用于查找对应数组中指定值的索引。(未匹配成功的话，返回-1)
      //从而可以判断出此次图片定位的起始left
      let minBoxIndex = $.inArray(minBoxHeight, heightArr);
      //图片定位插入对应位置
      $(item).css({
        position: "absolute",
        //加10是因为css设置了右外边距
        left: minBoxIndex * (imgWidth + 10) + "px",
        //加6是为了让间距相同，视觉舒适
        top: minBoxHeight + 6 + "px",
      });
      //高度追加，存入高度数组
      heightArr[minBoxIndex] += imgHeight + 6;
    }
  });
  //获取每次执行完的最大高度，用于设置瀑布流盒子高度
  //因为瀑布流图片设置绝对定位而使，盒子高度塌陷
  //最后执行完就是整个瀑布流盒子的高度
  let maxBoxHeight = Math.max(...heightArr);
  $(".img-box").css("height", maxBoxHeight);
};
```

<a name="zZ0Hg"></a>

##### 11、分散节点转树

```javascript
// 子节点遍历成树
export function formatToTree(array: Array<any>, pid?: any) {
  return array
    .filter((item) =>
      // 如果没有父id（第一次递归的时候）将所有父级查询出来
      // 这里认为 item.parentId === 0 顶层 id
      pid === undefined ? item.parentId === 0 : item.parentId === pid
    )
    .map((item) => {
      // 通过父节点ID查询所有子节点
      item.children = formatToTree(array, item.id);
      return item;
    });
}
```

<a name="eKzO6"></a>

##### 12、统计一个对象中所有的数据类型

```git
function countDataTypes(obj) {
  const types = {};

  function getType(value) {
    if (Array.isArray(value)) {
      return "array";
    } else if (value instanceof Date) {
      return "date";
    } else if (value === null) {
      return "null";
    } else {
      return typeof value;
    }
  }

  function countTypes(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const type = getType(obj[key]);
        if (types[type]) {
          types[type]++;
        } else {
          types[type] = 1;
        }
        if (type === "object") {
          countTypes(obj[key]);
        }
      }
    }
  }

  countTypes(obj);
  return types;
}

// 测试用例：
const obj = {
  name: "John",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    street: "123 Main St.",
    city: "Anytown",
    state: "CA"
  },
  favoriteColor: null,
  birthDate: new Date()
};

// 结果
{
  string: 1,
  number: 1,
  array: 1,
  object: 2,
  boolean: 0,
  undefined: 0,
  function: 0,
  symbol: 0,
  bigint: 0,
  null: 1,
  date: 1
}
```

<a name="VtIXd"></a>

# ES 新特性

<a name="DN98d"></a>

##### ES2021

```javascript
1 数字分隔符
  let num = 1234567
  let num2 = 1_234_567

2 Promise.any
    与 Promise.all 类似，Promise.any 也接受一个 Promise 的数组。当其中任何一个 Promise 完成（fullfill）时，就返回那个已经有完成值的 Promise。
如果所有的 Promise 都拒绝（reject），则返回一个拒绝的 Promise，该 Promise 的返回值是一个 AggregateError 对象。我们可以把 Promise.any 理解成 Promise.all 的相反操作。
  Promise.any(promises).then(
    (first) => {
      // 任何一个 Promise 完成了
    },
    (error) => {
      // 所有的 Promise 都拒绝了
    }
  );

3 逻辑符号简写
   a ||= b;// 等同于 a = a || b  如果 a 为真则返回 a，如果 a 为假则返回 b
   c &&= d;// 等同于 c = c && d  如果 a 为真，则返回 b , 如果 a 为假，则返回 a
   e ??= f;// 等同于 e = e ?? f  如果 e 为 null或未定义，则返回 f；如果e为真，则返回e。

```

<a name="gGToF"></a>

##### ES2022

```javascript
1、类的构造新写法：
旧：
  class Car {
 		 constructor() {
   	 	this.color = 'blue';
    	this.age = 2;
  		}
		}
新：
  class Car {
  	color = 'blue';
  	age = 2;
   	#firstName = 'Joseph';        // 私有变量 使用in来判断某个对象是否拥有某个私有属性
   	hasColor() {
   	 return #firstName in this;   //console.log(car.hasColor()); // true
  	}
	}

2、支持在最外层写await：
//旧：
	function timeout(ms) {
  	return new Promise((resolve) => {
   	 setTimeout(resolve, ms);
  	});
	}
	async function asyncPrint(value, ms) {
 	 await timeout(ms);
  	console.log(value);
	}
	asyncPrint('hello world', 50);

//新：
	function setTimeoutAsync(timeout) {
 	 return new Promise((resolve) => {
    setTimeout(() => {
     	 resolve();
    	}, timeout);
   })
 }
	await setTimeoutAsync(3000);

3、at()方法：
//数组
	const arr = ['a', 'b', 'c', 'd'];
// 倒数第一个元素
	console.log(arr.at(-1)); // d
	console.log(arr.at(-2)); // c
//字符串
	const str = 'Coding Beauty';
	console.log(str.at(-1)); // y
	console.log(str.at(-2)); // t
//TypedArray对象
	const typedArray = new Uint8Array([16, 32, 48, 64]);
	console.log(typedArray.at(-1)); // 64
	console.log(typedArray.at(-2)); // 48

4、正则表达式匹配字符串的时候支持返回开始和结束索引：
	const str = 'sun and moon';
	const regex = /and/d;                   //给正则表达式添加一个d的标记；返回匹配到的子字符串的起始位置还返回其结束位置
	const matchObj = regex.exec(str);
/**
[
  'and',
  index: 4,
  input: 'sun and moon',
  groups: undefined,
  indices: [ [ 4, 7 ], groups: undefined ]
]
 */
	console.log(matchObj);

5、Object.hasOwn()方法，检查某个对象自身是否拥有某个属性:
	const obj = Object.create(null);
	obj.color = 'green';
	obj.age = 2;
	obj.hasOwnProperty = () => false;

	console.log(Object.hasOwn(obj, 'color')); // true
	console.log(Object.hasOwn(obj, 'name'));  // false  基本等价于obj.hasOwnProperty('name')

6、数组支持逆序查找findLast()和findLastIndex()：
	const nums = [7, 14, 3, 8, 10, 9];

	const lastEven = nums.findLast((num) => num % 2 === 0);
	const lastEvenIndex = nums.findLastIndex((num) => num % 2 === 0);

	console.log(lastEven); // 10
	console.log(lastEvenIndex); // 4
```
