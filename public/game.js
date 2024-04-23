import { Background } from './backGroundLogic.js'
import { InputHandler } from './input.js'
import { Character } from './character.js'
import { Building } from './buildings.js'
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
      this.speed = 4
      this.score = 0
      this.groundMargin = 0
      this.background = new Background(this, 1)
      this.character = new Character(this)
      this.input = new InputHandler(this)
      this.scoreBoard = new ScoreBoard(this)
      this.fontColor = 'black'
      this.buildings = []
      this.buildingTimer = 0
      this.buildingInterval = 800
      this.gap = 0
      this.particles = []
    }

    update (deltaTime) {
      this.background.update()
      this.character.update(this.input.keys)
      if (this.buildingTimer > this.buildingInterval) {
        fetch('http://localhost:3001/api/random-gap')
          .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
          })
          .then(result => {
            console.log('Received data:', result);
            this.gap += Number(result.result)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        fetch('http://localhost:3001/api/random-building-data')
          .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
          })
          .then(data => {
            console.log('Received data:', data);
            let buildingWidth = Number(data.data[1])
            let buildingHeight = Number(data.data[2])
            this.buildings.push(new Building(this, data.data[0], buildingWidth, buildingHeight, this.gap))})
          .catch(error => {
            console.error('Error fetching data:', error);
          });
          console.log(this.buildings)
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

      this.particles.forEach((particle, index) => {
        particle.update()
        if (particle.markedForDeletion) {
          this.particles.splice(index, 1)
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

      this.particles.forEach((particle) => {
        particle.draw(ctx)
      })
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
