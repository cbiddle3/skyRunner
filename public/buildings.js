export class Building {
  constructor (game, buildingName, width, height, gap) {
    this.game = game
    this.width = width
    this.height = height
    this.image = document.getElementById(buildingName)
    this.gap = gap
    this.x = gap
    this.y = this.game.height - this.height - this.game.groundMargin
    this.markedForDeletion = false
    this.alreadyVisited = false
  }

  update () {
    this.x -= this.game.speed

    if (this.x + this.width < 0) {
      this.markedForDeletion = true
    }
  }

  draw (context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
    context.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}