class Bubble extends Object {
	// TODO use default parameters
	constructor(x, y, team, groesse, einheiten) {
		super(x, y);

		this.groesse = (groesse === undefined) ? Math.floor(Math.random() * 3) + 1 : groesse; // TODO width and height in constructor
		// this.einheiten = (einheiten === undefined) ? Math.round(Math.random() * 50) : 25;
		this.einheiten = (einheiten === undefined) ? 25 : einheiten;
		this.team = (team === undefined) ? 0 : team;

		this.sprite = spr_Planet;

		this.createQueue = new LinkedList();
		this.animationSpeed = 0.1 + Math.random() * 0.2
	}

	step() {
		super.step();
		if (this.team !== 0)
			this.einheiten += this.groesse / 60;

		if (!this.createQueue.isEmpty()) {
			let parameter = this.createQueue.removeFirst();
			new Jelly(parameter[0], parameter[1], parameter[2], parameter[3]);
		}

		this.width = 80 * (1 + (this.groesse / 3));
		this.height = 80 * (1 + (this.groesse / 3));
		this.ox = this.width / 2;
		this.oy = this.height / 2;
	}

	draw() {
		// TODO sinus curve
		let animationN = 32
		// let animationSpeed = 0.3
		let fill = stepCount * this.animationSpeed % animationN
		fill = Math.abs(fill - animationN / 2)
		// Normalize
		fill = fill / (animationN/2)
		//  Scale 
		fill = fill * 0.1

		ctx.fillStyle = `rgba(200, 200, 255, ${fill})`;
		ctx.lineWidth = Math.round(8 * xScalar);
		draw_circle(this.xD, this.yD, this.widthD / 2 * 0.7, false);


		// Team colour
		if(this.team !== 0) {
			ctx.fillStyle = Colors.team[this.team].cRgba();
			ctx.strokeStyle = ctx.fillStyle;
			ctx.lineWidth = Math.round(8 * xScalar);
			draw_circle(this.xD, this.yD, this.widthD / 2, true);
		}

		super.draw();

		// Units
		ctx.fillStyle = "#eceff1";
		ctx.font = Math.round(36 * xScalar) + "px fnt_Comforta_Bold";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.fillText(Math.floor(this.einheiten), this.xD, this.yD);

		// Queue
		if (!this.createQueue.isEmpty()) {
			ctx.fillStyle = "#fc9f91";
			ctx.font = Math.round(18 * xScalar) + "px fnt_Comforta_Bold";
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.fillText(this.createQueue.size, this.xD, this.yD +32);
		}
	}

	// destroy() {
	// 	super.destroy();

	// 	room.removeBubble();
	// }

	// Attack bubble other
	// TODO obsolete?
	attack(other) {
		let amount = Math.floor(this.einheiten / 2)

		this.attackN(other, amount)
	}

	// Attack bubble other
	attackN(other, amount) {
		// throw new Error("Cannot attack with more units than bubble has.")

		if (amount > this.einheiten) {
			console.warn("Tried attacking with more units than bubble has.")
			amount = this.einheiten
		}
		// amount = Math.min(this.einheiten, amount)

		this.einheiten -= amount

		for (let i = 0; i < amount; i++) {
			// let newJelly = new Jelly(this.x, this.y, this.team, other)
			this.createQueue.addLast([this.x, this.y, this.team, other])
		}
	}
}
