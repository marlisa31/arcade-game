var Enemy = function(xPos, yPos) {
    this.sprite = 'images/enemy-bug.png';
		this.x = xPos;
		this.y = yPos;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
		if (this.x < 500) {
			const minSpeed = 10;
			const maxSpeed = 800;
			const speed = Math.random() * (maxSpeed - minSpeed + 1) + minSpeed;
			this.x = this.x + speed *  dt;
		}
		else {
			this.x = -90;
		}
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	    this.sprite = 'images/char-princess-girl.png';
			this.x = 200;
			this.y = 390;
};

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e) {
	switch(e) {
		case 'left':
			this.x -= 100;
			break;
		case 'up':
			this.y -= 85;
			break;
		case 'right':
			this.x += 100;
			break;
		case 'down':
			this.y += 85;
			break;
	}
}


// instantiate objects
const enemyOne = new Enemy(-90, 60);
const enemyTwo = new Enemy(-90, 145);
const enemyThree = new Enemy(-90, 230);

const allEnemies = [enemyOne, enemyTwo, enemyThree];

const player = new Player();

// keypresses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
