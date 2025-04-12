import SpriteEntity from "../parapluie/objects/SpriteEntity.js";
import * as f from "../functions.js";
import GameEntity from "../parapluie/objects/GameEntity.js";
import Colors from "../appEtc/color/Colors.js";
import Settings from "../parapluie/Settings.js";
import resourceManager from "../parapluie/ResourceManager.js";

export default class Jelly extends SpriteEntity {
	/**
	 * [TODO:description]
	 *
	 * @param {number} x - [TODO:description]
	 * @param {number} y - [TODO:description]
	 * @param {number} team - [TODO:description]
	 * @param {Bubble} ziel - [TODO:description]
	 * @param {number} [size] - [TODO:description]
	 */
	// TODO swap target and ziel
	constructor(g, x, y, team, ziel, source, size=1) {
		let sprite;
		switch (team) {
			case 1:
				sprite = resourceManager.getSpriteFromPath("datafiles/sprites/qualleRed.png");
				break;
			case 2:
				sprite = resourceManager.getSpriteFromPath("datafiles/sprites/qualleBlue.png");
				break;
			case 3:
				sprite = resourceManager.getSpriteFromPath("datafiles/sprites/qualleGreen.png");
				break;
			case 4:
				sprite = resourceManager.getSpriteFromPath("datafiles/sprites/qualleYellow.png");
				break;
			default:
				throw new Error(`Tried creating Jelly with unsupported team (${team})`);
		}

		super(g, x, y, 1, 1, sprite);

		this.source = source;

		this.team = team;
		this.ziel = ziel; // TODO rename
		this.size = size; // TODO separate damage and size → default damage can be size

		this.widthShould = 32 * this.size;
		this.heightShould = 21 * this.size;

		// Point that jelly is moving to initially when created, will adapt
		// direction gradually
		this.startX = x + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.startY = y + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.moveTowardsPoint(this.startX, this.startY, 2);

		this.targetX = this.ziel.x - this.ziel.ox + Math.random()*this.ziel.width;
		this.targetY = this.ziel.y - this.ziel.oy + Math.random()*this.ziel.height;

		this.ziel.arriving[this.team]++;

		// this.opt_swapScreen = 3; // TODO remove


		// TODO dont nest
		// TODO rename? → express intent, what it does (accelerator or something)
		// increases speed and corrects direction until it is done and then deletes itself
		// this reduces operations after getting to the targetSpeed and right direction
		class StartHelper extends GameEntity {
			constructor(g, parentJelly, targetSpeed) {
				super(g);
				this.parentJelly = parentJelly;
				this.targetSpeed = targetSpeed;
				this.g.room.addObject(this);
			}

			step() {
				super.step();

				// TODO sometimes deleted before full size is reached
				this.parentJelly.width = Math.min(this.parentJelly.widthShould, this.parentJelly.width + 2.5);
				// this.parentJelly.height = Math.min(this.parentJelly.heightShould, this.parentJelly.height + 0.01); // TODO scale correctly
				this.parentJelly.height = this.parentJelly.width * this.parentJelly.heightShould / this.parentJelly.widthShould

				let acceleration = 0.03 + 0.4*Math.random();

				if(this.parentJelly.speed < this.targetSpeed)
					this.parentJelly.setSpeed(this.parentJelly.speed + acceleration);

				let zDir = f.pointDirection(this.parentJelly.x, this.parentJelly.y, this.parentJelly.targetX, this.parentJelly.targetY);

				// TODO increase when large amounts are spawned
				let turnSpeed = 2 + 4*Math.random();

				let positiveTurnDistance = f.mMod(zDir - this.parentJelly.direction, 360); // clockwise
				let negativeTurnDistance = f.mMod(this.parentJelly.direction - zDir, 360); // anticlockwise

				if(positiveTurnDistance <= turnSpeed || negativeTurnDistance <= turnSpeed)
					this.parentJelly.setDirection(zDir);
				else
					if(positiveTurnDistance < negativeTurnDistance) {
						this.parentJelly.setDirection(this.parentJelly.direction + turnSpeed);
					} else {
						this.parentJelly.setDirection(this.parentJelly.direction - turnSpeed);
					}

				if(Math.abs(zDir - this.parentJelly.direction) <= turnSpeed && Math.abs(this.parentJelly.speed - this.targetSpeed) <= acceleration && this.parentJelly.width === this.parentJelly.widthShould) {
					// TODO is this deleted when parentJelly is deleted
					this.parentJelly.setSpeed(this.targetSpeed);
					this.parentJelly.setDirection(zDir);
					this.destroy();
				}
			}
		}

		new StartHelper(this.g, this, 4 + 2 * Math.random());
	}

	step() {
		super.step();

		// Check if jelly collided with target
		if (f.rectangleInRectangle(
			this.x - (this.width/2),
			this.y - (this.height/2),
			this.x + (this.width/2),
			this.y + (this.height/2),
			this.ziel.x - (this.ziel.width/2),
			this.ziel.y - (this.ziel.height/2),
			this.ziel.x + (this.ziel.width/2),
			this.ziel.y + (this.ziel.height/2)
		)) {
			this.destroy();

			this.ziel.receiveJellies(this.size, this.team, this.source);
		}

		// Check if jelly collided with target
		// TODO check whole jelly width not just center
		// console.log(this.x, this.ox, this.y, this.oy);
		// console.log(this.ziel.x, this.ziel.ox, this.ziel.);


		// // TODO fix
		// if (pointInCircle(
		// 	this.x + this.ox,
		// 	this.y + this.oy,
		// 	this.ziel.x + this.ziel.ox,
		// 	this.ziel.y + this.ziel.oy,
		// 	this.ziel.width / 2
		// )){
		// 	this.destroy();

		// 	this.ziel.receiveJellies(this.size, this.team);
		// }
	}

	draw() {
		// TODO fix this
		// TODO rotation
		// TODO origin
		// TODO ellipsis
		// Jelly glow
		if (Settings.getJellyGlow()) {
			let c = Colors.team[this.team];
			this.g.painter.ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.025`;
			let maxr = Math.max(this.width, this.height);

			this.g.painter.fillCircle(this.x, this.y, maxr * 2.7);
			this.g.painter.fillCircle(this.x, this.y, maxr * 2.0);
		}

		super.draw();
	}

	destroy() {
		super.destroy();

		this.ziel.arriving[this.team]--;
	}
}
