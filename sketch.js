// Constants
const SPACE_BAR = 32;
const MARGIN = 16;

// Variables
let backgroundColor;
let characterHeight;
let characterWidth;
let canvasHeight;
let canvasWidth;
let spikesTypes;
let floorHeight;
let floorColor;
let character;
let images;
let spikes;
let model;

// Preload
function preload() {
	// Loads the images
	images = {
		character: {
			standing: loadImage("character_standing.png"),
			jumping: loadImage("character_jumping.png"),
		},
		spike: {
			singleSpike: loadImage("single_spike.png"),
			clusterSpike: loadImage("cluster_spike.png"),
		},
	};

	// Creates the spikes array
	spikes = [];

	// Creates the spikesTypes array
	spikesTypes = ["singleSpike", "clusterSpike"];
}

// Setup
function setup() {
	// Canvas
	canvasWidth = windowWidth - MARGIN;
	canvasHeight = windowHeight - MARGIN;
	backgroundColor = "#6789B1";
	createCanvas(canvasWidth, canvasHeight);
	noStroke();

	// Background
	background(backgroundColor);

	// Floor
	floorHeight = 32;
	floorColor = "#63535B";
	fill(floorColor);
	rect(0, canvasHeight - floorHeight, canvasWidth, floorHeight);

	// Character
	characterWidth = images.character.standing.width;
	characterHeight = images.character.standing.height;
	character = new Character(
		50,
		canvasHeight - characterHeight - floorHeight,
		characterWidth,
		characterHeight,
		0,
		3 * characterHeight,
		2.5 * characterHeight,
		images.character
	);
	character.show();

	// Initial spike
	let spikeType = random(spikesTypes);
	let spikeWidth = images.spike[spikeType].width;
	let spikeHeight = images.spike[spikeType].height;
	let spikeXPos = canvasWidth;
	let spikeYPos = canvasHeight - spikeHeight - floorHeight;
	spikes.push(
		new Spike(
			spikeXPos,
			spikeYPos,
			spikeWidth,
			spikeHeight,
			spikeType,
			2.5,
			images.spike
		)
	);
}

// Draw loop
function draw() {
	// Background
	background(backgroundColor);

	// Floor
	noStroke();
	fill(floorColor);
	rect(0, canvasHeight - floorHeight, canvasWidth, floorHeight);

	// Updates the character
	character.update(true);

	// Generates a spike
	generateSpike();

	// Updates the spikes
	for (let i = 0; i < spikes.length; i++) {
		spikes[i].update(true);
		if (spikes[i].isOffScreen()) {
			spikes.splice(i, 1);
		}
	}
}

// Clears the keyCode if it has been released
function keyReleased() {
	keyCode = 0;
}

// If the window is resized, resizes the canvas
function windowResized() {
	canvasWidth = windowWidth - MARGIN;
	canvasHeight = windowHeight - MARGIN;
	resizeCanvas(canvasWidth, canvasHeight);
}

// If the window loses focus, pauses the game
window.onblur = () => {
	// Stops the loop
	noLoop();

	// Clears the keyCode
	keyCode = 0;
};

// If the window gain focus, unpauses the game
window.onfocus = () => {
	// Resumes the loop
	loop();
};

// If the context menu is opened, clears the keyCode
window.oncontextmenu = () => {
	keyCode = 0;
};

// Generates a spike
function generateSpike() {
	// 80% chance of generating a single spike, 20% chance of generating a cluster spike
	let spikeType = "";
	if (random() < 0.6) {
		spikeType = "singleSpike";
	} else {
		spikeType = "clusterSpike";
	}

	// Generates the spikes positions and sizes
	let spikeWidth = images.spike[spikeType].width;
	let spikeHeight = images.spike[spikeType].height;
	let spikeXPos = canvasWidth;
	let spikeYPos = canvasHeight - spikeHeight - floorHeight;

	// Returns nothing if the spikes can't be generated because a spikes is too close to it or if there are too many spikes
	if (
		spikes[spikes.length - 1].xPos > spikeXPos - 6 * spikeWidth ||
		spikes.length > 8
	) {
		return;
	}

	// Returns nothing if the 5% chance of generating a spike is not met
	if (random() > 0.05) {
		return;
	}

	// Generates the spike
	let spike = new Spike(
		spikeXPos,
		spikeYPos,
		spikeWidth,
		spikeHeight,
		spikeType,
		2.5,
		images.spike
	);

	// Adds the spike to the array
	spikes.push(spike);
}
