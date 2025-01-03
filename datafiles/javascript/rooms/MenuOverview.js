// TODO make this a general OptionsRoom and subclass it

class MenuOverview extends Room{
	constructor(){
		super();
		this.background = spr_bgMenu;

		this.addObject(new Button("←", 42, roomHeight - 128, 90, 90, () => { gotoRoom(Startpage); } )).setFontSize(24) ;


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
		let marginLeft = (roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < options.length; j++) {
				this.addObject(new Button(
					options[i*itemsInRow + j][1],
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					() => { gotoRoom(options[i*itemsInRow + j][0]) },
					false
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw()

		ctx.lineWidth = 4 * ((xScalar + yScalar) / 2);
		ctx.font = Math.round(125 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Light";
		ctx.strokeStyle = "white"
		ctx.textAlign = "center";
		ctx.strokeText("Overview", roomWidth/2 * xScalar, 100 * yScalar)
	}
}
