class KI1 extends KI {
	constructor(team) {
		super(team);
		this.a;
		this.b;
	}
	alarmieren(nr) {
		switch (nr) {
			case 0:
				if (this.deleteIfDefeatedAndCheckIfWon())
					return;

				// Get bubbles and calculate available jellies
				let strongest = this.getStrongestPlanet();
				if(strongest === undefined)
					return;
				let bubbles = this.getBubbles();
				let fromBubblesExceptStrongest = 0;
				for (let i = 0; i < bubbles.length; i++)
					if(bubbles[i] !== strongest)
						fromBubblesExceptStrongest += bubbles[i].einheiten * 0.5;

				// console.log(available);
				// Get list of enemy bubbles that are weaker than then available jellies
				let attackList = this.getEnemyBubblesWeakerThan((fromBubblesExceptStrongest + strongest.einheiten) * 0.7);

				if (attackList.length === 0) {
					this.alarm[0] = 100 + Math.round(Math.random() * 100);
					return;
				}

				// pool jellies on strongest planet, then attack
				for(let i = 0; i < bubbles.length; i++)
					if(bubbles[i] !== strongest)
						this.angriff(bubbles[i], strongest);

				// Set timer to attack, because they have to arrive at the strongest bubble
				this.alarm[1] = 250;
				this.a = strongest;
				// this.b = attackList[Math.round(Math.random() * (attackList.length-1))];


				// this.alarm[0] = 200 + Math.round(Math.random() * 100);
				break;

			case 1:
				// this.angriff(this.a, this.b);

				// Search best bubble to attack and then attack
				let attackListN = this.getEnemyBubblesWeakerThan(this.a.einheiten * 0.73);
				if(attackListN.length === 0) {
					this.alarm[0] = 50 + Math.round(Math.random() * 50);
					return;
				}
				let bestTarget;
				let bestTargetValue = Number.MAX_VALUE;
				for(let i = 0; i < attackListN.length; i++) {
					let currBubbleVal = attackListN[i].einheiten / attackListN[i].groesse;
					if(currBubbleVal < bestTargetValue) {
						bestTarget = attackListN[i];
						bestTargetValue = currBubbleVal;
					}
				}

				this.angriff(this.a, bestTarget);
				this.angriff(this.a, bestTarget);
				this.alarm[0] = 100 + Math.round(Math.random() * 50);
				break;

			default:
				console.log("Fehler: alarm() von KI: alarm() aufgerufen ohne nr");
		}
	}
}
