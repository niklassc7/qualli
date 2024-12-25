class BubbleTemp extends Bubble {
	constructor(x, y, team, groesse, einheiten, ttl) {
		super(x, y, team, groesse, einheiten);

		// TODO dont randomize by default
		if (ttl == undefined) {
			this.totalTtl = 500 + Math.random() * 3000;
		} else {
			this.totalTtl = ttl;
		}
		this.ttl = this.totalTtl; // TODO use stepCount?
	}

	step() {
		super.step();
		this.ttl--;

		// Delete if ttl over
		if (this.ttl <= 0) {
			room.destroyObject(this);
		}
	}

	draw() {
		super.draw();

		// Draw circle-indicator of left ttl
		ctx.lineWidth = 3 * xScalar;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.arc(this.xD,
			this.yD,
			1.1 * this.widthD / 2,
			2.0 * Math.PI * ((this.totalTtl-this.ttl)/this.totalTtl),
			2.0 * Math.PI);

		ctx.stroke();
	}
}
