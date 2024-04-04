export class Character {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('oldMan');
        this.width = 75;
        this.vy = 0;
        this.height = 100;
        this.x = 0;
        this. y = this.game.height - this.height - this.game.groundMargin;
        this.speed = 0;
        this.maxSpeed = 10;
        this.weight = 1;
    }

    update(input) {
        this.handleInput(input);

        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //vertical movement
        this.y +=  this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
    }

    handleInput(input) {
        if (input.includes('Enter')) {
            if (this.onGround()) {
                this.vy -= 27;
        }
    }}

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height); 
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
}