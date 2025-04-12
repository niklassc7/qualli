import Room from "./../parapluie/Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../objects/Button.js";
import LevelButton from "../objects/LevelButton.js";
import MenuOverview from "./MenuOverview.js";
import room0 from "./room0.js";
import room1 from "./room1.js";
import room2 from "./room2.js";
import room3 from "./room3.js";
import room4 from "./room4.js";
import room5 from "./room5.js";
import room6 from "./room6.js";
import room7 from "./room7.js";
import room8 from "./room8.js";
import room9 from "./room9.js";
import room10 from "./room10.js";
import room11 from "./room11.js";
import room20 from "./room20.js";
import room21 from "./room21.js";
import room22 from "./room22.js";
import room23 from "./room23.js";

export default class RoomMenuMain extends Room {
	constructor(g){
		super(g);

		this.addObject(new SimBubbleEmitter(this.g, [120, 255, 120]));

		this.n_step = 0;

		let rooms = [room0,
                     room1,
                     room2,
                     room3,
                     room4,
                     room5,
                     room6,
                     room7,
                     room8,
                     room9,
                     room10,
                     room11,
                     room20,
                     room21,
                     room22,
                     room23];

		this.addObject(new Button(this.g, "←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(MenuOverview); } )).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;



		//  let itemsInRow = 12;
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
					rooms[i*itemsInRow + j],
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw()

		this.g.painter.ctx.lineWidth = 4;
		this.g.painter.ctx.font = "42px fnt_Comforta_Light";
		this.g.painter.ctx.fillStyle = "white"
		this.g.painter.ctx.textAlign = "center";
		this.g.painter.ctx.fillText("Main 🐟", this.g.roomWidth/2, 32);
	}
}
