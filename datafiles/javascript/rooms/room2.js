class room2 extends LevelRoom {
	constructor(){
		super();

		this.background = spr_bg_0;

		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));


		this.bubbles[0] = this.addObject(new Bubble(128, 640, 1));
		this.bubbles[0].groesse = 2;
		this.bubbles[0].einheiten = 100;
		this.bubbles[1] = this.addObject(new Bubble(1184, 288));
		this.bubbles[2] = this.addObject(new Bubble(736, 224));
		this.bubbles[3] = this.addObject(new Bubble(1024, 544, 4));
		this.bubbles[3].groesse = 1;
		this.bubbles[3].einheiten = 150;
		this.bubbles[4] = this.addObject(new Bubble(160, 480));
		this.bubbles[5] = this.addObject(new Bubble(384, 128));
		this.bubbles[6] = this.addObject(new Bubble(544, 480));
		this.bubbles[7] = this.addObject(new Bubble(64, 160, 3));
		this.bubbles[7].groesse = 2;
		this.bubbles[7].einheiten = 100;
		this.bubbles[8] = this.addObject(new Bubble(1120, 128, 2));
		this.bubbles[8].groesse = 2;
		this.bubbles[8].einheiten = 100;
	}
}
