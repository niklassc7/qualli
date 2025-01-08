import LevelRoom from "./LevelRoom.js";
import BubbleTemp from "../objects/BubbleTemp.js";
import KI1 from "../appEtc/KI1.js";
import KI2 from "../appEtc/KI2.js";
import * as g from "../globals.js";
import ModFleeTemp from "../appEtc/aiModules/ModFleeTemp.js";

export default class room35 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI1(2));
		let ai1 = this.addObject(new KI2(3));


		let modFleeTemp = new ModFleeTemp();
		ai1.modules.push(modFleeTemp);

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = (j < itemsInRow / 3) ? 1 : (j < 2 * (itemsInRow / 3) ? 2 : 3);
				let newSize = (i == 1) ? 2 : 1;
				let newUnits = (newTeam == 1) ? 40 : 70;
				this.addBubble(new BubbleTemp(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, newSize, newUnits));
			}
		}
	}
}
