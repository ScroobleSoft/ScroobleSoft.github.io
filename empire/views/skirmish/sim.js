
//-----------------------------------------------------------
//---------- BATTALION SKIRMISH SIM VIEW --------------------
var BattalionSkirmishSimView = function() {
	var SimButton, PlayButton;
	var LeftBattalions, RightBattalions;
	var LeftBattalionSoldiers, RightBattalionSoldiers
	var MaxLeftSoldiers, MaxRightSoldiers, MaxSoldiers;
	var LeftAdvantage, RightAdvantage;
};
BattalionSkirmishSimView.prototype = new GenieView();
BattalionSkirmishSimView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
BattalionSkirmishSimView.prototype.SetBattalions = function(lBttlns, rBttlns) {  //UNLOGGED
	var i;

	this.LeftBattalions = lBttlns;
	this.MaxLeftSoldiers = new Array(this.LeftBattalions.length);
	for (i=0;i<this.LeftBattalions.length;++i)
		this.MaxLeftSoldiers[i] = this.LeftBattalions[i].GetSoldiers();

	this.RightBattalions = rBttlns;
	this.MaxRightSoldiers = new Array(this.RightBattalions.length);
	for (i=0;i<this.RightBattalions.length;++i)
		this.MaxRightSoldiers[i] = this.RightBattalions[i].GetSoldiers();
};
