class Message {
  constructor(username, message) {
    this.username = username
    this.message = message
    this.timestamp = new Date()
  }

  render(parentElement, socket) {
    let div = document.createElement('div')
    div.classList.add('message')
    div.textContent = `${this.timestamp} ${this.username}: ${this.message}`

    div.addEventListener('click', () => {
      socket.emit('attempt-click', {username: this.username, yy: this.yy})
    })

    parentElement.appendChild(div)
  }
}
