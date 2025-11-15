
//-------------------------------------------------
//---------- DOMINION ALLIANCE --------------------  TODO: could move to Types.js if remains basic
var DominionAlliance = function() {
	var Randomizer;
	var Type, Commodity;
	var Power, AlliedState;
};
DominionAlliance.prototype = {
	Set(power, allied, type, rGenerator) {
		this.Randomizer = rGenerator;
		this.Power = power;
		this.AlliedState = allied;
		this.Type = type;
		if (this.Type==ALLIANCE.GRANT)
			this.SetCommodity();
	},
	SetCommodity() {

		this.Commodity = PowerProfiles[this.AlliedState.AssociatedIndex][1];
	},
	UpdateHistory() {  //TODO: re-write, rename ::Update

		switch (this.Type) {
			case ALLIANCE.GRANT:
				++this.AlliedState.Grants[this.Power.Index];
				break;
			case ALLIANCE.AID:
				++this.AlliedState.Aid[this.Power.Index];
				break;
			case ALLIANCE.TREATY:
				++this.AlliedState.Treaties[this.Power.Index];
				break;
			case ALLIANCE.PACT:
				++this.AlliedState.Pacts[this.Power.Index];
				break;
		}
	}
};
