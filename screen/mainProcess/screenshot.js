const { ipcMain, dialog } = require('electron');


module.exports = function(winContent) {
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
};