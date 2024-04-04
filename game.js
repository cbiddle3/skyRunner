import { Background } from './backGroundLogic.js';
import { InputHandler } from './input.js';
import { Character } from './character.js';


window.addEventListener('load', function() {
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1300;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.debug = true;
            this.width = width;
            this.height = height;
            this.speed = 5;
            this.groundMargin = 0;
            this.background = new Background(this, 1);
            this.character = new Character(this);
            this.input = new InputHandler(this);
        }

        update(deltaTime) {
            this.background.update();
            this.character.update(this.input.keys)
        }

        draw(ctx) {
            this.background.draw(ctx);
            this.character.draw(ctx);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);

})