class Message {
  constructor(username, message, timestamp = (new Date()).toLocaleTimeString()) {
    this.username = username
    this.message = message
    this.timestamp = timestamp
  }

  render(parentString) {
    let parentElement = document.getElementById(parentString)
    let div = document.createElement('div')
    div.classList.add('message')
    div.textContent = `${this.timestamp} ${this.username}: ${this.message}`

    parentElement.appendChild(div)
  }
}