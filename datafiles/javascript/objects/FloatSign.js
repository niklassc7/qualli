import Object from "../engine/objects/Object.js";
import * as g from "../globals.js";

export default class FloatSign extends Object {
	constructor(text, x, y, color, fontSize=20, ttl=200) {
		super(x, y, 0, 0);
		this.text = text;
		this.color = color;

		this.fontSize = fontSize;
		this.setFontSize(fontSize)

		this.background = "white";

		this.startTtl = ttl;
		this.ttl = this.startTtl;
		this.vspeed = -1.5;
	}

	setFontSize(size) {
		this.fontSize = size;
		this.resize();
	}

	resize() {
		super.resize();
		this.font =	Math.round(this.fontSize * ((g.xScalar + g.yScalar) / 2)) + "px fnt_Comforta_Bold";
	}

	step() {
		super.step();

		this.ttl--;

		if (this.ttl <= 0) {
			this.destroy();
		}
	}

	draw() {
		this.resize();

		g.ctx.font = this.font;

		// TODO implement → maybe subclass
		// // Background
		// let bgpad = 15 * xScalar;
		// let textm = ctx.measureText(this.text);
		// let textw  = textm.width;
		// let texth  = this.fontSize;
		// let x1 = this.xD - textw/2 - bgpad;
		// // let x2 = this.xD + textw/2;
		// let y1 = this.yD - texth/2 - bgpad;
		// // let y2 = this.yD + texth/2;
		// ctx.fillStyle = "rgba(255, 100, 100, 0.3)";
		// ctx.strokeStyle = "black";
		// ctx.lineWidth = 4 * xScalar;
		// // draw_roundrect(ctx, x1, y1, textw + bgpad*2, texth + bgpad*2, 10, true, true);
		// ctx.fillRect(x1, y1, textw + bgpad*2, texth + bgpad*2);
		// ctx.strokeRect(x1, y1, textw + bgpad*2, texth + bgpad*2);


		// Text
		g.ctx.lineWidth = 4 * g.xScalar;
		g.ctx.fillStyle = this.color;
		g.ctx.strokeStyle = this.background;

		g.ctx.globalAlpha = this.ttl / this.startTtl;
		
		g.ctx.strokeText(this.text, this.xD, this.yD);
		g.ctx.fillText(this.text, this.xD, this.yD);

		g.ctx.globalAlpha = 1;
	}
}

