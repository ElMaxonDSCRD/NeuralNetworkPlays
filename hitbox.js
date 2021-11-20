class HitBox {
	// Constructor
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	// Checks if the hit-box is colliding with another hit-box
	collidesWith(hitBox) {
		return (
			this.x < hitBox.x + hitBox.width &&
			this.x + this.width > hitBox.x &&
			this.y < hitBox.y + hitBox.height &&
			this.y + this.height > hitBox.y
		);
	}

	// Shows the transparent hit-box with specified color stroke
	show() {
		noFill();
		stroke(this.color);
		rect(this.x, this.y, this.width, this.height);
	}
}
