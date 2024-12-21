class room15 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addToObjList(new KI1(2));
		this.addToObjList(new KI0(3));

		this.planetlist[0] = this.addToObjList(new Bubble(128, 640, 1, 1, 40));
		this.planetlist[1] = this.addToObjList(new Bubble(1000, 288, 3, 1));
		this.planetlist[2] = this.addToObjList(new Bubble(736, 224, 3, 1));
		this.planetlist[3] = this.addToObjList(new Bubble(1100, 544, 3, 1));
		this.planetlist[4] = this.addToObjList(new Bubble(760, 650, 3, 1));
		this.planetlist[5] = this.addToObjList(new Bubble(384, 300, 2, 1));
		this.planetlist[6] = this.addToObjList(new Bubble(800, 480, 2 , 1));
		this.planetlist[7] = this.addToObjList(new Bubble(100, 128, 2, 1));
		this.planetlist[8] = this.addToObjList(new Bubble(1120, 200, 2, 1));
	}

}
