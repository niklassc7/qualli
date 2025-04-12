import Base from "./bases/Base.js";
import Colors from "../appEtc/color/Colors.js";
import LinkedList from "../parapluie/LinkedList/LinkedList.js";
import Jelly from "./Jelly.js";
import Color from "../appEtc/color/Color.js";
import Sounds from "../appEtc/Sounds.js";
import ResourceManager from "../parapluie/ResourceManager.js";


// TODO move to bases
export default class Bubble extends Base {
	constructor(g, x, y, team=0, size=1, units=25) {
		let width = 80 * (1 + (size / 3));
		let height = 80 * (1 + (size / 3));

		const sprite = ResourceManager.getSpriteFromPath("datafiles/sprites/bubble4.png");
		super(g, x, y, width, height, sprite); // TODO should specify width here AND sprite

		this.size = size; // TODO width and height in constructor
		this.units = units;
		this.team = team;

		/**
		  * @type {LinkedList}
		  */
		this.createQueue = new LinkedList();
		this.animationSpeed = 0.1 + Math.random() * 0.2
	}

	step() {
		super.step();
		if (this.team !== 0)
			this.units += this.size / 60;

		// if (!this.createQueue.isEmpty() && Math.random() < 0.3) {
		if (!this.createQueue.isEmpty()) {
			let parameter = this.createQueue.removeFirst();
			// TODO do this differently → e.g. store Jelly in queue, or just amount
			// TODO Jedes Team hat eine Queue
			// TODO Queue speichert Auftrag
			// TODO Auftrag ist (Klasse, Anzahl)
			// new Jelly(parameter[0], parameter[1], parameter[2], parameter[3]);

			let nx = this.x - this.ox + Math.random()*this.width;
			let ny = this.y - this.oy + Math.random()*this.height;
			this.g.room.addObject(new Jelly(this.g, nx, ny, parameter[2], parameter[3], this));
		}
	}

	draw() {
		super.draw();
		// Team colour
		// if(this.team !== 0) {
			let c = Colors.team[this.team];
			this.g.painter.ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.3`;
			let black = new Color(0, 0, 0)
			let darkBorderC = c.getMix(black, 0.9);
			darkBorderC.a = 0.7;
			this.g.painter.ctx.strokeStyle = darkBorderC.cRgba();

			if(this.team === 0) {
				// g.painter.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
			} else {
			}
				this.g.painter.ctx.lineWidth = Math.round(2 * 2); // TODO
				this.g.painter.fillCircle(this.x, this.y, this.width / 2);

			this.g.painter.strokeCircle(this.x, this.y, this.width / 2);
		// }


		// Units {{{
		this.g.painter.ctx.textBaseline = "middle";
		this.g.painter.ctx.textAlign = "center";
		// const fsize = 32;
		const fsize = 28 + 4*this.size;

		// g.painter.ctx.fillStyle = "#3c3f41";
		this.g.painter.ctx.fillStyle = "#eceff1";
		this.g.painter.ctx.fillStyle = "rgba(245, 255, 245, 0.8)";
		// if (this.team !== 0)
			// g.painter.ctx.fillStyle = Colors.team[this.team].cRgba();
		this.g.painter.ctx.font = Math.round(fsize) + "px fnt_Comforta_Bold";
		this.g.painter.ctx.fillText(Math.floor(this.units), this.x, this.y);
		// }}}

		// Queue
		if (!this.createQueue.isEmpty()) {
			this.g.painter.ctx.fillStyle = Colors.team[this.team].cRgb();
			this.g.painter.ctx.font = "18px fnt_Comforta_Bold";
			this.g.painter.ctx.textBaseline = "middle";
			this.g.painter.ctx.textAlign = "center";
			this.g.painter.ctx.fillText(this.createQueue.size, this.x, this.y + 32);
		}
	}

	destroy() {
		super.destroy();

		this.g.room.removeBubble(this);
	}

	// Attack bubble other
	// TODO obsolete?
	attack(other) {
		let amount = Math.floor(this.units / 2)

		this.attackN(other, amount)
	}

	// Attack bubble other
	attackN(other, amount) {
		// throw new Error("Cannot attack with more units than bubble has.")

		if (amount > this.units) {
			console.warn("Tried attacking with more units than bubble has.")
			amount = this.units
		}
		// amount = Math.min(this.units, amount)

		this.units -= amount

		for (let i = 0; i < amount; i++) {
			// let newJelly = new Jelly(this.x, this.y, this.team, other)
			this.createQueue.addLast([this.x, this.y, this.team, other])
		}
	}

	// Gets called to attack this bubble with n units by team `team`
	#getAttacked(n, team) {
		// Don't capture
		if (n < this.units) {
			this.units -= n;
			return;
		}

		// Capture
		this.units = n - this.units;
		this.team = team;
		// let audio = new Audio("datafiles/sounds/bing4.ogg");
		// audio.play();

		Sounds.play("bing");
	}

	// TODO make more efficient → test if it was faster before this commit
	// Gets called when `n` jellies of team `team`.
	// If bubble is owned by `team`, the units will be added, otherwise
	// substracted. If n >= this.units, then bubble is captured and the
	// amount of `n` that is left is added to the bubble.
	receiveJellies(n, team) {
		if (this.team === team) {
			this.units += n;
		} else {
			this.#getAttacked(n, team);
		}
	}

	// Gets total number of enemy jellies
	getArrivingEnemy() {
		let sum = 0;
		for (let i = 0; i < this.arriving.length; i++) {
			if (i === this.team)
				continue;
			sum += this.arriving[i];
		}

		return sum;
	}
}
