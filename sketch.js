const vel = 15;
const lenX = 600;
const lenY = 600;

var scoreElement;

var snake;
var food;

var obstacleLimit = 50;
var obstacles = [];

var frLimit = 15;
var fr = 5;

function setup() { 
    var canvas = createCanvas(lenX, lenY);
    canvas.parent('canvas');
    scoreElement = document.getElementById("score");
    frameRate(fr);
    snake = new Snake(createVector(90,90));
    createFood();
} 

function draw() { 
    background(220);
    fill(0);
    snake.draw();
    fill(0,255,0);
    square(food.x,food.y,vel);
    fill(255,0,0);
    obstacles.forEach(obstacle => {
       square(obstacle.x,obstacle.y,vel); 
    });
    
    if(keyIsDown(32)) return;
    snake.move();
}

function keyPressed() {
    
    if(keyCode == LEFT_ARROW && snake.velX != 1 * vel){
        snake.velX = -1 * vel;
        snake.velY = 0;
    } 
    else if(keyCode === RIGHT_ARROW && snake.velX != -1 * vel){
        snake.velX = vel;
        snake.velY = 0;
    }
    else if(keyCode == UP_ARROW && snake.velY != 1 * vel){
        snake.velY = -1 * vel;
        snake.velX = 0;
    }
    else if(keyCode == DOWN_ARROW && snake.velY != -1 * vel){
        snake.velY = vel;
        snake.velX = 0;
    }
    
}

function createFood(){
    
    var x;
    var y;
    var inside = true;
    while(inside){
        var x = Math.floor(Math.random() * Math.floor(lenX));
        x = Math.floor(x / vel) * vel;
        
        var y = Math.floor(Math.random() * Math.floor(lenY));
        y = Math.floor(y / vel) * vel;
        
        // check if it is on the snake
        
        inside = false;
        
        snake.parts.every(part =>{
            if(x == part.x && y == part.y){
                inside = true;
                return false;
            }
        });
        
        obstacles.every(obstacle => {
            if(x == obstacle.x && y == obstacle.y){
                inside = true;
                return false;
            }
        });
        
    }
    
    food = createVector(x,y);
    createAndPushObstacle();
    updateFrame();
    updateScore();
}

function createAndPushObstacle(){
    
    if(obstacles.length == obstacleLimit) return;
    
    var x;
    var y;
    var inside = true;
    while(inside){
        x = Math.floor(Math.random() * Math.floor(lenX));
        x = Math.floor(x / vel) * vel;
            
        y = Math.floor(Math.random() * Math.floor(lenY));
        y = Math.floor(y / vel) * vel;
            
        // check if it is on the snake
        inside = false;
        snake.parts.every(part => {
            if(x == part.x && y == part.y){
                inside = true;
                return false;
            }
        });
            
        // check if it is on the food
        if(x == food.x && y == food.y) inside = true;    
    }
    
    obstacles.push(createVector(x,y));
    
}

function updateFrame(){
    if(fr == frLimit) return;
    fr++;
    frameRate(fr);
}

function updateScore(){
    scoreElement.textContent = "Score: " + (snake.parts.length - 1);
}

function resetGame(){
    snake = new Snake(createVector(90,90));
    obstacles = []; // reset obstacles
    createFood();
    fr = 5;
    frameRate(fr);
}