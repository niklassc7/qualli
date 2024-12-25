class room27 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;

		this.addObject(new KI0(2));
		this.addObject(new KI1(3));
		this.addObject(new KI1(3));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;


		let marginVert = 30;
		let marginHorz = 30;

		let newP=this.addObject(new Bubble(marginVert + 0 * planetDistance, 160 + 0 * planetDistance, 1));
		newP.groesse = 1;
		newP.einheiten = 5000;
		this.bubbles.push(newP)

		newP=this.addObject(new Bubble(marginVert + 4 * planetDistance, 160 + 1 * planetDistance, 2));
		newP.groesse = 10;
		newP.einheiten = 5000;
		this.bubbles.push(newP)
	}
}
