
//-------------------------------------------------
//---------- DOMINION ALLIANCE --------------------  TODO: could move to Types.js if remains basic
var DominionAlliance = function() {
	var Type;
	var Power, AlliedState;
};
DominionAlliance.prototype = {
	Set(power, allied, type) {
		this.Power = power;
		this.AlliedState = allied;
		this.Type = type;
		this.UpdateHistory();
	},
	UpdateHistory() {

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
