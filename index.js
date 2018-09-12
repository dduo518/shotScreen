const shotScreen = require("./src/webScripts")
const btn = document.getElementById("shotScreen");
const changeKey = document.getElementById("changeKey");
console.log(shotScreen)
btn.addEventListener("click",function () {
  shotScreen.sendMsg(function (data) {
    console.log(data)
  })
})  

changeKey.addEventListener("click", function () {
  shotScreen.sendChangeKey({ shotKey: "ctrl+A", cancelShot:"ctrl+Z"})
})  