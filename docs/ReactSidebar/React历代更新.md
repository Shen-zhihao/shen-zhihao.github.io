<a name="fMLBB"></a>

# react16 之前更新

React Fiber 是 16 版本之后的一种更新机制，使用链表取代了树，是一种 fiber 数据结构，其有三个指针，分别指向了父节点、子节点、兄弟节点，当中断的时候会记录下当前的节点，然后继续更新，而 15 版本中的 DOM stack 不能有中断操作，它把组件渲染的工作分片，到时会主动让出渲染主线程；提炼 fiber 的关键词，大概给出如下几点：<br />fiber 是一种数据结构。<br />fiber 使用父子关系以及 next 的妙用，以链表形式模拟了传统调用栈。<br />fiber 是一种调度让出机制，只在有剩余时间的情况下运行。<br />fiber 实现了增量渲染，在浏览器允许的情况下一点点拼凑出最终渲染效果。<br />fiber 实现了并发，为任务赋予不同优先级，保证了一有时间总是做最高优先级的事，而不是先来先占位死板的去执行。<br />fiber 有协调与提交两个阶段，协调包含了 fiber 创建与 diff 更新，此过程可暂停。而提交必须同步执行，保证渲染不卡顿。
<a name="R57US"></a>

# react16 到 react17 更新

<a name="fVAMQ"></a>

### 1、新的 JSX 转换

**React 16 原理**<br />babel-loader 会预编译 JSX 为 React.createElement(...)<br />**React 17 原理**<br />React 17 中的 JSX 转换不会将 JSX 转换为 React.createElement，而是自动从 React 的 package 中引入新的入口函数并调用。<br />另外此次升级不会改变 JSX 语法，旧的 JSX 转换也将继续工作。
<a name="J9O7o"></a>

### 2、事件代理更改

在 React 17 中，将不再在后台的文档级别附加事件处理程序，不在 document 对象上绑定事件，改为绑定于每个 react 应用的 rootNode 节点，因为各个应用的 rootNode 肯定不同，所以这样可以使多个版本的 react 应用同时安全的存在于页面中，不会因为事件绑定系统起冲突。react 应用之间也可以安全的进行嵌套。
<a name="ZYjrr"></a>

### 3、事件池(event pooling)的改变

React 17 去除了事件池(event pooling)，不在需要 e.persist()，现在可以直接在异步事件中（回掉或 timeout 等）拿到事件对象，操作更加直观，不会令人迷惑。e.persist()仍然可用，但是不会有任何效果。
<a name="Sappu"></a>

### 4、异步执行

React 17 将副作用清理函数(useeffect)改为异步执行，即在浏览器渲染完毕后执行。
<a name="qV38D"></a>

### 5、forwardRef 和 memo 组件的行为

React 17 中 forwardRef 和 memo 组件的行为会与常规函数组件和 class 组件保持一致。它们在返回 undefined 时会报错。
