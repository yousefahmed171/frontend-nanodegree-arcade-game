//start include var score & key 
var keyValue = 0;
var keys = document.getElementById("keyValue");
var speeds = 100;
var score = document.getElementById("scoreValue");
var scoreValue = 0;

//Start Public Functions

var resetGame = function(){
    //alert("Game Over!");
    swal("Game Over!", "You clicked Play again!", "warning");
    createHearts();
    keyValue = 0;
    keys.innerHTML = keyValue;
    allEnemies.forEach(function(enemy){
        enemy.speed = 100;
    }); 
    speeds = 100;  
};


var bestScore = function(){
    if (keyValue > scoreValue){
        score.innerHTML = keyValue;
        scoreValue = keyValue;
    };
};


var checkCollisions = function(){
   for (var i = 0; i < allEnemies.length; i++){
        if (player.x < allEnemies[i].x + 65 &&
            player.x + 55 > allEnemies[i].x && player.y < allEnemies[i].y + 40 &&  60 + player.y > allEnemies[i].y) {
            console.log("bater!!!!!!!!!!");
            allHearts.pop();
            if(allHearts.length === 0){
                resetGame();
            };
            player.reset();
        };
    };     
};

var calculateAllkeys = function(){
    keys.innerHTML = ++keyValue;
};

//End Public Functions


// player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.speed = speeds;
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
            this.x = 0;
        }

     checkCollisions();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var createEnemies = function(){
    var xx = [80,20,200,60,150,100];
    var yy = [50,55,140,145,220,222];
    var enemy1 = new Enemy(xx[Math.floor((Math.random() * 4))],yy[Math.floor((Math.random() * 5))]);
    var enemy2 = new Enemy(xx[Math.floor((Math.random() * 4))],yy[Math.floor((Math.random() * 5))]);
    var enemy3 = new Enemy(xx[Math.floor((Math.random() * 4))],yy[Math.floor((Math.random() * 5))]);
    allEnemies = [enemy1,enemy2,enemy3]; 
};



/* Player Function */ 

var Player = function(){
    this.x = 0;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(){
    if (this.x < 0 ) {
        this.x = 0;
    } else

    if (this.x > 400) {
        this.x = 400;
    } else 

    if (this.y < -10 ) {
        this.y = -10;
    } else

    if (this.y > 400) {
        this.y = 400;
    } 
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(direction){
     if (direction == 'left') {
        this.x -= 100;
     } else

     if (direction == 'right') {
        this.x += 100;
     } else

     if (direction == 'up') {
        this.y -= 90;
     } else

     if (direction == 'down') {
        this.y += 75;
     }

     checkCollisions();
};

Player.prototype.reset = function(){
    this.x = 0;
    this.y = 400;
};


/* End Player Function */


/* Start Heart Function 
** function add img heart and view in canvas 
*/

var Heart = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
};

Heart.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 70);
};

var createHearts = function(){
  allHearts = [heart1, heart2, heart3];
  
};

/* End Heart Function */ 


/* start Key  Function */ 

var Key = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
};

Key.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Key.prototype.update = function() {
      if (player.x < key.x + 65 &&
            player.x + 55 > key.x && player.y < key.y + 40 &&  60 + player.y > key.y) {
            console.log("key!!!");
            key.createkey();
            calculateAllkeys();
            bestScore();
            allEnemies.forEach(function(enemy) {
                enemy.speed =  speeds + 20;
                createEnemies();
             });
            speeds = speeds + 20;
            player.reset();
        };
};

Key.prototype.createkey = function(){
    var xx = [0,100,200,300,400];
    var yy = [60,220,150];
    this.x = xx[Math.floor((Math.random() * 4))];
    this.y = yy[Math.floor((Math.random() * 2))];
};


/* End Key Function */ 


var key = new Key(100,100);
var heart3 = new Heart(350, 520);
var heart2 = new Heart(400, 520);
var heart1 = new Heart(450,520);
allHearts = [heart1, heart2, heart3];
var player = new Player();

createEnemies();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});