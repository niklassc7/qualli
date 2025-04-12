import Base from "./Base.js";
import Jelly from "../Jelly.js";
import ResourceManager from "../../parapluie/ResourceManager.js";

export default class UnlockBase extends Base {
	constructor(g, x, y, units) {
		let w = 0.3*units + 150;
		let h = 0.3*units + 150;
		const sprite = ResourceManager.getSpriteFromPath("datafiles/sprites/Erde3.png");

		super(g, x, y, w, h, sprite);

		this.units = units;
	}

	/**
	 * When units of value n arrive that belong to team team
	 *
	 * @param {number} n - [TODO:description]
	 * @param {number} team - [TODO:description]
	 */
	receiveJellies(units, team, source = undefined) {
		// this.units = Math.max(0, this.units - units);
		this.units -= units;

		if (this.units < 0) {
			// let target = source;
			let target = undefined;
			if (typeof target === "undefined") {
				do {
					// TODO endless loop possible if only one bubble
					let ri = Math.floor(Math.random()*this.g.room.bubbles.length);
					target = this.g.room.bubbles[ri];
				} while (target === this)

			}

			for (let i = 0; i < -this.units; i++) {
				// Mirror back
				// new Jelly(this.x, this.y, team, target, this, 3);

				// Scatter
				// new Jelly(this.x, this.y, team, target, this, 3);

				let size = 0.5
				// if (Math.random() < 0.001 && units != 1000)
				// 	size = 1000;

				if (units === 1000 && target instanceof UnlockBase)
					break;

				this.g.room.addObject(new Jelly(this.g, this.x, this.y, team, target, this, size));
				this.g.room.addObject(new Jelly(this.g, this.x, this.y, team, target, this, size));
				this.g.room.addObject(new Jelly(this.g, this.x, this.y, team, target, this, size));
			}
			this.units = 0;
		}



	}

	draw() {
		super.draw();

		this.g.painter.ctx.textBaseline = "middle";
		this.g.painter.ctx.textAlign = "center";

		this.g.painter.ctx.fillStyle = "#eceff1";
		this.g.painter.ctx.fillStyle = "rgba(245, 255, 245, 0.8)";
		this.g.painter.ctx.font = "42px fnt_Comforta_Bold";
		this.g.painter.ctx.fillText(Math.floor(this.units), this.x, this.y);
	}
}
