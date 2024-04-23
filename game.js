// replay button code in story 16
import { Background } from './backGroundLogic.js'
import { InputHandler } from './input.js'
import { Character } from './character.js'
import { Cafe, BrownBuilding, GreenBuilding, SodaShop, SushiBuilding } from './buildings.js'
import { ScoreBoard } from './scoreBoard.js'

window.addEventListener('load', function () {
  const canvas = this.document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 1300
  canvas.height = 500

  class Game {
    constructor (width, height) {
      this.debug = true
      this.width = width
      this.height = height
      this.speed = 5
      this.score = 0
      this.groundMargin = 0
      this.background = new Background(this, 1)
      this.character = new Character(this)
      this.input = new InputHandler(this)
      this.scoreBoard = new ScoreBoard(this)
      this.fontColor = 'black'
      this.buildings = []
      this.addBuilding()
      this.buildingTimer = 0
      this.buildingInterval = 700
    }

    update (deltaTime) {
      this.background.update()
      this.character.update(this.input.keys)
      if (this.buildingTimer > this.buildingInterval) {
        this.addBuilding()
        this.buildingTimer = 0
      } else {
        this.buildingTimer += deltaTime
      }

      this.buildings.forEach(building => {
        building.update()
        if (building.markedForDeletion) {
          this.buildings.splice(this.buildings.indexOf(building), 1)
        }
      })
    }

    draw (ctx) {
      this.background.draw(ctx)
      this.character.draw(ctx)
      this.scoreBoard.draw(ctx)

      this.buildings.forEach(building => {
        building.draw(ctx)
      })
    }

    /* for right now this generation is poorly factored change w c++ */
    addBuilding () {
      const randBuildingIndex = Math.floor(Math.random() * 5)
      if (randBuildingIndex === 0) {
        this.buildings.push(new BrownBuilding(this))
      } else if (randBuildingIndex === 1) {
        this.buildings.push(new Cafe(this))
      } else if (randBuildingIndex === 2) {
        this.buildings.push(new GreenBuilding(this))
      } else if (randBuildingIndex === 3) {
        this.buildings.push(new SodaShop(this))
      } else if (randBuildingIndex === 4) {
        this.buildings.push(new SushiBuilding(this))
      }
    }
  }

  const game = new Game(canvas.width, canvas.height)
  let lastTime = 0

  function animate (timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)
    requestAnimationFrame(animate)
  }
  animate(0)
})
