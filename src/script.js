var { remote, desktopCapturer, ipcRenderer } = require('electron');
var url = require('url');
var path = require('path'); 
var clipRenderUrl = "/renderProcess/index.html" 
var BrowserWindow = remote.BrowserWindow,
    ipc = ipcRenderer;
var win = null;
function screenShot(event, arg) {
    if (!win) {
        capturer({ width: screen.width, height: screen.height }).then(function(data) {
            win = createChildWin(clipRenderUrl, {
                fullscreen: true
            });
            win.on('closed', () => {
                win = null;
            })
            // win.webContents.openDevTools()
        });
    }
    return win;
} 

ipc.on('global-shortcut-capture', function (event, arg) {
    screenShot(event, arg)
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
        transparent: true, /* new add line */
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        autoHideMenuBar: true,
        movable: false,
        resizable :false
    }
    config = Object.assign(config, opts)
    var _win = new BrowserWindow(config);
    _win.loadURL(url.format({
        pathname: path.join(__dirname + _url),
        protocol: 'file',
        slashes: true
    }))

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
function capturer(data) {
    return new Promise(function(resolve, reject) {
        desktopCapturer.getSources({ types: ['window', 'screen'], thumbnailSize: { width: data.width, height: data.height } }, (error, sources) => {
            if (error) console.error(error);
            localStorage['image'] = sources[0].thumbnail.toDataURL();
            resolve(sources[0].thumbnail.toDataURL())
        })
    })
}
