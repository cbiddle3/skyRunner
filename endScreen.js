const gameOverButton = document.getElementById('gameOverButton');

function drawGameOverText(){
    const gameOverCanvas = document.getElementById('gameOverCanvas');
    const ctx = gameOverCanvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', gameOverCanvas.width/2, gameOverCanvas.height/2-20);
    ctx.fillText('Score: 10', gameOverCanvas.width/2, gameOverCanvas.height/2+20);

}

gameOverButton.addEventListener('click', function() {
    showGameOverScreen();
    drawGameOverText(); 
})