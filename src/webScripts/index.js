const io = require('socket.io-client');
// 连接客户端
const socket = io('http://localhost');
window.clipscreen = {};

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
function sendMsg(callback) {
  socket.emit('clip','web', callback);
}

/**
 * 修改配置
 * @param {Object} options
 * 
 * var options = {
 *      shotKey:"",  // default 'ctrl+shift+q'
 *      cancelShot:"", // default 'ctrl+shift+d'
 *      
 * }
 * sendChangeKey(options)
 *  
 */
function sendChangeKey(options = {}) {
  socket.emit('changeKey', options);
}


window.clipscreen = {
  sendMsg: sendMsg,
  sendChangeKey: sendChangeKey
}

module.exports = exports = {
  sendMsg: sendMsg,
  sendChangeKey: sendChangeKey
};

