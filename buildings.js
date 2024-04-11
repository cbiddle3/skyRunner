class Building {
  constructor () {
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

export class BrownBuilding extends Building {
  constructor (game) {
    super()
    this.game = game
    this.width = 100
    this.height = 130
    this.gap = 30
    this.image = document.getElementById('brown-building')
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
  }
}

export class Cafe extends Building {
  constructor (game) {
    super()
    this.game = game
    this.width = 150
    this.height = 85
    this.gap = 30
    this.image = document.getElementById('cafe')
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
  }
}

export class GreenBuilding extends Building {
  constructor (game) {
    super()
    this.game = game
    this.width = 100
    this.height = 170
    this.gap = 30
    this.image = document.getElementById('green-building')
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
  }
}

export class SodaShop extends Building {
  constructor (game) {
    super()
    this.game = game
    this.width = 200
    this.height = 90
    this.gap = 30
    this.image = document.getElementById('soda-shop')
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
  }
}

export class SushiBuilding extends Building {
  constructor (game) {
    super()
    this.game = game
    this.width = 100
    this.height = 150
    this.gap = 30
    this.image = document.getElementById('sushi-building')
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
  }
}
