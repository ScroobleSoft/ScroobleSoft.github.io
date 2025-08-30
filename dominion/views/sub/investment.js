
//---------------------------------------------------------
//---------- DOMINION INVEST INFO VIEW -------------------- 
var DominionInvestInfoView = function() {
	 var CityState;
	 var PowerCredits;
};
DominionInvestInfoView.prototype = new GenieSubView();
DominionInvestInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.CityState = CityStates[0];
	this.PowerCredits = ArrayUtils(POWER.COUNT, function() { var Index, Credit; } );
};
DominionInvestInfoView.prototype.SetControls = function() {  //UNLOGGED

};
DominionInvestInfoView.prototype.SetCityState = function(cState) {  //UNLOGGED

	this.CityState = cState;
	this.Draw();
};
DominionInvestInfoView.prototype.Draw = function() {  //UNLOGGED
	var i;

	this.TextWriter.SetColour("white");
	this.TextWriter.SetContext(this.Context);

	//Headings
	this.TextWriter.Write("Power", 5, 20, { STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Credit", 5, 100, { STYLE: FONT.STYLE.UNDERLINED } );

	//Determine leaderboard
	for (i=0;i<POWER.COUNT;++i) {
		this.PowerCredits[i].Index = i;
		this.PowerCredits[i].Credit = this.CityState.Investments[i].Credit;
	}
	this.PowerCredits.sort(function(a, b) {return (b.Credit-a.Credit);});

	//Display leaderboard
	for (i=0;i<POWER.COUNT;++i) {
		this.TextWriter.Write(PowerNames[this.PowerCredits[i].Index], 5, 40+(20*i));
		this.TextWriter.Write(CityStates[this.PowerCredits[i].Index].Credit, 5, 40+(20*i));
	}

	this.TextWriter.ResetContext();
	this.TextWriter.ResetColour();
};
