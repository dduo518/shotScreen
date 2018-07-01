const { ipcMain, dialog, globalShortcut, BrowserWindow} = require('electron');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// 启动一个socket服务
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(19871);

function handler(req, res) {
    res.writeHead(200);
    return res.end('Error loading index.html');
}


// // 退出快捷键
// var quitShot = (obj && obj.quit) || 'ctrl+shift+q';
// var shotKey = (obj && obj.shotKey) || 'ctrl+alt+d';
// var quitShot = 'ctrl+shift+q';
// var shotKey =  'ctrl+alt+d';

// globalShortcut.register(quitShot, function() {
//     ipcMain.send('quit-cut', 1);
// });

// // 截图快捷键
// globalShortcut.register('ctrl+alt+d', function() {
//     ipcMain.send('global-shortcut-capture', 1);
// });



/**
 * 创建截屏窗口
 */
function createChildWin(_url, opts) {
    var config = {
        fullscreen: true,
        transparent: true, /* new add line */
        frame: false
    }
    config = Object.assign(config, opts)
    var _win = new BrowserWindow(config);
    _win.loadURL(url.format({
        pathname: path.join(__dirname + _url),
        protocol: 'file',
        slashes: true
    }))

    _win.on('closed', () => {
        _win = null;
    })
    _win.on('close', () => {
        _win = null;
    })
    return _win;
}


function screenShot() {
    if (!win) {
        capturer().then(function (data) {
            win = createChildWin('/index.html', { fullscreen: true, width: 900, height: 800, alwaysOnTop: true, skipTaskbar: false, autoHideMenuBar: true, });
            // win.webContents.openDevTools()
        });
    }
    return win;
} 

module.exports = function (webContents) {
    
    // 接收截图工具信号
    ipcMain.on('screenshot-page', function (sender, message) {
        switch (message.type) {
            case 'close':
                myEmitter.emit('screenshot', message);
                webContents.send('quit-cut')
                break;
            default:
                break;
        }
    });
    
    io.on('connection', function (socket) {
        socket.on('clip', (name, fn) => {
            // 完成截图之后返回给web页面
            myEmitter.on('screenshot', function (message) {
                fn(message);
            })
            webContents.send('global-shortcut-capture', 1);
        });
        socket.on('register', (name, fn) => {

        })
    })

}