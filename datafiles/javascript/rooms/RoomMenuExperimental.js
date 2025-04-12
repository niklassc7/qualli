import Room from "./../parapluie/Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../objects/Button.js";
import LevelButton from "../objects/LevelButton.js";
import MenuOverview from "./MenuOverview.js";
import room24 from "./room24.js";
import room25 from "./room25.js";
import room27 from "./room27.js";
import room28 from "./room28.js";
import room29 from "./room29.js";
import room30 from "./room30.js";
import room31 from "./room31.js";
import room32 from "./room32.js";
import room33 from "./room33.js";
import room34 from "./room34.js";
import room35 from "./room35.js";
import room36 from "./room36.js";
import room37 from "./room37.js";
import room38 from "./room38.js";
import room39 from "./room39.js";
import room40 from "./room40.js";
import room41 from "./room41.js";
import room42 from "./room42.js";

export default class RoomMenuExperimental extends Room {
	constructor(g) {
		super(g);

		this.addObject(new SimBubbleEmitter(this.g, [255, 120, 210]));

		this.n_step = 0; // TODO replace with stepCount

		this.addObject(new Button(this.g, "←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(MenuOverview); } )).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;

		let rooms = [
			room24,
			room25,
			room27,
			room28,
			room29,
			room30,
			room31,
			room32,
			room33,
			room34,
			room35,
			room36,
			room37,
			room38,
			room39,
			room40,
			room41,
			room42,
		];

		let itemsInRow = 4;
		let itemsinColumn = Math.ceil(rooms.length / itemsInRow)



		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (g.roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (g.roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < rooms.length; j++) {
				this.addObject(new LevelButton(
					this.g,
					i*itemsInRow + j,
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					rooms[i*itemsInRow + j]
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw();

		this.g.painter.ctx.lineWidth = 4;
		this.g.painter.ctx.font = "42px fnt_Comforta_Light";
		this.g.painter.ctx.fillStyle = "white"
		this.g.painter.ctx.textAlign = "center";
		this.g.painter.ctx.fillText("Experimental ⚛", this.g.roomWidth/2, 32);
	}
}
