<a name="cKaP3"></a>

# 页面相关 Hooks

<a name="FisR0"></a>

##### useState（改变状态是异步的）

```javascript
返回值：是一个数组，第一个参数是变量，第二个参数是用于改变变量的方法，执行函数时可以传入一个默认值
//引入
    import React, { useState } from "react";
//使用并传入初始值
      const [count, set_count] = useState(5);
//改变数据
      const fn = () => {
        set_count(fn())
      }
//整体使用
    const App = () => {
      const [count, set_count] = useState(5);
      const plus = () => {
        set_count((count) => count + 1);
      };
      const minus = () => {
        set_count((count) => count - 1);
      };
      return (
        <>
          <button onClick={minus}>-</button>
          <span>{count}</span>
          <button onClick={plus}>+ </button>
        </>
      );
    };

// 当我们需要修改部分属性如name，并且不改变其他属性时，我们可以传入一个回调函数：
    setState((prev) => {return
    	{  ...prev,  name: 'xxxx'  }
    });
```

<a name="pgGsj"></a>

##### useEffect（处理副作用）

```javascript
参数：有两个参数，第一个参数是回调函数，如果没有第二个参数，那么它相当于componentDidMount和componentDidUpdate;
    第二个参数是一个数组，数组中存放依赖；如果是空数组，那么它只相当于 componentDidMount；如果传入了依赖（变量），那么它就会有监听效果；
//引入
    import React, { useEffect } from "react";

1、仅传入回调函数-相当于componentDidUpdate()和componentWillReceiveProps()，每次数据改变都会刷新
    useEffect(() => {
      console.log();
    });

2、传入第二个参数，参数为空数组时，相当于 componentDidMount()只执行一次，可以用作数据请求
    useEffect(() => {
     callback()
    },[]);

3、传入第二个参数,当count发生 改变时触发监听，相当于shouldComponentUpdate()
    useEffect(() => {
     console.log(count);
    }, [count]);

4、模拟卸载阶段 componentWillUnmount() ，传入空数组，内部需要return
    useEffect(() => {
       window.addEventListener('scroll', removeFn);
    return () => {
      window.removeEventListener('scroll', removeFn);
    };
    }, []);

useSelector和useDispatch (redux)
useDispatch作用：在函数组件中获取store的动作

import { useSelector, useDispatch } from 'react-redux'
//在函数组件中使用：
const App = () => {
  const num = useSelector((state) => { return { data: state } });
  const dispatch = useDispatch();
  const add = () => {
    dispatch({ type: "plus" });
  };
  const minus = () => {
    dispatch({ type: "minus" });
  };
  return (
    <>
      <button onClick={minus}>-</button>
      <span>{num}</span>
      <button onClick={add}>+</button>
    </>
  );
};
```

<a name="bhgJh"></a>

##### useLayoutEffect（同步执行副作用）

```javascript
作用：防止页面抖动（页面渲染后改变DOM元素属性（位移等）会产生页面抖动），主要和DOM操作相关
```

<a name="AiDlq"></a>

##### useRef

```javascript
//使用，获取元素的值
import React, { useRef } from "react";

const Child = () => {
  let username = useRef();
  let cardid = useRef();

  const onok = () => {
    username = username.current.value;
    cardid = cardid.current.value;
    const user = { username, cardid };
    console.log(user);
  };

  return (
    <div>
      <input type="text" name="username" id="username" ref={username} />
      <input type="text" name="cardid" id="cardid" ref={cardid} />
      <button onClick={onok}>按钮</button>
    </div>
  );
};

export default Child;
```

<a name="xCWfx"></a>

##### useImperativeHandle

```javascript
作用：穿透ref
```

<a name="Jvjhb"></a>

##### useCallback（记忆函数）

```javascript
//对于类组件来说，每次改变只是render中的内容重新渲染，但对于函数组件来说是整个组件重新渲染，useCallback返回的是函数
1、父组件改变阻止函数组件子组件自动渲染 memo 高阶组件，相当于类组件的PureComponent
//使用前解构
    import React, { useState, memo } from "react";
//使用方法
    const Child = memo(() => {
      console.log("子组件渲染了");
      return (
        <>
          <p>子组件</p>
        </>
      );
    });

2、当函数子组件存在自定义事件时，父组件的重新渲染会引起子组件重新渲染，我们使用 useCallback()
作用：解决自定义事件使子组件重新渲染，被处理过得函数将会被缓存
参数：两个参数，第一个是动作函数，第二个是依赖，如果依赖改变，那么子组件将重新渲染
//使用
    const fn = useCallback(() => {
     console.log("子组件又渲染了");
    }, []);
```

