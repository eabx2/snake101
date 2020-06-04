Snake = function(head){
    
    this.edgeLength = vel;
    this.velX = 0;
    this.velY = 0;
    this.parts = [head];
    
    this.move = function(){
        
        // cross with the food
        if((lenX + this.parts[0].x + this.velX) % lenX == food.x && (lenY + this.parts[0].y + this.velY) % lenY == food.y){
            
            // make it new head
            this.parts.unshift(food);            
            createFood(); // create random food
        }
        
        // cross with an obstacle
        obstacles.forEach(obstacle => {
            if(this.parts[0].x == obstacle.x && this.parts[0].y == obstacle.y)
                resetGame();
        });
        
        // head-body conflict
        for(var i=1;i<this.parts.length;i++){
            if(this.parts[0].x == this.parts[i].x && this.parts[0].y == this.parts[i].y)
                resetGame();
        }
        
        // save head last position
        var tempX1 = this.parts[0].x;
        var tempY1 = this.parts[0].y;
        var tempX2;
        var tempY2;
        
        // move head
        this.parts[0].x = (lenX + this.parts[0].x + this.velX) % lenX;
        this.parts[0].y = (lenY + this.parts[0].y + this.velY) % lenY;
        
        
        // move body
        for(var i=1;i<this.parts.length;i++){
            
            // save the last position
            tempX2 = this.parts[i].x;
            tempY2 = this.parts[i].y;
            
            // make it move
            this.parts[i].x = tempX1;
            this.parts[i].y = tempY1;
            
            // switch
            tempX1 = tempX2;
            tempY1 = tempY2;
        }
        
    };
    
    this.draw = function(){
        this.parts.forEach(part => {
            square(part.x,part.y,this.edgeLength);
        });
    };
} 