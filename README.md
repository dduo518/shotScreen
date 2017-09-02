# shotScreen
# electron 的一个截图插件工具

### 测试案例
#### 下载之后 
#####  $ npm i electron -g 
#####  $ electron .



### 使用方式
####  下载文件之后 主进程中引入 文件 
##### var screenShot = require('./screen/mainProcess/screenshot');
##### 然后执行并传入win 实例及配置
##### screenShot(win.webContents,{quit:'ctrl+shift+q',shotKey:'ctrl+alt+d'});
##### quit:退出快捷键   shotKey：截图快捷键
#### 渲染进程
##### require('./screen/renderProcess/main-process');
##### 在截图按钮中给与属性 data-clipScreen='clipBtn'；
