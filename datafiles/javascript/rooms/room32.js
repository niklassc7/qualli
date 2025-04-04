import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import BubbleTemp from "../objects/BubbleTemp.js";
import KI2 from "../appEtc/KI2.js";

export default class room32 extends LevelRoom {
	constructor(g) {
		super(g);

		this.addObject(new KI2(this.g, 2));
		this.addObject(new KI2(this.g, 3));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		let amount = 10
		for(let i = 0; i < 3; i++)
			for(let j = 0; j < itemsInRow; j++) {
				if (j > 2) {
					continue;
				}

				let newTeam = j + 1
				this.addBubble(new Bubble(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, 1, amount));
			}
		
		this.bubbles[3].team = 1;
		this.bubbles[3].units = 300;
		
		let newUnits = 9.5 * amount;
		this.addBubble(new BubbleTemp(this.g, startMargin + 4 * planetDistance, 160 + 0 * planetDistance, 2, 7, newUnits, 400));
		this.addBubble(new BubbleTemp(this.g, startMargin + 4 * planetDistance, 160 + 2 * planetDistance, 3, 7, newUnits, 400));
	}
}
