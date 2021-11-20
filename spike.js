class Spike {
	constructor(xPos, yPos, width, height, type, xVelocity, images) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
		this.type = type;
		this.xVelocity = xVelocity;
		this.images = images;
		this.topHitBox = new HitBox(
			this.xPos + this.width / 5,
			this.yPos,
			this.width / 2,
			this.height / 1.5,
			"#0000FF"
		);
		this.bottomHitBox = new HitBox(
			this.xPos,
			this.yPos + this.height / 1.5,
			this.width,
			this.height / 3,
			"#0000FF"
		);
	}

	// Returns true if the spike is off screen
	isOffScreen() {
		return this.xPos < -this.width;
	}

	// Shows the spike
	show() {
		image(this.images[this.type], this.xPos, this.yPos);
	}

	// Shows thin transparent hit-box with blue stroke
	showHitBox() {
		this.bottomHitBox.show();
		this.topHitBox.show();
	}

	// Updates the spike's hit-box
	updateHitBox() {
		// Top hit-box
		this.topHitBox.x = this.xPos + this.width / 4;
		this.topHitBox.y = this.yPos;
		// Bottom hit-box
		this.bottomHitBox.x = this.xPos;
		this.bottomHitBox.y = this.yPos + this.height / 1.5;
	}

	// Updates the spike
	update(showHitBox) {
		this.xPos -= this.xVelocity;
		this.show();
		if (showHitBox) {
			this.showHitBox();
		}

		// Updates the hitBox
		this.updateHitBox();
	}
}
