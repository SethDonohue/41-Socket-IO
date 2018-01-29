const socket = io()
const messages = document.getElementById('messages')
const usernameForm = document.getElementById('submit-player-name')

usernameForm.addEventListener('submit', (ev) => {
  ev.preventDefault();

  let usernameEl = document.getElementById('username-input')
  let username = usernameEl.value
  if (username === '') {
    return
  }

  socket.emit('submit-username', {username})
})

document.addEventListener('mousemove', (ev) => {
  let xx = ev.pageX
  let yy = ev.pageY
  socket.emit('mousemove', {xx, yy})
})

let DOING_PLAYER_DATA = false
socket.on('playerdata', (msg) => {
  if (DOING_PLAYER_DATA) {
    return
  }
  DOING_PLAYER_DATA = true

  removeAllByClassName('cursor')
  removeAllByClassName('player')

  let playersList = document.getElementById('players')

  for (let id in msg) {
    let player = msg[id]
    let isSelf = id === socket.id

    if (isSelf) {
      let usernameEl = document.getElementById('username-input')
      if (usernameEl.value === '') {
        usernameEl.value = player.username
      }
    }

    // only draw cursors if people have actually moved
    if (!player.hasMoved) {
      continue
    }

    // don't draw an image for our own cursor
    let cursor = new Cursor(player, isSelf);
    cursor.render(document.body)
  }

  DOING_PLAYER_DATA = false
})

socket.on('receive-point', (msg) => {
  removeAllByClassName('pixel')

  let pixel = new Pixel(msg.xx, msg.yy, msg.size)
  pixel.render(document.body, socket)
})

socket.on('receive-winner', (msg) => {
})

function removeAllByClassName(className) {
  let els = document.getElementsByClassName(className)
  for (let i = 0; i < els.length; i++) {
    els[i].parentElement.removeChild(els[i])
  }
}
