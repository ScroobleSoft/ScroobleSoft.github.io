
DominionComponents.prototype.CreateCommonSituationObjects = function() {  //UNLOGGED

	Disaster = new DominionIntrigue();
};
DominionComponents.prototype.SetCommonSituationObjects = function() {  //UNLOGGED

	Disaster.Set(this.Randomizer);
};
DominionComponents.prototype.CreateOccasionalSituationObjects = function() {  //UNLOGGED

	Intrigue = new DominionIntrigue();
	Pact = new DominionIntrigue();
};
DominionComponents.prototype.SetOccasionalSituationObjects = function() {  //UNLOGGED

	Intrigue.Set(this.Randomizer);
	Pact.Set(this.Randomizer);
};
DominionComponents.prototype.CreateUnusualSituationObjects = function() {  //UNLOGGED
};
DominionComponents.prototype.SetUnusualSituationObjects = function() {  //UNLOGGED
};
DominionComponents.prototype.CreateRareSituationObjects = function() {  //UNLOGGED
};
DominionComponents.prototype.SetRareSituationObjects = function() {  //UNLOGGED
};
