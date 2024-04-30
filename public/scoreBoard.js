export class ScoreBoard {
  constructor (game) {
    this.game = game
    this.fontSize = 45
    this.fontFamily = 'Helvetica'
    this.scoreText = document.getElementById('game-score')
  }

  draw (context) {
    context.font = this.fontSize + 'px ' + this.fontFamily
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor
    context.drawImage(this.scoreText, 10, 10, 300, 100)
    context.fillText(this.game.score, 290, 75)
  }

  updateScore (score) {
    this.game.score = score
  }
}
