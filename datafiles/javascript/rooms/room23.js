import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";

export default class room23 extends LevelRoom {
	constructor(g) {
		super(g);

		this.addObject(new KI0(this.g, 2));

		let planetDistance = 160; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;


		let jellyAmount = 750

		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = 1
				// TODO const
				let newSize = (i == 1) ? 2 : 1;
				this.addBubble(new Bubble(this.g, startMargin + j * planetDistance, 200 + i * planetDistance, newTeam, newSize, jellyAmount));
			}
		}

		let pushOut = 70
		jellyAmount = Math.ceil((jellyAmount * 14 / 4) * 1.05)

		for (const i of [0, 5, 12, 17]) {
			this.bubbles[i].team = 2
			this.bubbles[i].units = jellyAmount
		}
		this.bubbles[0].x -= pushOut
		this.bubbles[0].y -= pushOut

		this.bubbles[5].x += pushOut
		this.bubbles[5].y -= pushOut

		this.bubbles[12].x -= pushOut
		this.bubbles[12].y += pushOut

		this.bubbles[17].x += pushOut
		this.bubbles[17].y += pushOut

	}

	step() {
		super.step()

		// TODO move effect? → Mixin
		if (Math.random() < 0.3 ) {
			// Move
			let source = this.g.room.bubbles[Math.floor(Math.random() * this.g.room.bubbles.length)];
			let target = this.g.room.bubbles[Math.floor(Math.random() * this.g.room.bubbles.length)];

			let amount = Math.round(Math.random() * 10)
			source.attackN(target, amount)
		}
	}
}
