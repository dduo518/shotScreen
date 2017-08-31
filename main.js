var { app, BrowserWindow, globalShortcut, ipcMain, Tray } = require('electron');
var screenShot = require('./screen/mainProcess/screenshot');
var _ = require('lodash');
var path = require('path'),
    url = require('url');
var win = null;
app.on('window-all-closed', () => {
    app.quit()
})
app.on('ready', () => {
    var url = '/index.html';
    win = createWindow(url);
    win.webContents.openDevTools();
    screenShot(win.webContents);
})


/**
 * 创建快捷键
 */
// 退出快捷键
// globalShortcut.register('ctrl+shift+q', function() {
//     // win.webContents.send('global-shortcut-quit', 1);
// });
// // 截图快捷键
// globalShortcut.register('ctrl+shift+c', function() {
//     // win.webContents.send('global-shortcut-capture', 1);
//     // win.webContents.send('global-shortcut-capture', 1);
// });

function createWindow(_url, opts) {
    var config = {
        width: 800,
        height: 500
    }
    config = _.assign(config, opts)
    var _win = new BrowserWindow(config);
    _win.loadURL(url.format({
            pathname: path.join(__dirname + _url),
            protocol: 'file',
            slashes: true
        }))
        // _win.webContents.openDevTools();
    _win.on('closed', () => {
        _win = null;
    })
    _win.on('close', () => {
        win[_win.id] = null;
    })
    return _win;
}