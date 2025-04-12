import * as f from "../../functions.js";
import AiModule from "./AiModule.js";
import KI from "../KI.js";

export default class ModDefend extends AiModule {
	// TODO store ai in this
	constructor(g) {
		super(g);
	}


	/**
	 * [TODO:description]
	 *
	 * @param {KI} ai - AI instance that is modulated
	 */
	modStep(ai) {
		let bubbles = ai.getBubbles();

		// Check all own bubbles if they need to be defended
		for (let i = 0; i < bubbles.length; i++) {
			let bubble = bubbles[i];

			// TODO check endless loop → if bubbles contains only bubble

			// Send support from random other own bubble
			if (bubble.getArrivingEnemy() >= bubble.units + bubble.arriving[bubble.team]) {
				let randBubble = f.chooseRandom(bubbles);

				if (randBubble === bubble)
					continue;

				if (!randBubble.createQueue.isEmpty()) {
					continue;
				}

				ai.angriff(randBubble, bubble);
				// break
			}
		}
	}

	drawIcon(x, y, r) {
		this.g.painter.drawCircle(x, y, r, true);
		this.g.painter.ctx.fillStyle = "#5fbf20";
		this.g.painter.drawCircle(x, y, r, false);
	}
}
