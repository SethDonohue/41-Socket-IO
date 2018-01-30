'use strict'

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('./public'))

io.on('connection', (socket) => {
  console.log(`User @ socket: ${socket.id} joined.`)

  socket.on('disconnect', () => {
    console.log(`User @ socket: ${socket.id} left`)
  })

  socket.on('send-message', (data) => {
    console.log(`${data.username} said: ${data.message}`)
    io.emit('receive-message', data)
  })

  socket.on('username-change', (data) => {
    console.log(`Username Change from: ${data.previousUsername} to: ${data.username}`)
    io.emit('username-change', data)
  })
})

const port = 3333
http.listen(port, () => {
  console.log('http://localhost: ' + port)
})
