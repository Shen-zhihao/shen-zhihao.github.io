## axios 配置拦截器

```javascript
// 进阶使用
拦截器是axios实例带有的一个机制;

// 创建实例axios.create([options])
let instance = axios.create({
  baseURL: "http://localhost:8080/",
});
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 只要你想发请求 就会被请求拦截器 拦截
  // config就是axios封装的请求对象
  // config中有一个 headers 就是请求头

  if (config.url === "/login") return config;

  // 添加一个token到请求头
  config.headers.authorization = localStorage.getItem("token");
  // console.log('我被触发了');
  // console.log(config);
  return config; // 放出信息
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.status === 404) return (lcoation.href = "404.html"); //拦截并且跳转新页面

  return response.data;
});
```
