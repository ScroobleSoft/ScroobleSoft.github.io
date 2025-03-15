
//--------------------------------------------------------
//---------- FOOTBALL BENCH INFO VIEW --------------------
var FootballBenchInfoView = function() {
};
FootballBenchInfoView.prototype = new GenieSubView();
FootballBenchInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
FootballBenchInfoView.prototype.Draw = function() {  //UNLOGGED

	//-if 11 starters are picked, that'll leave 34 listable players, so not all will be shown (may need spin controls)
};
