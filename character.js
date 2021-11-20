class Character {
	// Constructor
	constructor(
		xPos,
		yPos,
		width,
		height,
		initialYVelocity,
		maxJumpHeight,
		minJumpHeight,
		characterImages
	) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
		this.yVelocity = initialYVelocity;
		this.maxJumpHeight = maxJumpHeight;
		this.minJumpHeight = minJumpHeight;
		this.characterImages = characterImages;
	}

	// Checks if the character needs to jump
	tryToJump() {
		// Checks if the space bar is pressed and the character is on the floor. If so, sets the y velocity to 4
		if (keyCode === SPACE_BAR && this.isOnFloor()) {
			this.yVelocity = 4;
		}

		// Checks if the character reached the maximum height or if the space bar is released and the character is not below the floor or hasn't reached the minimum height for a jump.
		// If so, sets the y velocity to -4
		if (
			this.yPos < canvasHeight - this.maxJumpHeight - floorHeight ||
			(!keyCode &&
				!this.isBelowFloor() &&
				this.yPos < canvasHeight - this.minJumpHeight - floorHeight)
		) {
			this.yVelocity = -4;
		}

		// Checks if the character is under the floor. If so, sets the y velocity to 0 and put it on the floor
		else if (this.isBelowFloor()) {
			this.yVelocity = 0;
			this.yPos = canvasHeight - characterHeight - floorHeight;
		}

		// Changes the character's y coordinate by the y velocity factor
		this.yPos -= this.yVelocity;
	}

	// Shows the character by using an image
	show() {
		let currentImage;

		// Checks if the character is in the air. If so, changes the character's image to jumping, if not, changes the character's image to standing
		this.isInAir()
			? (currentImage = this.characterImages.jumping)
			: (currentImage = this.characterImages.standing);

		// Draws the image of the character
		image(currentImage, this.xPos, this.yPos);
	}

	// Returns whether or not the character is on the floor
	isOnFloor() {
		return this.yPos === canvasHeight - characterHeight - floorHeight;
	}

	isBelowFloor() {
		return this.yPos > canvasHeight - characterHeight - floorHeight;
	}

	// Returns whether or not the character is in the air
	isInAir() {
		return this.yPos < canvasHeight - characterHeight - floorHeight;
	}

	// Shows transparent hit-box with red stroke
	showHitBox() {
		noFill();
		stroke(255, 0, 0);
		// Bottom hit-box
		rect(
			this.xPos + this.width / 4,
			this.yPos + this.height / 2,
			this.width / 2,
			this.height / 2
		);

		// Top hit-box
		rect(this.xPos, this.yPos, this.width, this.height / 2);
	}

	// Updates the character
	update(showHitBox) {
		this.show();
		this.tryToJump();
		if (showHitBox) {
			this.showHitBox();
		}
	}
}
