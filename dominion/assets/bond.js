
//---------------------------------------------
//---------- DOMINION BOND --------------------
var DominionBond = function() {
	var Yield, Maturity;
};
DominionBond.prototype = {
	Set(level) {  //NOTE: levels are numbered starting at 1
		this.Yield = Math.pow(level, 2);
		this.Maturity = Game.Fortnight + (2*level);
	}
};
