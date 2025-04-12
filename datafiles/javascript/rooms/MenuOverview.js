import Room from "./../parapluie/Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../objects/Button.js";
import RoomMenuMain from "./RoomMenuMain.js";
import RoomMenuAdvanced from "./RoomMenuAdvanced.js";
import RoomMenuExperimental from "./RoomMenuExperimental.js";
import RoomMenuArchive from "./RoomMenuArchive.js";
import Settings from "../parapluie/Settings.js";
import Startpage from "./Startpage.js";

// TODO make this a general OptionsRoom and subclass it

export default class MenuOverview extends Room{
	constructor(g) {
		super(g);

		this.addObject(new SimBubbleEmitter(this.g));

		this.addObject(new Button(this.g, "←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(Startpage); } )).setFontSize(24) ;


		let buttonWidth = 300;
		let buttonHeight = 150;
		let buttonMargin = 16;

		let options = [
			[RoomMenuMain, "Main"],
			[RoomMenuAdvanced, "Advanced"],
		]

		if (Settings.experimental) {
			options.push([RoomMenuExperimental, "Experimental"])
			options.push([RoomMenuArchive, "Archive"])
		}

		let itemsInRow = Math.min(2, options.length);
		let itemsinColumn = Math.ceil(options.length / itemsInRow)


		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (g.roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (g.roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < options.length; j++) {
				this.addObject(new Button(
					this.g,
					options[i*itemsInRow + j][1],
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					() => { g.gotoRoom(options[i*itemsInRow + j][0]) },
					false
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw();

		this.g.painter.ctx.lineWidth = 4;
		this.g.painter.ctx.font = "125px fnt_Comforta_Light";
		this.g.painter.ctx.textAlign = "center";
		let tx = this.g.roomWidth/2;
		let ty = 100;
		this.g.painter.ctx.strokeStyle = "#333"
		this.g.painter.ctx.strokeText("Overview", tx + 2, ty + 2);
		this.g.painter.ctx.strokeStyle = "white"
		this.g.painter.ctx.strokeText("Overview", tx, ty);
	}
}
