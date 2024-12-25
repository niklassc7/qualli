class KI extends IObjlistentry {
	constructor(team) {
		super();
		this.team = team;
		this.alarm = [];
		this.alarm[0] = 20;
	}

	step() {
		for(var i = 0; i < this.alarm.length; i++) {
			if(this.alarm[i] > 0) {
				this.alarm[i]--;
				if(this.alarm[i] === 0) this.alarmieren(i);
			}
		}
	}

	draw() {
		ctx.fillStyle = Colors.team[this.team].cRgba();
		ctx.strokeStyle = "#aa0000";
		ctx.lineWidth = 2;
		draw_circle((32 + (this.team - 2) * 48) * xScalar, 32 * yScalar, 16 * ((xScalar + yScalar) / 2), false);
	}

	pruefe_ob_eigene_Raumschiffe_im_Spiel() {
		for(var i = 0; i < room.objects.length; i++) {
			if(room.objects[i] instanceof Jelly) {
				if(room.objects[i].team === this.team) return true;
			}
		}
		return false;
	}

	getBubbles() {
		var bubbles = [];
		for(var i = 0; i < room.bubbles.length; i++) {
			if(room.bubbles[i].team === this.team) {
				bubbles[bubbles.length] = room.bubbles[i];
			}
		}
		return bubbles;
	}

	getStrongestPlanet() {
		var bubbles = this.getBubbles();
		if(bubbles.length === 0) return;
		var strongest_index = 0;
			// Suche stärksten Planeten aus eigener bubbles aus.
			for(var i = 0; i < bubbles.length; i++) {
				if(bubbles[i].einheiten > bubbles[strongest_index].einheiten) {
					strongest_index = i;
				}
			}
		return bubbles[strongest_index];
	}

	getEnemyBubblesWeakerThan(n) {
		var enemyList = [];
		for(var i = 0; i < room.bubbles.length; i++) {
			if(room.bubbles[i].team !== this.team && n > room.bubbles[i].einheiten) {
				enemyList[enemyList.length] = room.bubbles[i];
			}
		}
		return enemyList;
	}

	// TODO rename
	angriff(planet_start, planet_ziel){
		for(var i = 0; i < Math.floor(planet_start.einheiten / 2); i++) {
			let nx = planet_start.x;
			let ny = planet_start.y;

			planet_start.createQueue.addLast([nx, ny, this.team, planet_ziel]);

		}
		planet_start.einheiten -= Math.floor(planet_start.einheiten/2)
	}

	// TODO do this in room
	pruefe_ob_gewonnen() {
		for(var i = 0; i < room.objects.length; i++) {
			if(room.objects[i] instanceof KI) {
				return false;
			}
		}
		return true;
	}

	deleteIfDefeatedAndCheckIfWon() {
		// Wenn kein Planet und keine Raumschiffe mehr vorhanden sind, KI löschen, dann prüfen ob Spieler gewonnen.
		if(this.getBubbles().length === 0) {
			/* Wenn kein Planet mehr da ist, aber noch Raumschiffe soll weder
			* die KI gelöscht werden, noch der restliche Angriffsplan
			* ausgeführt werden.
			*/
			if(this.pruefe_ob_eigene_Raumschiffe_im_Spiel()) {
				this.alarm[0] = 200 + Math.round(Math.random() * 100);
				return;
			}

			// KI löschen, wenn weder eigene Planeten, noch Raumschiffe da sind.
			room.destroyObject(this);
			// Prüfen, ob noch eine KI da ist, sonst gewonnen.
			if(this.pruefe_ob_gewonnen()){
				showEndgame(true)

				// TODO win/lose logic should be in LevelRoom
				ProgressManager.updateLevelStats(room.constructor.name, true);
			}
			return true;
		}

		return false;
	}
}
