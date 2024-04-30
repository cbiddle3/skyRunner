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
      this.gameStart = true
      this.debug = true
      this.width = width
      this.height = height
      this.speed = 6
      this.score = 0
      this.groundMargin = 0
      this.background = new Background(this, 0.5)
      this.character = new Character(this)
      this.input = new InputHandler(this)
      this.scoreBoard = new ScoreBoard(this)
      this.fontColor = 'white'
      this.buildings = []
      this.buildingTimer = 0
      this.buildingInterval = 7000
      this.totalGap = 0
      this.gaps = []
      this.particles = []
    }

    update (deltaTime) {
      this.background.update()
      this.character.update(this.input.keys)

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

      if (this.buildingTimer > this.buildingInterval || this.gameStart) {
        if (this.gameStart) {
          this.initFetchRandData()
        } else {
          this.fetchRandData()
        }
        this.buildingTimer = 0
      } else {
        this.buildingTimer += deltaTime
      }
      this.gameStart = false
    }

    async initFetchRandData () {
      fetch('http://localhost:3001/api/random-gap')
        .then(response => {
          return response.json()
        })
        .then(result => {
          for (let x = 0; x < 10; x++) {
            this.gaps.push(Number(result.randGaps[x]) + 10)
          }
        })
        .then(() => {
          fetch('http://localhost:3001/api/random-building-data')
            .then(response => {
              return response.json()
            })
            .then(data => {
              for (let x = 0; x < 10; x++) {
                let buildingWidth = Number(data.data[x][1])
                const buildingHeight = Number(data.data[x][2])
                if (x === 0) {
                  buildingWidth = 200
                  this.buildings.push(new Building(this, 'soda-shop', 200, 90, 0))
                } else {
                  this.buildings.push(new Building(this, data.data[x][0], buildingWidth, buildingHeight, this.gaps[x] + this.totalGap))
                  this.totalGap += this.gaps[x] + 10
                }
                this.totalGap += buildingWidth
              }
            })
        })
        .then(() => {
          fetch('http://localhost:3001/api/random-building-data')
            .then(response => {
              return response.json()
            })
            .then(data => {
              for (let x = 0; x < 10; x++) {
                const buildingWidth = Number(data.data[x][1])
                const buildingHeight = Number(data.data[x][2])
                this.buildings.push(new Building(this, data.data[x][0], buildingWidth, buildingHeight, this.gaps[x] + this.totalGap))
                this.totalGap += buildingWidth
                this.totalGap += this.gaps[x] + 10
              }
              this.gaps = []
            })
        })
    }

    async fetchRandData () {
      fetch('http://localhost:3001/api/random-gap')
        .then(response => {
          return response.json()
        })
        .then(result => {
          for (let x = 0; x < 10; x++) {
            this.gaps.push(Number(result.randGaps[x]) + 10)
          }
        })
        .then(() => {
          fetch('http://localhost:3001/api/random-building-data')
            .then(response => {
              return response.json()
            })
            .then(data => {
              for (let x = 0; x < 10; x++) {
                const buildingWidth = Number(data.data[x][1])
                const buildingHeight = Number(data.data[x][2])
                this.buildings.push(new Building(this, data.data[x][0], buildingWidth, buildingHeight, this.gaps[x] + this.totalGap))
                this.totalGap += buildingWidth
                this.totalGap += this.gaps[x] + 10
              }
              this.gaps = []
            })
        })
      this.totalGap -= (this.width * 1.95)
    }

    draw (ctx) {
      this.background.draw(ctx)
      this.scoreBoard.draw(ctx)
      this.particles.forEach((particle) => {
        particle.draw(ctx)
      })
      this.buildings.forEach(building => {
        building.draw(ctx)
      })
      this.character.draw(ctx)
    }

    endGame () {
      const finalScore = this.score
      window.location.href = `endPage.html?score=${finalScore}`
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
