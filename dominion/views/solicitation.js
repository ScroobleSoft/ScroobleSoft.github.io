/*
		the formula is that each Allied gets a probability rating that they will approach
		8 attempts are made where an unallied Allied is randomly picked, and the odds are played to see if they might approach
		if no successes, then an allied or unallied is picked, allied stating the alliance they have and demanding more
		TODO: continent/non-continent dynamic not implemented
*/
//----------------------------------------------------------
//---------- DOMINION SOLICITATION VIEW --------------------
var DominionSolicitationView = function() {
   var AlliedState;		//.AlliedState REDUNDANT
	var Alliance;

	var i;
};
DominionSolicitationView.prototype = new GenieView();
DominionSolicitationView.prototype.Set = function(cnvs, specs) {
   GenieView.prototype.Set.call(this, cnvs, specs);

	this.State = this.Specs.STATE.CLICKABLE;
	this.Frames = 30;
};
DominionSolicitationView.prototype.SetPower = function(power) {  //UNLOGGED
};
/*
DominionSolicitationView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

};
*/
DominionSolicitationView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.State==this.Specs.STATE.CLICKABLE)
		this.UpdateClick();
	else {
		this.UpdateFrames();
		this.InfoView.UpdateButtons();
		Mouse.ClearAll();
	}

	GenieView.prototype.Update.call(this);
};
DominionSolicitationView.prototype.Draw = function() {  //UNLOGGED

	WorldMap.Draw();
};
DominionSolicitationView.prototype.UpdateClick = function() {

	if (Mouse.CheckClicked(CANVAS.PRIME))
		for (this.i=0;this.i<ALLIED.COUNT;++this.i)
			if (SpaceUtils.CheckPointInCircle(Mouse, AlliedStates[this.i].Location, MAP.SIZE.ALLIED/2)) {
				WorldMap.SelectNation(AlliedStates[this.i]);
				WorldMap.Draw();
				this.InfoView.SetNation(AlliedStates[this.i]);
				this.InfoView.DisplayNationInfo();
				return;
			}
};
DominionSolicitationView.prototype.UpdateFrames = function() {  //UNLOGGED

	--this.Frames;
	if (!this.Frames) {
		WorldMap.SelectionFlag = !WorldMap.SelectionFlag;
		WorldMap.Draw();
		this.Frames = 30;
	}
};
DominionSolicitationView.prototype.GenerateOffer = function() {  //UNLOGGED - maybe should be in TurnConsoleView . . . REDUNDANT?
	var nOffrs;
	var iAlld;

	//Try 8 times to make an alliance with an unallied state
	nOffrs = 0;
	while (nOffrs!=8) {		//TODO: remove HARD-CODING
		iAlld = this.Randomizer.GetIndex(ALLIED.COUNT);
		if (!AlliedStates[iAlld].Alliance)
			if (this.CheckOffer(iAlld)) {
				this.AlliedState = AlliedStates[iAlld];
				this.AllianceType = this.DetermineAllianceType();
				return;
			}
		++nOffrs;
	}

	//Pick any Allied to force alliance
};
DominionSolicitationView.prototype.CheckOffer = function(iAllied) {  //UNLOGGED
	var odds;

	odds = 10 * (9-this.Allieds[iAllied].Proximity);
	if (this.Randomizer.CheckUnderOdds(odds))
		return (true);
};
DominionSolicitationView.prototype.DetermineAllianceType = function() {  //UNLOGGED

	//-at the moment, it is just aid
	this.AllianceType = ALLIANCE.AID;
};
