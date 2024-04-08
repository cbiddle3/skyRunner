export class Background {
  constructor (game, speedModifier) {
    this.game = game
    this.x = 0
    this.y = 0
    this.width = 1300
    this.height = 500
    this.image = document.getElementById('backgroundImage')
    this.speedModifier = speedModifier
  }

  update () {
    if (this.x <= -this.width) {
      this.x = 0
    } else {
      this.x -= this.game.speed * this.speedModifier
    }
  }

  draw (ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}
