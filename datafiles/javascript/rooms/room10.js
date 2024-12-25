class room10 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addObject(new KI0(2));
		this.addObject(new KI0(3));
		this.addObject(new KI0(4));

		this.bubbles[0] = this.addObject(new Bubble(128, 640, 1, 1));
		this.bubbles[1] = this.addObject(new Bubble(1000, 288, 2, 1));
		this.bubbles[2] = this.addObject(new Bubble(736, 224, 3, 1));
		this.bubbles[3] = this.addObject(new Bubble(1100, 544, 0, 2, 3));
		this.bubbles[4] = this.addObject(new Bubble(760, 650, 4, 2, 15));
		this.bubbles[5] = this.addObject(new Bubble(384, 300, 4, 1, 20));
		this.bubbles[6] = this.addObject(new Bubble(800, 480, 0 , 1, 7));
		this.bubbles[7] = this.addObject(new Bubble(100, 128, 4, 1, 20));
		this.bubbles[8] = this.addObject(new Bubble(1120, 200, 0, 3));
	}

}
