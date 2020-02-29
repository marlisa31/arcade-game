var Enemy = function(xPos, yPos) {
    this.sprite = 'images/enemy-bug.png';
		this.x = xPos;
		this.y = yPos;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
		// move enemy
		const minSpeed = .25;
		const maxSpeed = 4;
		const speed = Math.random() * (maxSpeed - minSpeed + 1) + minSpeed;

		if (this.x < 5) {
			this.x = this.x + speed *  dt;
		}

		// set enemy back to starting point
		else {
			const minX = -3;
			const maxX = -0.5;
			this.x = Math.random() * (maxX - minX + 1) + minX;
		}

		// if collision of an enemy with player occurs, player is reset
		if ((this.x < (player.x + 0.5))  &&  ((this.x + 0.5) > player.x)  && (this.y < (player.y + 0.75)) && ((this.y + 0.75) > player.y)) {
				player.reset();
		}
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 78);
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	    this.sprite = 'images/char-princess-girl.png';
			this.x = 2;
			this.y = 4;
};

Player.prototype.reset = function() {
	this.x = 2;
	this.y = 4;
}

Player.prototype.update = function() {

 // Levels can go in here
 if (this.y < 1) {
		this.reset();
	}
}

Player.prototype.newGame = function() {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
}

Player.prototype.handleInput = function(e) {
	switch(e) {
		case 'left':
			if (this.x > 0) {
				this.x -= 1;
			}
			break;
		case 'up':
			if (this.y > 0) {
				this.y -= 1;
			}
			break;
		case 'right':
			if (this.x < 4) {
				this.x += 1;
			}
			break;
		case 'down':
			if (this.y < 5) {
				this.y += 1;
			}
			break;
	}

	if (this.y < 1) {
			Player.prototype.reset();
	}
}


// instantiate objects
const enemyOne = new Enemy(-1, 0.75);
const enemyTwo = new Enemy(-3, 1.85);
const enemyThree = new Enemy(-2, 2.9);
const enemyFour = new Enemy(-15, 2.9);

const allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];

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
