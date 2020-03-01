/*_________________________
enemy object
_________________________*/

var Enemy = function(xPos, yPos) {
    this.sprite = 'images/enemy-bug.png';
		this.x = xPos;
		this.y = yPos;
		this.minSpeed = 0.25;
		this.maxSpeed = 4;
};

// draw enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

// update the enemy's position
Enemy.prototype.update = function(dt) {

		// move enemy
		const speed = Math.random() * (this.maxSpeed - this.minSpeed + 1) + this.minSpeed;
		if (this.x < 5) {
			this.x = this.x + speed *  dt; // Parameter dt: a time delta between ticks
		}

		// set enemy back to starting point at end of canvas
		else {
			const minX = -3;
			const maxX = -0.5;
			this.x = Math.random() * (maxX - minX + 1) + minX;
		}

		// reset player if collision of an enemy with player occurs
		if ((this.x < (player.x + 0.5))  &&  ((this.x + 0.5) > player.x)  && (this.y < (player.y + 0.75)) && ((this.y + 0.75) > player.y)) {
				player.reset();
				player.pointsDecrease();
		}
};



/*_________________________
player object
_________________________*/

var Player = function() {
	    this.sprite = 'images/char-princess-girl.png';
			this.x = 2;
			this.y = 4;
			this.level = 1;
			this.points = 0;
};

// draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
}

// handle key input of user
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
}

// reset player and increase points if player made it to water
Player.prototype.update = function() {
 if (this.y < 1) {
		this.reset();
		this.pointsIncrease();
	}
}

// reset method
Player.prototype.reset = function() {
	this.x = 2;
	this.y = 4;
}

// increase points
Player.prototype.pointsIncrease = function() {
	this.points += 10;
	const pointsNumber = document.querySelector('.points-number');
	pointsNumber.innerHTML = this.points;
	this.addActive(pointsNumber);
	setTimeout(this.removeActive, 1000, pointsNumber);

	// increase level after each 20 points
	if ((this.points / 20) > this.level) {
		this.levelIncrease();
	}
}

// decrease points by 10 and start levelDecrease method every 20 points
Player.prototype.pointsDecrease = function() {
	if (this.points >= 10) {
		this.points -= 10;
		const pointsNumber = document.querySelector('.points-number');
		pointsNumber.innerHTML = this.points;
	}
	// decrease level after each 20 points
	if (((this.points / 20) < this.level) && (this.level > 1)) {
			this.levelDecrease();
	}
}

// increase level
Player.prototype.levelIncrease = function() {
	this.level++;
	const lvlNumber = document.querySelector('.level-number');
	lvlNumber.innerHTML = this.level;

	// increase speed of all enemies
	allEnemies.forEach(element => {
		element.minSpeed+= 0.5;
		element.maxSpeed+= 0.5;
	});
	this.addActive(lvlNumber);
	setTimeout(this.removeActive, 1000, lvlNumber);
}

// decrease level
Player.prototype.levelDecrease = function() {
	this.level--;
	const lvlNumber = document.querySelector('.level-number');
	lvlNumber.innerHTML = this.level;

	// decrease speed of all enemies
	allEnemies.forEach(element => {
		element.minSpeed-= 0.5;
		element.maxSpeed-= 0.5;
	});
}

// add/ remove active class to draw the users attention to update of level/points
Player.prototype.addActive = function(element) {
	element.parentNode.classList.add('active');
}
Player.prototype.removeActive = function(element) {
	element.parentNode.classList.remove('active');
}


/*_________________________
instantiation of objects
_________________________*/

// place enemies on the screen
const enemyOne = new Enemy(-1, 0.75);
const enemyTwo = new Enemy(-3, 1.75);
const enemyThree = new Enemy(-2, 2.75);
const enemyFour = new Enemy(-13, 2.75);

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
