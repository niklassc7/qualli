import SpriteEntity from "../../parapluie/objects/SpriteEntity.js";
import LevelRoom from "../../rooms/LevelRoom.js";
import * as f from "../../functions.js";
import * as graphics from "../../parapluie/functions/graphics.js";

export default class SimBubble extends SpriteEntity {
	// TODO Is this ever cleared? On room change?
	static all = [];

	constructor(g, x, y, r, basecolor) {
		let padding = 8;
		const sprite = new OffscreenCanvas(2*padding + 2*r, 2*padding + 2*r);
		const ctx = sprite.getContext("2d");

		super(g, x, y, 2*r, 2*r, sprite);
		this.ox = r + padding; // TODO separate sprite and hitbox
		this.oy = r + padding;

		this.r = r;
		this.basecolor = basecolor;
		this.generateSprite(sprite);

		SimBubble.all.push(this);

		this.ascendAcel = 0.0002 * r;


		let speed = 1 + Math.random();
		let directionDiff = 30; // Degrees in which direction is random
		let direction = 270 - directionDiff + 2*(directionDiff*Math.random());

		this.setDirectionSpeed(direction, speed);
	}

	generateSprite(canvas) {
		// TODO scale

		// const offscreen = new OffscreenCanvas(w, h);
		const ctx = canvas.getContext("2d");
		ctx.translate(8, 8); // TODO do padding properly

		ctx.strokeStyle = "rgba(220, 220, 250, 0.3)";
		ctx.lineWidth = 4;
		graphics.strokeCircle(ctx, this.r, this.r, this.r);


		ctx.fillStyle = "rgba(220, 220, 250, 0.05)";
		graphics.fillCircle(ctx, this.r, this.r, this.r);


		let lineNum = 5;
		for (let i = 1; i < lineNum; i++) {
			let alpha = 0.025 + 0.3 * (1 - i/lineNum)

			ctx.strokeStyle = `rgba(${this.basecolor[0]}, ${this.basecolor[1]}, ${this.basecolor[2]}, ${alpha})`;
			let lineWidth = 1;
			ctx.lineWidth = lineWidth;
			graphics.strokeCircle(ctx, this.r, this.r, this.r - i*(lineWidth*2));
			graphics.strokeCircle(ctx, this.r, this.r, this.r + i*(lineWidth*2));
		}

		
		ctx.translate(-8, -8); // TODO
	}

	destroy() {
		super.destroy();

		// Delete from SimBubble.all
		for (let i = 0; i < SimBubble.all.length; i++) {
			let other = SimBubble.all[i];
			if (other === this) {
				SimBubble.all.splice(i, 1);
				break;
			}
		}
	}

	step() {
		super.step();

		this.setVspeed(this.vspeed - this.ascendAcel);

		if (this.g.room instanceof LevelRoom) {
			this.setVspeed(this.vspeed - 40*this.ascendAcel);
		}

		if (this.y < -this.height + this.oy)
			this.destroy();

		// Collision with cursor
		// TODO move to input?
		let ax1 = this.x - this.width/2;
		let ay1 = this.y - this.height/2
		let ax2 = this.x + this.width/2;
		let ay2 = this.y + this.height/2

		if (f.pointInRectangle(this.g.input.x, this.g.input.y, ax1, ay1, ax2, ay2)) {
			let a = 0.5;
			if (this.x < this.g.input.x) {
				this.setHspeed(this.hspeed - a);
			} else {
				this.setHspeed(this.hspeed + a);
			}

			if (this.y < this.g.input.y) {
				this.setVspeed(this.vspeed - a);
			} else {
				this.setVspeed(this.vspeed + a);
			}
		}

		// TODO more general collision mechanism
		// Collide with other SimBubbles
		for (let i = 0; i < SimBubble.all.length; i++) {
			let other = SimBubble.all[i];
			if (other === this) {
				continue;
			}

			// if (Math.random() < 0.001) {
			// console.log(other);
			// }

			// TODO check circle in cirlce
			// if (circleInCircle(this.x, this.y, this.width/2,
			//                    i.x, i.y, i.width/2)) {

			let bx1 = other.x - other.width/2;
			let by1 = other.y - other.height/2
			let bx2 = other.x + other.width/2;
			let by2 = other.y + other.height/2

			if (f.rectangleInRectangle(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2)) {
				let aHoriz = 0.05;
				if (this.x < other.x) {
					this.setHspeed(this.hspeed - aHoriz);
					other.setHspeed(other.hspeed + aHoriz);
				} else {
					this.setHspeed(this.hspeed + aHoriz);
					other.setHspeed(other.hspeed - aHoriz);
				}
				let aVert = 0.05;
				if (this.y < other.y) {
					this.setVspeed(this.vspeed - aVert);
					other.setVspeed(other.vspeed + aVert*0.2); // slower down
				} else {
					this.setVspeed(this.vspeed + aVert*0.2); // slower down
					other.setVspeed(other.vspeed - aVert);
				}
			}

		}
	}
}
