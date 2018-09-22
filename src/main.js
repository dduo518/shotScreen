var { app, BrowserWindow } = require('electron');
var screenShot = require('./mainProcess');
// var _ = require('lodash');
var path = require('path'),
    url = require('url');
var mainRenderUrl = "./index.html"
var win = null;
app.on("ready", function () {
    win = createWindow(mainRenderUrl, { show: false });
    // win.webContents.openDevTools();
    screenShot(win.webContents);
})

function createWindow(_url, opts) {
    var config = {}
    config = Object.assign(config, opts)
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


