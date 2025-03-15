
//-----------------------------------------------------------
//---------- FOOTBALL FIXTURES INFO VIEW --------------------
var FootballFixturesInfoView = function() {
	var FixturesIconPanel;
	var IconContext;
};
FootballFixturesInfoView.prototype = new GenieSubView();
FootballFixturesInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
FootballFixturesInfoView.prototype.SetControls = function() {

	this.FixturesIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.FIXTURES, this.Specs.ICOnPANEL.FIXTURES.IMAGE, IconCornerImages,
																			this.GraphicsTool);
};
/*
FootballFixturesInfoView.prototype.ShowControls = function() {  //UNLOGGED

	this.IconContext = IconCornerImages.Context;
	IconCornerImages.Context = this.Context;
	this.FixturesIconPanel.Show();
	IconCornerImages.Context = this.IconContext;
};
*/
FootballFixturesInfoView.prototype.Update = function() {

	if (this.FixturesIconPanel.CheckMouseDown()) {
		this.MainView.ColourScape();
		this.MainView.Draw();
	}
};
FootballFixturesInfoView.prototype.Draw = function() {  //UNLOGGED - REDUNDANT?
};
