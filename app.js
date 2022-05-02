import platform from "./assets/platform.png";
console.log(platform)
// Canvas properties
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting gravity
const gravity = 1.2;

// Player properties
class Player {
	constructor(position, velocity, width, height) {
		this.position = {
			x: 100,
			y: 100
		}
		this.velocity = {
			x: 0,
			y: 0
		}
		this.width = 30
		this.height = 30
	}

	draw(){
		c.fillStyle = "red";
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update() {
		this.draw()
		this.position.y += this.velocity.y
		this.position.x += this.velocity.x

		// Gravity
		if(this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity
		}
		else {
			this.velocity.y = 0
		}

	}
}

// Platform properties
class Platform {
	constructor({x, y, image}) {
		this.position = {
			x,
			y
		}
		this.width = 200
		this.height = 20

		this.image = image

	}
	draw() {
		c.drawImage(this.image, this.position.x, this.position.y)
	}
}

const image = new Image;
image.src = platform;

console.log(image)

// Create the player
const player = new Player();
const platforms = [new Platform({x: 200, y: 300, image}), new Platform({x: 400, y: 350})];

// Key's properties object
const keys = {
	right: {
		pressed: false,
	},
	left: {
		pressed: false,
	}
}

let scrollOffset = 0;

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
	platforms.forEach((platform) => {
		platform.draw();
	})
	// platform.draw();
	// Player moves
	if(keys.right.pressed && player.position.x < 400) {
		player.velocity.x = 5
	}
	else if(keys.left.pressed && player.position.x > 100) {
		platforms.forEach((platform) => {
			player.velocity.x = -5
		})
	} else {
		player.velocity.x = 0
		
		if(keys.right.pressed) {
			scrollOffset += 5;
			platforms.forEach((platform) => {
				platform.position.x -= 5
			})
		}
		else if(keys.left.pressed) {
			scrollOffset -= 5;
			platforms.forEach((platform) => {
				platform.position.x += 5
			})
		}
	}
	console.log(scrollOffset)
	// Background moves
	
	// Playtform collision detection
	platforms.forEach((platform) => {
		if(player.position.y + player.height <= platform.position.y &&
			player.position.y + player.height + player.velocity.y >= platform.position.y &&
			player.position.x + player.width >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width) {
				player.velocity.y = 0
			}
	})

	if(scrollOffset > 2000) console.log("You win !")
}
animate();



// Events listeners
addEventListener("keydown", ({keyCode}) => {
	console.log(keyCode)
	switch(keyCode) {
		case 37:
			console.log("left");
			keys.left.pressed = true
			break
		
		case 39:
			console.log("right");
			keys.right.pressed = true
			// player.velocity.x += 1
			break
		
			case 32:
				console.log("jump");
			player.velocity.y -= 20
			break
			
		case 40:
			console.log("down");
			break
		
	}
	console.log(keys.right.pressed)
})
addEventListener("keyup", ({keyCode}) => {
	console.log(keyCode)
	switch(keyCode) {
		case 37:
			console.log("left");
			keys.left.pressed = false
			break
		
			case 39:
			console.log("right");
			keys.right.pressed = false
			// player.velocity.x = 0
			break
		
		case 32:
			console.log("jump");
			player.velocity.y -= 20
			break
			
			case 40:
				console.log("down");
				break
		
	}
	console.log(keys.right.pressed)
})

