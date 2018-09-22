# shotScreen
# electron 的一个web截图插件工具
![示例](https://github.com/chong0808/shotScreen/blob/master/asset/images/11.png)

> 开发版本的桌面应用 https://github.com/chong0808/shotScreen/releases/tag/v1.0

### 测试案例
#### 下载之后　全局安装　electron 
#####  $ npm i electron -g

### 文件结构
```
├── dist  // 生成的文件
│   ├── setup
│   │   ├── build  // 安装包资源
│   │   └── shotscreen-win32-x64  // 打包的文件
│   └── web // 渲染进程引入的文件
│       └── shotScreen.js //  web页面需要引入的文件
├── src  // 插件主要文件
│   ├── mainProcess
│   │   └── index.js  // 主要负责通讯
│   ├── webScripts    // web页面引用文件
│   │   └── index.js  
│   ├── index.html // 后台隐藏的常驻渲染进程
│   ├── index.js  // 接收信号
│   ├── main.js  // 应用启动文件
│   └── renderProcess // 渲染进程引入的文件
│       ├── asset  // 资源文件
│       ├── index.html // 创建截图渲染进程的文件
│       └── main.js //  创建截图渲染进程中 对图片剪切操作的文件 主要就是canvas的操作
├── README.md
└── package.json
```

### 开发模式 使用方式
```
$ npm start  // 1.启动一个测试环境web服务器 2. 启动主应用程序
```
#####　打开 http://localhost:8080/

---

### 文档
#### 使用方式
1. 安装包资源 shotscreen setup.exe 安装之后 默认全局截图快捷键 Ctrl+Alt+D
2. web页面引入资源包 shotScreen.js 
    
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

<button id="shotScreen">截图</button>
<button id="changeKey">修改配置</button>

  
<script type="text/javascript" src="app.js"></script><script type="text/javascript" src="shotScreen.js"></script></body>
</html>

```
###### 或者

```
const shotScreen = require("./src/webScripts")
const btn = document.getElementById("shotScreen");
const changeKey = document.getElementById("changeKey");
btn.addEventListener("click",function () {
  shotScreen.sendMsg(function (data) {
    console.log(data)
  })
})  

changeKey.addEventListener("click", function () {
  shotScreen.sendChangeKey({ shotKey: "ctrl+A", cancelShot:"ctrl+Z"})
})  
```
##### 全局暴露 window.clipscreen 
```
/**
 * 发送截图命令 返回保存的路径跟base64的信息
 * @param {Function} callback 
 * @return {Object} 
 * {
 *   type:"close",
 *   message:{
 *     base64:"data:image/png;base64,iVBORw0KGgoAAA",
 *     path:"C:\Users\z_chong\Desktop\jietu.jpg"
 *   }
 * }
 */
 
/**
 * 修改配置
 * @param {Object} options
 * 
 * var options = {
 *      shotKey:"",  // default 'Esc'
 *      cancelShot:"", // default 'ctrl+shift+d'
 *      
 * }
 * sendChangeKey(options)
 *  
 */
 
window.clipscreen = {
  sendMsg: sendMsg,  
  sendChangeKey: sendChangeKey
}

module.exports = exports = {
  sendMsg: sendMsg,
  sendChangeKey: sendChangeKey
};

```

### TODO LIST
---
- [x] 1. 打包应用app
- [x] 2. 应用自动启动
- [ ] 3. 应自动更新

