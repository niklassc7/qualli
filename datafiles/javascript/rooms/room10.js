import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";

export default class room10 extends LevelRoom {
	constructor(g) {
		super(g);

		this.addObject(new KI0(this.g, 2));
		this.addObject(new KI0(this.g, 3));
		this.addObject(new KI0(this.g, 4));

		this.addBubble(new Bubble(this.g, 128, 640, 1, 1));
		this.addBubble(new Bubble(this.g, 1000, 288, 2, 1));
		this.addBubble(new Bubble(this.g, 736, 224, 3, 1));
		this.addBubble(new Bubble(this.g, 1100, 544, 0, 2, 3));
		this.addBubble(new Bubble(this.g, 760, 650, 4, 2, 15));
		this.addBubble(new Bubble(this.g, 384, 300, 4, 1, 20));
		this.addBubble(new Bubble(this.g, 800, 480, 0 , 1, 7));
		this.addBubble(new Bubble(this.g, 100, 128, 4, 1, 20));
		this.addBubble(new Bubble(this.g, 1120, 200, 0, 3));
	}
}
