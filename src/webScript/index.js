const io = require('socket.io-client');
// 连接客户端
const socket = io('http://localhost:19871');
window.clipscreen = {};


function sendMsg(callback) {
  socket.emit('clip','web', callback);
}
window.clipscreen = {
  sendMsg:sendMsg
}

module.exports = sendMsg;

