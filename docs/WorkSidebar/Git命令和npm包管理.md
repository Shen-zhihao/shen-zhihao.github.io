<a name="imYJD"></a>

# Git 操作

```git
# 查看状态
$ git status

# 添加管理(将文件或目录添加到本地仓库的暂存区)
$ git add filename  # 将指定的文件添加到暂存区
$ git add path/     # 将指定的目录添加到暂存区
$ git add .         # 将当前目录所有内容(文件和文件夹)添加到暂存区
$ git add --all     # 将当前目录所有内容(文件和文件夹)添加到暂存区

# 将文件移出暂存区
$ git rm --cached filenamed

# 将暂存区的内容提交到本地仓库 （yarn lint:fix   处理eslint格式）
$ git commit -m '版本号'

# 查看提交日志
$ git log

# 恢复历史版本
$ git reset --hard hash(前六位)

# 查看帮助
$ git --help

# 恢复文件
$ git checkout filename

# 保存当前未commit的代码
git stash

# 保存当前未commit的代码并添加备注
git stash save "备注的内容"

# 列出stash的所有记录
git stash list

# 删除stash的所有记录
git stash clear

# 应用最近一次的stash
git stash apply

# 应用最近一次的stash，随后删除该记录
git stash pop

# 删除最近的一次stash
git stash drop

# 查看分支
$ git branch

#更新远程分支
$git remote update origin --prune

# 创建分支
$ git branch 分支名

#推送/拉取到远程分支
$git push/pull origin 分支名

# 切换分支
$ git checkout 分支名

# 返回上游分支
$ git checkout -

# 合并远程分支
$ git merge 远程分支名

#代码冲突后，放弃或者退出流程：
#放弃,回到操作前的样子，就像什么都没发生过
$ gits cherry-pick --abort

#退出,不回到操作前的样子,即保留已经 cherry-pick 成功的 commit，并退出 cherry-pick 流程：
$git cherry-pick --quit

#删除本地已合并的分支：
$ git branch -D [branchName]

#删除远程分支:
$ git push origin --delete [branchname]

# 添加远程仓库地址 并取名 origin
$ git remote add origin url    //一般新建仓库就有，直接复制

# 创建并切换到 XXX 分支
$ git branch -M XXX

# 将本地仓库推送到远程仓库
$ git push -u origin 分支名    //一般新建仓库就有，直接复制   //git push -u origin master   主分支

#如果返回： fatal: 远程 origin 已经存在。   此时只需要将远程配置删除，重新添加即可；
git remote rm origin

# 克隆远程仓库(从无到有)
$ git clone https://github.com/jxsrzj0325/mi.com.git

# 从远程仓库拉取分支(更新)
$ git pull origin master

# 查看所有tag
$ git tag -l

# 打tag
$ git tag v1.0.0

# 提交tag
$ git push origin v1.0.0
```

<a name="meYnS"></a>

# npm 包管理工具

<a name="EoVl5"></a>

##### npm 包管理工具

```bash
在将目录结构创建好以后
1. 填写一个git忽略文件
2. 初始化项目(在项目根目录执行)
`$ npm init -y`
3. 初始化代码管理工具
`$ git init`

项目的代码 划分成三类
1. 源代码(用于开发环境)
2. 第三方代码(jquery bootstrap)
3. 部署代码(用于部署服务器环境的代码 由工具生成)

第三方工具(库) 安装
$ cnpm install[i] package[@verstion] -g             # 全局安装(命令行工具)
$ cnpm install[i] package[@verstion] --save[-S]     # 项目依赖安装(项目中需要用到的代码)
$ cnpm install[i] package[@verstion] --save-dev[-D] # 项目开发依赖安装(开发工具)

使用 npm/cnpm 安装依赖时 需要在项目的根目录执行命令
osx用户进行全局安装时 需要获得超级管理员权限 `sudo -s`

$ cnpm uninstall pakcage --save   # 卸载模块

进入工程目录，项目初始化

$ npm init -y

初始化完成会在项目根目录生成一个文件 package.json
$npm install     //安装所以记录的依赖

使用cnpm工具代替npm工具 (推荐)
$ npm install cnpm -g --registry=https://registry.npm.taobao.org/
```

<a name="ttGSY"></a>

##### nrm 工具

```bash
npm(nodejs包管理工具库) 它的服务器在国外 访问速度慢,使用国内镜像提升访问速度,国内的npm镜像由阿里云免费提供

使用 nrm 工具切换镜像源
$ npm install nrm -g   # 全局安装nrm
$ nrm ls               # 查看所有镜像源
$ nrm use taobao       # 切换到taobao镜像
```