<a name="TaY4k"></a>

##### useMemo

```javascript
// 写法和useCallback一致，它是usecallback的自动调，当依赖的变量改变时才重新渲染，useMemo返回的是函数运行的结果
 const sum = useMemo(() => {
  let s = 1;
  for (let i = 1; i < count * 10; i++) {
     s *= i;
  }
   return s;                                     //return的s将被缓存
 }, [count]);
//调用
    <div>{sum}</div>

//改写 useCallback(),只需要将原本的函数变成另一个函数的返回值就行
  const fn = useMemo(
    () =>() => {
      console.log(123);
  },[]);

ps:使用 useMemo 和 useCallback 优化子组件 re-render 时，必须同时满足以下条件才有效:
	1、子组件已通过 React.memo（缓存子组件） 或 useMemo 被缓存；
	2、子组件所有的 prop 都被缓存。

//例如
	const PageMemoized = React.memo(Page);

	const App = () => {
  	const [state, setState] = useState(1);
  	const onClick = useCallback(() => {
   	 console.log('Do something on click');
  	}, []);

  return (
    // Page 和 onClick 同时 memorize
   	 <PageMemoized onClick={onClick} />
  	);
	};
```

<a name="DR022"></a>

##### useContext（组件通信）

```javascript
参数：传入 createContext() 的执行结果
//使用
    import React, { createContext, useContext } from "react";
    const nameContext = createContext();

    const Child = () => {
      const { name } = useContext(nameContext);    //解构一个传入对象
      return (
        <>
          <p>这是子组件---{name}</p>
        </>
      );
    };
    const App = () => {
      return (
        <nameContext.Provider value={{ name: "父组件传参" }}>
          <p>这是父组件</p>
          <Child />
        </nameContext.Provider>
      );
    };

    export default App;
```

<a name="gI97T"></a>

# 路由相关

<a name="P7sQC"></a>

##### useHistory

```javascript
//写在函数组件最顶层
  const history = useHistory();
  console.log(history);
//打印出如下信息：
   go: ƒ go(n)
   goBack: ƒ goBack()
   goForward: ƒ goForward()
   location: {pathname: '/about', search: '', hash: '', state: undefined, key: '4kysid'}
   push: ƒ push(path, state)
  replace: ƒ replace(path, state)
```

<a name="cmmb3"></a>

##### useParams

```javascript
//写在函数组件最顶层
const Params = useParams();
console.log(Params);
//打印动态参数信息
```

<a name="NL7WG"></a>

##### useRouteMatch

```javascript
//写在函数组件最顶层
const RouteMatch = useRouteMatch();
console.log(RouteMatch);
//获取如下信息：
params: {
}
path: "/about";
url: "/about";
```

<a name="RKUwc"></a>

##### useLocation

```javascript
//写在函数组件最顶层
const Location = useLocation();
console.log(Location);
//获取如下信息：
hash: "";
key: "zf2iae";
pathname: "/about";
search: "";
state: undefined;
```

<a name="CIEnS"></a>

# redux 相关

<a name="nXXZR"></a>

##### useSelector 、 useDispatch

```javascript
import { useSelector, useDispatch } from "react-redux";
import { updateCount } from "@actions/root"; // 导入redux动作

const Index = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const handleClick = () => {
    dispatch(updateCount({ count: 2 }));
    // console.log(data);
  };

  return (
    <div className="about">
      <button onClick={() => handleClick()}>改变数据</button>
    </div>
  );
};

export default Index;
```

<a name="LYBT3"></a>

##### useReducer(无法使用中间件）

```javascript
参数：接收两个参数，第一个是reducer函数，第二个是初始的state（defaultState）
返回值：一个数组，有两项：state和dispatch
//定义数据仓库和函数
    const defaultState = { num: 20 };
    const reducer = (state, action) => {
      switch (action.type) {
        case "plus":
          return {
            ...state,
            num: state.num + 1,
          };
        case "minus":
          return {
            ...state,
            num: state.num - 1,
          };
        default:
          return { state };
      }
    };
//函数组件内部使用useReducer
    const App = () => {
      const [state, dispatch] = useReducer(reducer, defaultState);           //传入两个参数，返回两个方法待使用
      return (
        <>
          <h1>useReducer</h1>
          <button onClick={() => dispatch({ type: "minus" })}>-</button>     //写成箭头函数，防止传参时自动执行
          <span>{state.num}</span>
          <button onClick={() => dispatch({ type: "plus" })}>+</button>
        </>
      );
    };
```
