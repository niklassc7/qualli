import PhysicalEntity from "../parapluie/objects/PhysicalEntity.js";

// Creates a bubbles
export default class BubbleSeed extends PhysicalEntity {
	constructor(g, delay, futureBubble) {
		super(g, futureBubble.x, futureBubble.y, futureBubble.width, futureBubble.height);

		this.futureBubble = futureBubble;
		this.delay = delay;
		this.timeAlive = 0;

		this.created = g.stepCount;
	}

	step() {
		super.step();
		this.timeAlive++;

		if (this.timeAlive >= this.delay) {
			this.g.room.addObject(this.futureBubble);
			this.g.room.bubbles.push(this.futureBubble); // TODO use addBubble method when implemented
			this.destroy();
		}
	}

	draw() {
		super.draw();

		// animation
		// TODO scale to size of seed
		// let scale = this.futureBubble.size;
		this.g.painter.ctx.lineWidth = 5;
		let lineCount = 5;



		this.g.painter.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		let shiftedStepCount = this.g.stepCount + this.created; // Shift counter by creation time because otherwise all seed instances show exactly the same
		for(var i = 0; i < lineCount; i++){
			this.g.painter.ctx.beginPath();
			this.g.painter.ctx.arc(this.x, this.y, i * ((this.g.painter.ctx.lineWidth-1)*2), (shiftedStepCount* (i*0.01+0.1)) + 1.25 * Math.PI, (shiftedStepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
			this.g.painter.ctx.stroke();
			this.g.painter.ctx.beginPath();
			this.g.painter.ctx.arc(this.x, this.y, this.g.painter.ctx.lineWidth + i * ((this.g.painter.ctx.lineWidth-1)*2), -(shiftedStepCount* (i*0.01+0.1)) + 1.25 * Math.PI, -(shiftedStepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
			this.g.painter.ctx.stroke();
		}


		// Background
		this.g.painter.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		this.g.painter.fillCircle(this.x, this.y, 0.9*this.width/2);

		// Draw background of progress bar
		let circleRadius = 1.1 * this.width / 2;
		this.g.painter.ctx.lineWidth = 3;
		this.g.painter.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
		this.g.painter.strokeCircle(this.x, this.y, circleRadius);
		

		// Draw progress bar of time left
		this.g.painter.ctx.lineWidth = 3;
		this.g.painter.ctx.strokeStyle = 'white';
		this.g.painter.ctx.beginPath();
		this.g.painter.ctx.arc(this.x,
			this.y,
			circleRadius,
			2.0 * Math.PI * (this.timeAlive/this.delay),
			2.0 * Math.PI);

		this.g.painter.ctx.stroke();
	}
}
