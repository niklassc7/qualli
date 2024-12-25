class room20 extends LevelRoom {
	constructor(){
		super();

		this.background = spr_bg_0;

		this.addObject(new KI0(2));
		// this.addObject(new KI2(2));

		// 40

		let planetDistance = 200; // centre to cenre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;

		for(let i = 0; i < 3; i++)
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = (j < itemsInRow / 2) ? 1 : 2;
				let newP = this.addObject(new Bubble(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam));
				newP.groesse = (i == 1) ? 2 : 1;
				newP.einheiten = 100;
				this.bubbles[i * itemsInRow + j] = newP;

			}

		this.support_src_x = roomWidth / 2
	}

	step() {
		super.step();

		// Random walk
		this.support_src_x += 10 - Math.random() * 20
		if(this.support_src_x < 0)
			this.support_src_x = roomWidth - 1
		else if(this.support_src_x >= roomWidth)
			this.support_src_x = 0

		let tmp_team = this.getLosingTeamByPlanet()
		if(tmp_team != 0) {
			// let tmp_x = Math.random() * roomWidth
			let tmp_x = this.support_src_x
			// let tmp_y = Math.random() * roomHeight
			let tmp_y = -100
			let tmp_ziel = room.bubbles[Math.floor(Math.random() * room.bubbles.length)]
			new Jelly(tmp_x, tmp_y, tmp_team, tmp_ziel)
		}
	}

	// Return team that has less planets
	getLosingTeamByPlanet() {
		let sum_team_1 = 0
		let sum_team_2 = 0
		
		for(let i = 0; i < room.bubbles.length; i++) {
			if(room.bubbles[i].team == 1)
				sum_team_1++
			else if(room.bubbles[i].team == 2)
				sum_team_2++
		}

		// Stop supporting when team has no planets, otherwise game never ends
		if(sum_team_1 == 0 || sum_team_2 == 0)
			return 0

		if(sum_team_1 < sum_team_2)
			return 1
		else  if(sum_team_1 > sum_team_2)
			return 2
		return 0
	}
}
