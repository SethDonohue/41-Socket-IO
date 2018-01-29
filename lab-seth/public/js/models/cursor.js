class Cursor {
  constructor(player, isSelf) {
    this.xx = player.xx
    this.yy = player.yy
    this.username = player.username
    this.points = player.points
    this.isSelf = isSelf
  }

  render(parentElement) {
    let img = document.createElement('img')
    img.src = '/img/cursor.png'

    let div = document.createElement('div')
    div.classList.add('cursor')
    div.style.top = this.yy + 'px'
    div.style.left = this.xx + 'px'

    if (!this.isSelf) {
      div.appendChild(img)
    }

    let span = document.createElement('span')
    span.textContent = ''
    if (this.username) {
      span.textContent += this.username
    }
    span.textContent += ` (${this.points})`
    div.appendChild(span)

    parentElement.appendChild(div)
  }
}
