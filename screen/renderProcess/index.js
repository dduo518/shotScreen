var { remote, desktopCapturer, ipcRenderer } = require('electron');
// var _ = require('lodash');
var url = require('url');
var path = require('path');
var BrowserWindow = remote.BrowserWindow,
    ipc = ipcRenderer;
globalShort = remote.globalShortcut;
var w = screen.width,
    h = screen.height;
var win = null;


// 点击事件绑定
document.body.addEventListener('click', function(event) {
    if (event.target.dataset.clipscreen) {
        screenShot ();
        return false;
    }
})

// 去除默认选择
document.onselectstart = function() {
    return false;
}

function screenShot(){
    if (!win) {
        capturer().then(function(data) {
            win = createChildWin('/index.html', { fullscreen: true, width: 900, height: 800, alwaysOnTop: true, skipTaskbar: false, autoHideMenuBar: true, });
            // win.webContents.openDevTools()
        });
    }
    return win;
} 

ipc.on('global-shortcut-capture', function() {
    capturer().then(function(data) {
        win = createChildWin('/index.html', { fullscreen: true, width: 900, height: 800, alwaysOnTop: true, skipTaskbar: false, autoHideMenuBar: true, });
        // win.webContents.openDevTools()
    });
})

// 接受截图退出事件
ipc.on('quit-cut', (message) => {
    win && clearWindow(win);
    win = null;
});

/**
 * 创建截屏窗口
 */
function createChildWin(_url, opts) {
    var config = {
        fullscreen: true,
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


/**
 * 关闭窗口 取消截屏
 * @param  _win 
 */
function clearWindow(_win) {
    _win && _win.close()
}

/**
 * 截取屏幕资源到本地
 */
function capturer() {
    return new Promise(function(resolve, reject) {
        desktopCapturer.getSources({ types: ['window', 'screen'], thumbnailSize: { width: w, height: h } }, (error, sources) => {
            if (error) console.error(error);
            localStorage['image'] = sources[0].thumbnail.toDataURL();
            resolve(sources[0].thumbnail.toDataURL())
        })
    })
}


module.exports = screenShot;