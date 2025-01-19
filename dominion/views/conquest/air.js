
//-----------------------------------------------------
//---------- DOMINION AIR CONQUEST --------------------
var DominionAirConquest = function() {
	var Conquest;
	var AttackNumbers, DefenceNumbers;
	var AttackStart, DefenceStart, AttackCurrent, DefenceCurrent;		//amounts
};
DominionAirConquest.prototype = {
	Set(cnqst) {
		this.Conquest = cnqst;
		this.AttackNumbers = new Array(FIGHTER.TYPES);
		this.DefenceNumbers = new Array(FIGHTER.TYPES);
	},
	SetPhase() {
		var i;

		this.SetOnePhase(this.AttackNumbers, this.Conquest.AttackArray);
		this.AttackStart = this.AttackNumbers[0];
		this.AttackCurrent = this.AttackNumbers[0];
		for (i=1;i<FIGHTER.TYPES;++i) {
			this.AttackStart += this.AttackNumbers[i];
			this.AttackCurrent += this.AttackNumbers[i];
		}
		this.SetOnePhase(this.DefenceNumbers, this.Conquest.DefenceArray);
		this.DefenceStart = this.DefenceNumbers[0];
		this.DefenceCurrent = this.DefenceNumbers[0];
		for (i=1;i<FIGHTER.TYPES;++i) {
			this.DefenceStart += this.DefenceNumbers[i];
			this.DefenceCurrent += this.DefenceNumbers[i];
		}
	},
	SetOnePhase(aNums, cArry) {

		aNums[0] = cArry.F1s;
		aNums[1] = cArry.F2s;
		aNums[2] = cArry.F3s;
		aNums[3] = cArry.F4s;
		aNums[4] = cArry.F5s;
		aNums[5] = cArry.F6s;
		aNums[6] = cArry.F7s;
		aNums[7] = cArry.F8s;
		aNums[8] = cArry.F9s;
	},
	CheckBattleClose() {

		if (Math.abs(this.AttackCurrent-this.DefenceCurrent)/this.DefenceCurrent<0.1)
			return (true);
	}
};
