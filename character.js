export class Character {
    constructor(game) {
        this.game = game;
        this.jumping = false;
        this.currentBuildingHeight = 0;
        this.image = document.getElementById('oldMan');
        this.width = 75;
        this.vy = 0;
        this.height = 100;
        this.x = 0;
        this. y = this.game.height - this.height - this.game.groundMargin;
        this.speed = 0;
        this.maxSpeed = 10;
        this.weight = 2;
        this.onBuilding = false;
    }

    update(input) {
        this.checkCollision();
        this.handleInput(input);

        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //vertical movement
        this.y +=  this.vy;
        /*if (!this.onGround() && this.jumping === true) {
            this.vy += this.weight;
        } */
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
            this.jumping = false;
        }
         
    }

    handleInput(input) {
        if (input.includes('Enter')) {
            if (this.onGround() && this.jumping === false) {
                this.jumping = true;
                this.vy -= 27;
            }
    }}

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height); 
    }

    onGround() {
        return (this.y >= this.game.height - this.height - this.game.groundMargin || this.y >= this.game.height - this.height - this.currentBuildingHeight)
    }

    checkCollision() {
        this.game.buildings.forEach(building => {
            /*if (building.x < this.x + this.width &&
                building.x + building.width > this.x &&
                building.y <= this.y + this.height &&
                building.y + building.height > this.y &&
                building.alreadyVisited === false) {
                    building.alreadyVisited = true;
                    this.y = this.game.height - this.height - building.height;
                    this.onBuilding = true;
                    this.game.score += 1;
            }*/
            /*if (building.x < this.x + this.width &&
                building.x + building.width > this.x) {
                    
                    this.y = this.game.height - this.height - building.height;
                    this.onBuilding = true;
                    if (!building.alreadyVisited) {
                        this.game.score += 1;
                    }
                    building.alreadyVisited = true;
                    
                    console.log("hit building");
            } */
            if (building.x < this.x + this.width &&
                building.x + building.width > this.x) {
                    this.currentBuildingHeight = building.height;
                    if (!this.jumping) {
                        this.y = this.game.height - this.height - building.height;
                    }
                    //this.y = this.game.height - this.height - building.height;
                    this.onBuilding = true;
                    if (!building.alreadyVisited) {
                        this.game.score += 1;
                    }
                    building.alreadyVisited = true;
                    
                    console.log("hit building");
            } else {
                
            
            }
        })
    }
}