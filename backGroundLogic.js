const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 210;

let gameSpeed = 5;

const backgroundLayer = new Image();
backgroundLayer.src = 'images/background.png';

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 1078;
        this.height = 210;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = 0;
        }
        this.x = this.x - this.speed;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer, .6);

const gameObjects = [layer1];

//new code

class Character{
    constructor(image){
        this.x = CANVAS_WIDTH/2;
        this.y = CANVAS_HEIGHT/2;
        this.width = 100;
        this.height = 100;
        //this.width = image.width;
        //this.height = image.height;
        this.image = image;
    }

    update() {
        this.x += gameSpeed-5; // characters x position based on game speed, need to change to beginning of frame
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

const characterImage = new Image();
const character = new Character(characterImage);

characterImage.onload = function() {
    character.image = characterImage;
    gameObjects.push(character);
    console.log("Character image loaded successfully.");
}

characterImage.onerror = function() {
    console.error("Failed to load character image.");
}

characterImage.src = 'images/skyRunnerCharacter.png';
//

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });

    character.update(); 
    character.draw();
    requestAnimationFrame(animate);
};

animate();

