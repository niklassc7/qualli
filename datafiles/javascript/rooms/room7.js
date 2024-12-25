class room7 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));


		let hMargin = 200;
		let vMargin = 150;

		let newP = this.addObject(new Bubble(hMargin, vMargin, 2));
		newP.groesse = 1;
		newP.einheiten = 30;
		this.bubbles[0] = newP;

		newP = this.addObject(new Bubble(hMargin, roomHeight - vMargin, 1));
		newP.groesse = 1;
		newP.einheiten = 20;
		this.bubbles[1] = newP;

		newP = this.addObject(new Bubble(roomWidth - hMargin, roomHeight - vMargin, 3));
		newP.groesse = 1;
		newP.einheiten = 30;
		this.bubbles[2] = newP;

		newP = this.addObject(new Bubble(roomWidth - hMargin, vMargin, 4));
		newP.groesse = 1;
		newP.einheiten = 30;
		this.bubbles[3] = newP;

		newP = this.addObject(new Bubble(roomWidth / 2, roomHeight / 2, 0));
		newP.groesse = 3;
		newP.einheiten = 20;
		this.bubbles[4] = newP;
	}
}
