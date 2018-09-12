const { exec } = require("child_process")
const treeKill = require('tree-kill')
let YELLOW = '\x1b[33m'
let BLUE = '\x1b[34m'
let END = '\x1b[0m'

let isElectronOpen = false

function format(command, data, color) {
  return color + command + END +
    '  ' + // Two space offset
    data.toString().trim().replace(/\n/g, '\n' + repeat(' ', command.length + 2)) +
    '\n'
}

function repeat(str, times) {
  return (new Array(times + 1)).join(str)
}

let children = []
function run(command, color, name) {
  let child = exec(command)
  child.stdout.on('data', data => {
    console.log(format(name, data, color))
  })

  child.stderr.on('data', data => console.error(format(name, data, color)))
  child.on('exit', code => exit(code))

  children.push(child)
}

function exit(code) {
  children.forEach(child => {
    treeKill(child.pid)
  })
}
run("npm run appdev", YELLOW, 'app')
run('npm run webdev', BLUE, 'web')