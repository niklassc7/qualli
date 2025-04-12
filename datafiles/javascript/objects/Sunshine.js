import GameEntity from "../parapluie/objects/GameEntity.js";

export default class Sunshine extends GameEntity {
	constructor(g, x, y) {
		super(g);

		this.x = x;
		this.y = y;

		// Number of beams to each side
		this.ne = 10;

		// Modulate alpha value of beams (0 <= dAlphaMod <= 1)
		this.dAlphaMod = new Array(2*this.ne).fill(0.5);
		this.dAlphaMaxStep = 0.05;
	}

	step() {
		super.step();

		for (let i = 0; i < this.dAlphaMod.length; i++) {
			this.dAlphaMod[i] += (2*Math.random()*this.dAlphaMaxStep - this.dAlphaMaxStep);
			this.dAlphaMod[i] = Math.max(0, this.dAlphaMod[i]);
			this.dAlphaMod[i] = Math.min(1, this.dAlphaMod[i]);
		}
	}

	draw() {
		super.draw();
		this.g.painter.ctx.lineWidth = 140;

		for (let i = -this.ne; i < this.ne; i++) {
			let a = 0.02 + this.dAlphaMod[i+this.ne]*0.06;
			this.g.painter.ctx.strokeStyle = `rgba(255, 230, 150, ${a})`;

			let d = this.g.roomWidth / (2*this.ne);
			this.g.painter.strokeLine(this.x, this.y, this.x + i*d*1.2, this.g.roomHeight-0);
		}
	}
}
