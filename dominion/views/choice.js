
//----------------------------------------------------
//---------- DOMINION CHOICE VIEW --------------------
var DominionChoiceView = function() {
	var Nation;
};
DominionChoiceView.prototype = new GenieView();
DominionChoiceView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	WorldMap.SelectNation(PlayerPower);
};
DominionChoiceView.prototype.SetNation = function(nation) {  //UNLOGGED - REDUNDANT?

	this.Nation = nation;
	this.InfoView.SetNation(this.Nation);		//REDUNDANT?
};
DominionChoiceView.prototype.Update = function() {  //UNLOGGED
	GenieView.prototype.Update.call(this);

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		WorldMap.CheckNationClicked();
		if (this.SelectedNation)
			WorldMap.Draw();
	} else if (Mouse.CheckLeftClicked(CANVAS.ZOOM)) {
		Mouse.ClearAll();
	} else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
		Mouse.ClearAll();
	}
};
DominionChoiceView.prototype.Draw = function() {  //UNLOGGED

	WorldMap.Draw();
};
