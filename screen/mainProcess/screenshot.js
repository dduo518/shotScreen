const { ipcMain, dialog,globalShortcut } = require('electron');


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
    var shotKey = (obj&& obj.shotKey) || 'ctrl+alt+d';

    globalShortcut.register(quitShot, function() {
        winContent.send('quit-cut', 1);
    });
    // 截图快捷键
    globalShortcut.register('ctrl+alt+d', function() {
        winContent.send('global-shortcut-capture', 1);
    });
};