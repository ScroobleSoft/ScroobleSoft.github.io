
//-------------------------------------------------
//---------- DOMINION INTRIGUE --------------------
var DominionIntrigue = function() {
	var Randomizer;
};
DominionIntrigue.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
	},
	GetAllied(power) {  //UNLOGGED
		var i;
		var iAlld;

		do {
			iAlld = this.Randomizer.GetIndex(ALLIED.COUNT);
		} while (AlliedStates[iAlld].Government.Type==power.Government.Type);

		return (AlliedStates[iAlld]);
	}
};
