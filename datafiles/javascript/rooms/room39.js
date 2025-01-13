import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";
import KI1 from "../appEtc/KI1.js";
import KI2 from "../appEtc/KI2.js";
import * as g from "../globals.js";
import ModDefend from "../appEtc/aiModules/ModDefend.js";

export default class room39 extends LevelRoom {
	constructor() {
		super();

		let ai0 = this.addObject(new KI0(2));
		let ai1 = this.addObject(new KI1(3));
		let ai2 = this.addObject(new KI2(4));

		let mod0 = new ModDefend();
		ai0.modules.push(mod0);
		let mod1 = new ModDefend();
		ai1.modules.push(mod1);
		let mod2 = new ModDefend();
		ai2.modules.push(mod2);

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < itemsInRow; j++) {
				this.addBubble(new Bubble(startMargin + j * planetDistance, 160 + i * planetDistance, (i*3+j) % 5, 1));
			}
		}
	}
}