import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI1 from "../appEtc/KI1.js";

export default class Level12 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new KI1(this.g, 2));

		this.addBase(new Bubble(this.g, 128, 640, 1, 1, 100));
		this.addBase(new Bubble(this.g, 1000, 288, 0, 1));
		this.addBase(new Bubble(this.g, 736, 224, 0, 1));
		this.addBase(new Bubble(this.g, 1100, 544, 2, 1, 10));
		this.addBase(new Bubble(this.g, 760, 650, 2, 1, 10));
		this.addBase(new Bubble(this.g, 384, 300, 2, 1, 10));
		this.addBase(new Bubble(this.g, 800, 480, 2 , 1, 10));
		this.addBase(new Bubble(this.g, 100, 128, 2, 1, 10));
		this.addBase(new Bubble(this.g, 1120, 200, 2, 1, 10));
	}
}
