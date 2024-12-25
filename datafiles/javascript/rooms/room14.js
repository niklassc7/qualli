class room14 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addObject(new KI1(2));
		this.addObject(new KI0(3));

		this.bubbles[0] = this.addObject(new Bubble(128, 640, 1, 1, 60));
		this.bubbles[1] = this.addObject(new Bubble(1000, 288, 3, 3, 30));
		this.bubbles[2] = this.addObject(new Bubble(736, 224, 3, 2, 30));
		this.bubbles[3] = this.addObject(new Bubble(1100, 544, 2, 1, 10));
		this.bubbles[4] = this.addObject(new Bubble(760, 650, 2, 1, 10));
		this.bubbles[5] = this.addObject(new Bubble(384, 300, 2, 1, 10));
		this.bubbles[6] = this.addObject(new Bubble(800, 480, 2 , 1, 10));
		this.bubbles[7] = this.addObject(new Bubble(100, 128, 2, 1, 10));
		this.bubbles[8] = this.addObject(new Bubble(1120, 200, 2, 1, 10));
	}
}
