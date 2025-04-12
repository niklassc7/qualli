import Jelly from "../Jelly.js";
import Base from "./Base.js";
import Colors from "../../appEtc/color/Colors.js";
import ResourceManager from "../../parapluie/ResourceManager.js";

export default class ProtectBase extends Base {
	constructor(g, x, y, width, height, subjects, team = 0) {
		const sprite = ResourceManager.getSpriteFromPath("datafiles/sprites/medals/silver.png");
		super(g, x, y, width, height, sprite, team);

		this.units = 100;
		this.received = [];

		this.locked = true;

		this.subjects = subjects;
	}

	receiveJellies(n, team, source = undefined) {
		if (!this.locked)
			return;

		if (typeof this.received[team] === "undefined") {
			this.received[team] = n;
		} else {
			this.received[team] += n;
		}
		
		this.units -= n;

		if (this.units <= 0) {
			this.locked = false;
			this.units = Number.MAX_VALUE;

			this.team = team;
		}
	}

	step() {
		super.step();

		this.protectStep();
	}

	draw() {
		this.g.painter.ctx.fillStyle = Colors.team[this.team].cRgba();
		this.g.painter.fillCircle(this.x, this.y, this.width);

		super.draw();

		this.g.painter.ctx.fillStyle = "black";
		this.g.painter.ctx.font = "24px fnt_Comforta_Bold";
		this.g.painter.ctx.fillText(this.received, this.x, this.y);
	}

	protectStep() {
		if (this.locked || Math.random() < 0.95)
			return;

		for (let i = 0; i < this.subjects.length; i++) {
			let subj = this.subjects[i];


			if (this.team !== subj.team) {
				let n = Math.round(Math.random() * 10);
				for (let j = 0; j < n; j++)
					this.g.room.addObject(new Jelly(this.g, this.x, this.y, this.team, subj));
			}
		}
	}
}
