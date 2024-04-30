import { Dust } from './dust.js'

export class Character {
  constructor (game) {
    this.game = game
    this.died = false
    this.jumping = false
    this.currentBuildingHeight = 0
    this.image = document.getElementById('old-man')
    this.width = 32
    this.vy = 0
    this.height = 57
    this.x = 5
    this.y = this.game.height - this.height - this.game.groundMargin
    this.weight = 2
    this.onBuilding = false
    this.nextBuildingIndex = 1
    this.nextBuildingHeight = 0
    this.start = true
  }

  update (input) {
    this.checkCollision()
    this.handleInput(input)
    // vertical movement
    this.y += this.vy
    if (!this.onGround()) {
      this.vy += this.weight
    } else {
      this.vy = 0
      this.jumping = false
    }
    // character dies when they fall through the gaps
    if (!this.onBuilding && this.y > this.game.height - this.nextBuildingHeight && !this.jumping) {
      this.y = -this.game.height
      this.died = true
      this.game.endGame()
    }
  }

  handleInput (input) {
    if (input.includes('Enter')) {
      if (this.onGround() && this.jumping === false) {
        this.jumping = true
        this.vy -= 27
      }
    }
  }

  draw (context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height)
    if (!this.jumping) {
      this.game.particles.push(new Dust(this.game, this.x + this.width * 0.5, this.y + this.height))
    }
  }

  onGround () {
    return (this.y >= this.game.height - this.height - this.currentBuildingHeight)
  }

  checkCollision () {
    this.onBuilding = false
    this.currentBuildingHeight = 0
    this.game.buildings.forEach((building, index) => {
      /*  checks that the characters x position is located on the building,
      that the character is not dead, and that the feet of the character are at least
      the height of the building it's positioned on */
      if (building.x < this.x + this.width &&
        building.x + building.width > this.x + (this.width / 9) && // width / 9 gives slight leeway for when jump
        this.y >= this.game.height - building.height - this.height &&
        !this.died) {
        this.currentBuildingHeight = building.height
        if (!this.jumping) {
          this.y = this.game.height - this.height - building.height
        }
        this.onBuilding = true
        if (!building.alreadyVisited) {
          this.game.score += 1
        }
        building.alreadyVisited = true
        this.nextBuildingHeight = index + 1
      } else if (index === this.nextBuildingIndex) {
        this.nextBuildingHeight = building.height
      }
    })
  }
}
