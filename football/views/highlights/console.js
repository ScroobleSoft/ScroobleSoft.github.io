
//-------------------------------------------------------------
//---------- MATCH HIGHLIGHTS CONSOLE VIEW --------------------
var MatchHighlightsConsoleView = function() {
	var FormationIconPanel;
};
MatchHighlightsConsoleView.prototype = new GenieSubView();
MatchHighlightsConsoleView.prototype.Set = function(cnvs, specs, pView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, pView);

};
MatchHighlightsConsoleView.prototype.SetControls = function() {

	if (Game.CheckMobile())
		this.FormationIconPanel = this.SetBevelledIconPanel(this.Specs.ICOnPANEL.FORMATION, this.Specs.ICOnPANEL.FORMATION.IMAGE,
																																				this.Specs.ICOnPANEL.FORMATION.BEVEL);
};
MatchHighlightsConsoleView.prototype.Open = function() {
	GenieSubView.prototype.Open.call(this);

	this.FormationIconPanel.DepressedIcon = TeamSelected.Formation;
	this.FormationIconPanel.Draw();
};
