
DominionAlliedState.prototype.SetAlliance = function(power, type) {

	this.Alliances[type].Power = power;
	this.Alliances[type].AlliedState = this;
	switch (type) {
		case ALLIANCE.GRANT:
			++this.Alliances[type].GrantCredits;
			break;
		case ALLIANCE.AID:
			++this.Alliances[type].AidCredits;
			break;
		case ALLIANCE.GRANT:
			++this.Alliances[type].MissionCredits;
			break;
	}
};
DominionAlliedState.prototype.DissolveAlliance = function(type) {  //UNLOGGED
};
DominionAlliedState.prototype.UpdateAlliance = function(type) {  //UNLOGGED
};
DominionAlliedState.prototype.GetAlly = function(type) {  //UNLOGGED
};
