class room8 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;
		this.addToObjList(new KI0(2));

		this.planetlist[0] = this.addToObjList(new cls_Planet(128, 640, 1, 1));
		this.planetlist[1] = this.addToObjList(new cls_Planet(1000, 288, 0, 1));
		this.planetlist[2] = this.addToObjList(new cls_Planet(736, 224, 0, 1));
		this.planetlist[3] = this.addToObjList(new cls_Planet(1100, 544, 0, 2));
		this.planetlist[4] = this.addToObjList(new cls_Planet(760, 650, 0, 1));
		this.planetlist[5] = this.addToObjList(new cls_Planet(384, 300, 0, 1));
		this.planetlist[6] = this.addToObjList(new cls_Planet(800, 480, 0 , 1));
		this.planetlist[7] = this.addToObjList(new cls_Planet(100, 128, 1, 1));
		this.planetlist[8] = this.addToObjList(new cls_Planet(1120, 200, 2, 2, 100));
	}

}
