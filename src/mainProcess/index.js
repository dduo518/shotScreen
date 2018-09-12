const { ipcMain,globalShortcut } = require('electron');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
module.exports = function(winContent,obj) {
    // 接收截图工具信号
    ipcMain.on('screenshot-page', function(sender, message) {
        switch (message.type) {
            case 'close':
                winContent.send('quit-cut')
                break;
            default:
                break;
        }
    });
    
    // 退出快捷键
    var quitShot = (obj&& obj.quit) || 'ctrl+shift+q';
    var shotKey = (obj && obj.shotKey) || 'ctrl+alt+d';
    
    globalShortcut.register(quitShot, function() {
        winContent.send('quit-cut', 1);
    });

    // 截图快捷键
    globalShortcut.register(shotKey, function() {
        winContent.send('global-shortcut-capture', 1);
    });

    // 默认退出快捷键 无法更改
    globalShortcut.register("Esc", function () {
        winContent.send('quit-cut', 1);
    });

    // 启动一个socket服务
    var io = require('socket.io')(80);

    io.on('connection', function (socket) {
        // 接收截图工具信号
        ipcMain.on('screenshot-page', function (sender, message) {
            switch (message.type) {
                case 'close':
                    myEmitter.emit('screenshot', message);
                    winContent.send('quit-cut')
                    break;
                default:
                    break;
            }
        });

        socket.on('clip', (name, fn) => {
            // 完成截图之后返回给web页面
            myEmitter.on('screenshot', function (message) {
                fn(message);
            })
            winContent.send('global-shortcut-capture', 1);
        });
        socket.on('changeKey', (obj, fn) => {
            if (obj && obj.cancelShot) {
                globalShortcut.unregister(quitShot)
                globalShortcut.register(obj.cancelShot, function () {
                    winContent.send('quit-cut', 1);
                })
            }
            if (obj && obj.shotKey) {
                globalShortcut.unregister(shotKey)
                globalShortcut.register(obj.shotKey, function () {
                    winContent.send('global-shortcut-capture', 1);
                })
            }
        })
    })
};
