// Enemies our player must avoid
var Enemy = function(a,b,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.a=a;
    this.b=b;
    this.speed=speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.a += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.a > 500) {
        this.a = -90;
        this.speed = 200 + (Math.random() * 100);
    }

    // Check for collision between player and enemies
    if (player.a < this.a + 60 &&
        player.b < this.b + 25 &&
        player.a + 37 > this.a &&
        30 + player.b > this.b) {
        player.a = 200;
        player.b = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player=function(a,b,speed)
{
  this.a=a;
  this.b=b;
  this.speed=speed;
  this.sprite='images/char-boy.png';
  this.players = [
       'images/char-boy.png',
       'images/char-cat-girl.png',
       'images/char-horn-girl.png',
       'images/char-pink-girl.png',
       'images/char-princess-girl.png',
   ]
};

Player.prototype.render=function()
{
  ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
}

Player.prototype.update=function()
{
  if (this.b > 380) {
      this.b = 380;
  }

  if (this.a > 400) {
      this.a = 400;
  }

  if (this.a < 0) {
      this.a = 0;
  }

  // Check for player reaching top of canvas and winning the game
  if (this.b < 0) {
      this.a = 200;
      this.b = 380;
  }
};

Player.prototype.handleInput=function(keyPress)
{
  switch (keyPress) {
      case 'left':
          this.a -= this.speed + 55;
          break;
      case 'up':
          this.b -= this.speed + 35;
          break;
      case 'right':
          this.a += this.speed + 55;
          break;
      case 'down':
          this.b += this.speed + 35;
          break;
      case 'enter':
          changePlayer();
          break;
      default:
          break;
  }

};

// Function to change the player
var n = 0;
var changePlayer = function() {
    n = (n + 1) % player.players.length;
    player.sprite = player.players[n];
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
var player=new Player(200, 380, 50);
var enemy;
var enemyPosition=[60,140,220];
enemyPosition.forEach(function(Y) {
    enemy = new Enemy(0, Y, 100 + Math.floor(Math.random() * 150));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
