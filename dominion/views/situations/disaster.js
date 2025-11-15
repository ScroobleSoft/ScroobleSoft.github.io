
DominionChoiceInfoView.prototype.OpenDisasterScreen = function() {  //UNLOGGED

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write("Disaster", 5, 20);
	this.TextWriter.ResetContext();

	Disaster.DetermineNation(this.Nation);
	Disaster.DetermineDisaster();
	//-if nation is the same as Player Nation, then have to deal with an internal hit, in which case choice only crops up if don't have that commodity
	// in inventory, and there could be a few measures to address that (take loan/ask Power for donation/do nothing-in case of money,arms etc.)
	//-decide whether to donate (if have commodity in inventory)/pass/even take a loan to pre-empt a rival making the donation)
};
DominionChoiceInfoView.prototype.AcceptDisasterScreen = function() {  //UNLOGGED
};
