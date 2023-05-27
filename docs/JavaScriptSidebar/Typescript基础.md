<a name="mIKSu"></a>

# Typescript 类型

<a name="O7r4D"></a>

##### 基本类型：

```typescript
1、布尔类型（boolean）：
let flag:boolean=[false|true]

2、数字类型（number）：
let num:number=12

3、字符串类型（string）：
let str:string='hello world'

4、数组类型（array）：
let array:number[]=[1,2]
let str:string[]=['1','2']
let list: Array<number> = [1, 2, 3];

5、对象类型（object ,一般不使用，相当于any ）：
function create(o: object): void;       // create({ prop: 0 }); // OK
let obj : {[propName:string] : string | number}   // obj = {name:'str',age:18}

6、元组类型（tuple），元组类型是固定长度的数组，可以指定数组中每个元素的类型：
let tup:[string,number,boolean]=['we',21,false]

7、枚举类型（enum）：
定义：	enum 枚举变量名{ 枚举类名=枚举值,  枚举类名1=枚举值1}
	enum flag{ success=1, errorM=-1 }
使用：var  变量：枚举类型=枚举变量名.枚举名   ||  var 变量名=枚举变量名.枚举名
	var F:flag=flag.success    //var F=flag.success

例如： enum Weeks {Mon, Tue, Wed, Thu, Fri, Sat, Sun};
console.log(Weeks['Mon']); // => 0
console.log(Weeks[0]); // => 'Mon'
console.log(Weeks.Tue); // => 1

8、任意类型（any）可以赋值给任意变量：
let dom:any=document.getElementById('app')

9、未知(unknown)：
let num:unknown

10、null和undefined：
let num:number|undefined|null
let num:number|undefined|nul

11、void类型（函数无返回值）：
function fn():void{
  console.log('q');
}

12、never类型：never表示其他类型的（包括null和underfined）子类型，表示从未出现过的值，是一个隐含的类型。
```

<a name="oYkEt"></a>

##### 联合类型：

```typescript
let stringOrNumber: string | number;
stringOrNumber = "seven";

function getString(something: string | number): string {
  // toString 是 string类型 和 number类型 的共有属性
  return something.toString();
}

function getLength(something: string | number): number {
  return something.length;
  // => 编译报错: length 不是 string类型 和 number类型 的共有属性, 所以报错
}
```

<a name="XdH5F"></a>

##### 类型断言：

```typescript
1：<类型>值 ( 尖括号语法 )
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
2：值 as 类型 ( as 语法，当使用 tsx 时，只有as语法断言是被允许的 )
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

注意：类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：
function toBoolean(something: string | number): boolean {
    return <boolean>something;
    // => 报错
}
```

<a name="EScBW"></a>

##### 类型别名 type：

```typescript
type Name = string;
type GetName = () => string;
type NameOrGetter = Name | GetName;
function getName(n: NameOrGetter): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
// type 声明可以定义联合类型，基本类型等多种类型
```

<a name="vQIAa"></a>

##### 接口：只能为对象指定类型

```typescript
interface PersonIf {
  readonly id: number; // 只读属性
  name?: string;
  age?: number;
}
function getPerson(obj: PersonIf): any {
  return obj.name;
}
var obj = {
  name: "小孩",
};
console.log(getPerson(obj));
```

<a name="uynyy"></a>

##### 接口约束数组

```typescript
interface array {
  [index: number]: string;
}
let arr: array = ["12", "34"];
```

<a name="iI5rJ"></a>

##### 接口约束对象

```typescript
interface obj {
  [index: string]: any;
}
let duixiang: obj = {
  name: "xiaozhi",
  sex: 18,
  jop: {
    p1: "老师",
    p2: "家长",
  },
};
```

<a name="GHcTl"></a>

##### 继承：extends（继承）关键字

```typescript
interface Point2D {
  x: number;
  y: number;
}
interface Point3D extends Point2D {
  z: number;
}
```

