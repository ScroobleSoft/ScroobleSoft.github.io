
//---------------------------------------------
//---------- DOMINION PACT --------------------
var DominionPact = function() {
	var Randomizer;
	var AlliedSlots;		//reflects danger (in ascending order) to Allied from neighbouring Power's belligerence rating
};
DominionPact.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.SetSlots();
	},
	SetSlots() {  //UNLOGGED
		var i;
		for (i=0;i<ALLIED.COUNT;++i)
			this.AlliedSlots[i] = PowerProfiles[AlliedStates[i].Continet.Power.Index][0] + 1;
	},
	GetAllied(nation) {  //UNLOGGED
		var iAlld;

		if (this.Randomizer.CheckBoolean()) {		//pick an associated Allied
			do {
				iAlld = this.Randomizer.GetIndex(ALLIED.COUNT);
			} while (AlliedStates[iAlld].Government.Index!=nation.Government.Index);
		} else
			iAlld = this.Randomizer.GetSlot(this.AlliedSlots);

		return (AlliedStates[iAlld]);
	}
};
