class Pixel {
  constructor(xx, yy, size) {
    this.xx = xx
    this.yy = yy
    this.size = size
  }

  render(parentElement, socket) {
    let div = document.createElement('div')
    div.classList.add('pixel')
    div.style.left = this.xx + 'px'
    div.style.top = this.yy + 'px'
    div.style.width = this.size + 'px'
    div.style.height = this.size + 'px'

    div.addEventListener('click', () => {
      socket.emit('attempt-click', {xx: this.xx, yy: this.yy})
    })

    parentElement.appendChild(div)
  }
}