<a name="wjoQN"></a>

# 函数

<a name="sxL81"></a>

##### 函数的定义

```typescript
1、有返回值
function name(params:type):type {
  return paramType
}
或
let mySum = function (x: number, y: number): number {
    return x + y;
};
2、无返回值：
function name(params:type):void { }
或
let name=function (params:type):void { }

函数结构类型声明写法：
let fn : (a:number , b:number) => number; // fn = (n1,n2)=>{return n1+n2}
```

<a name="ggO3h"></a>

##### 函数的参数

```typescript
// 可选参数
function addNum(a: number, b: number, c?: number): number {
  if (c) {
    return a + b + c;
  } else {
    return a + b;
  }
}
console.log(add(1, 2));

// 默认参数
function add(a: number = 1, b: number): number {
  return a + b;
}
console.log(add(undefined, 1));

// 剩余参数
interface AddFunc {
  (num1: number, ...rest: number[]): number;
}
let add: AddFunc;
add = function (a: number, ...rest: number[]): number {
  let result = a;
  rest.map((v) => (result += v));
  return result;
};
console.log(add(1, 2, 3, 4));
```

<a name="IvUUC"></a>

##### 函数重载

```typescript
// 使用重载定义多个函数类型，精确检查输入和输出类型，即输入数字输出也应该为数字：
function reverse(text: number): number;
function reverse(text: string): string;
function reverse(text: number | string): number | string {
  if (typeof text === "string") {
    return text.split("").reverse().join("");
  } else if (typeof text === "number") {
    return +text.toString().split("").reverse().join("");
  }
}
```

<a name="E0vwh"></a>

# 内置对象

<a name="RpnZT"></a>

##### js 内置对象：

```typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error("Error occurred");
let d: Date = new Date();
let r: RegExp = /[a-z]/;
// 参考https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
```

<a name="vNhm3"></a>

##### DOM 和 BOM 的内置对象：

```typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll("div");
document.addEventListener("click", function (e: MouseEvent) {
  // Do something
});
```

<a name="TR6ni"></a>

# 泛型:

<a name="wL4i5"></a>

##### 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
// 打印字符串
function printer1(arr: string[]): void {
  for (var item of arr) {
    console.log(item);
  }
}
printer1(["a", "b", "c", "d"]);
```

<a name="bzVMb"></a>

##### 泛型函数:

```typescript
// 在函数名后加上 <T> （也可以是其他别的字母），其中 T 用来指代输入的类型，在函数内部就可以使用这个 T 类型
function printer<T>(arr: T[]): void {
  for (var item of arr) {
    console.log(item);
  }
}
// 指定具体类型调用
printer<string>(["a", "b", "c", "d"]);
// 调用时也可以直接让ts自己做类型推论
printer([1, 2, 3, 4]);

function swap<S, P>(tuple: [S, P]): [P, S] {
  return [tuple[1], tuple[0]];
}
swap<string, number>(["a", 2]);
```

<a name="cXDe2"></a>

##### 泛型类:

```typescript
class arrayList<T> {
  name: T;
  list: T[] = [];
  add(val: T): void {
    this.list.push(val);
  }
}

var arr = new arrayList<number>();
arr.add(1);
arr.add(2);
console.log(arr.list);
```

<a name="Nv7es"></a>

##### 泛型接口:

```typescript
interface Iadd<T> {
  (x: T, y: T): T;
}

var add: Tadd<number> = function (x: number, y: number): number {
  return x + y;
};
```

<a name="HXBCR"></a>

##### 泛型约束：

```typescript
// 使用泛型约束，使用 extends 约束泛型 <T> 必须符合 Ilength 的形状，也就是必须包含 length 属性:
interface Ilength {
  length: number;
}

function getLength<T extends Ilength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

getLength("abcd"); // 4

getLength(7); // error: Argument of type '7' is not assignable to parameter of type 'Ilength'.
```
