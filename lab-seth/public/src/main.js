'use strict'

const socket = io();

let sendMessageForm = document.getElementById('send-message-form')
let changeUsernameForm = document.getElementById('change-username-form')
let messageInput = document.getElementById('message-input')
let usernameInput = document.getElementById('username-input')
let messagesContainer = document.getElementById('messages')

let tempUsername = null
socket.username = `annonymous${Math.floor(Math.random()*1000)}`
console.log('Your USERNAME:', socket.username)

sendMessageForm.addEventListener('submit', (event) => {
  event.preventDefault()

  let message = new Message(socket.username, messageInput.value)
  socket.emit('send-message', {
    username: message.username,
    message: message.message,
    timestamp: message.timestamp,
  })
})

changeUsernameForm.addEventListener('submit', (event) => {
  event.preventDefault()
  let username = usernameInput.value
  socket.emit('username-change', { previousUsername: socket.username, username: username })
  tempUsername = socket.username
  socket.username = username
})

socket.on('receive-message', (data) => {
  console.log('RECEIVED:', data)

  let message = new Message(data.username, data.message, data.timestamp)

  message.render('messages')
})

socket.on('username-change', (data) => {
  console.log('Username Changed:', data)

  let div = document.createElement('div')
  div.textContent = `${tempUsername} is now known as: ${data.username}`
  
  messagesContainer.appendChild(div)
})