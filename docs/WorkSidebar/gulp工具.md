<a name="ipEpO"></a>

##### 项目构建

```bash
Gulp.js 是基于nodejs 构建的, 它利用了Nodejs的流控制能力 辅助项目构建.
你可以快速通过Gulp构建项目 减少频繁的I/O操作.

# 全局安装的东西 每台电脑只需要进行一次安装
$ cnpm i gulp -g      # 全局安装gulp
$ cnpm i gulp-cli -g  # 全局安装gulp命令行工具
$ cnpm i gulp -D      # 项目开发依赖安装gulp(必须在项目根目录执行)
```

<a name="ffL4b"></a>

##### 代码压缩工具

```javascript
const gulp = require("gulp"); // 引入模块

// gulp.task(taskname,callback);   部署任务
// gulp.src()     源
// gulp.pipe()    管道(通道)
// gulp.dest()    目的地

gulp.task("copyindex", () => {
  return gulp.src("./src/html/index.html").pipe(gulp.dest("./dist/html"));
});
gulp.task("copyjs", () => {
  return gulp
    .src(["./src/js/*.js", "!src/js/index.js"]) //反选
    .pipe(gulp.dest("./dist/js"));
});

//第三方模块
gulp - htmlmin; //压缩HTml
gulp - cssmin; //压缩CSS
gulp - ugify; //压缩JS
gulp - imagemin; //压缩图片
gulp.spritesmith; //精灵图制作
gulp - concat; //合并文件
gulp - less; //编译less
```
