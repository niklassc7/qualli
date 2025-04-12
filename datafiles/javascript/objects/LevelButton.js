import Button from "./Button.js";
import ResourceManager from "../parapluie/ResourceManager.js";

export default class LevelButton extends Button {
	constructor(g, text, x, y, width, height, level) {
		let onClick = () => g.gotoRoom(level);
		super(g, text, x, y, width, height, onClick, false);

		this.level = level;

		this.won = g.progressManager.getLevelStats(level.name).won;

		if (this.won > 3) {
			this.medal = ResourceManager.getSpriteFromPath("datafiles/sprites/medals/gold.png");
		} else if (this.won > 1) {
			this.medal = ResourceManager.getSpriteFromPath("datafiles/sprites/medals/silver.png");
		} else if (this.won > 0) {
			this.medal = ResourceManager.getSpriteFromPath("datafiles/sprites/medals/bronze.png");
		} else {
			this.medal = undefined;
		}

		// TODO lock
		// TODO calculate font size
	}

	draw() {
		super.draw();

		let mWidth = 21; // Medal width → keep aspect ratio of sprite
		let mHeight = 32; // Medal height → keep aspect ratio of sprite
		let mMargin = 6;
		if (this.medal != undefined) {
			this.g.painter.ctx.drawImage(this.medal,
				this.x + this.width - mWidth - mMargin,
				this.y + mMargin,
				mWidth,
				mHeight);
		}
	}
}
