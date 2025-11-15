
//----------------------------------------------------
//---------- DOMINION CHOICE VIEW --------------------
var DominionChoiceView = function() {
	var Nation;
};
DominionChoiceView.prototype = new GenieView();
DominionChoiceView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.State = this.Specs.STATE.GAZETTEER;
	WorldMap.SelectNation(PlayerPower);
};
DominionChoiceView.prototype.SetNation = function(nation) {

	this.Nation = nation;
	ChoiceInfoView.SetNation(this.Nation);
};
DominionChoiceView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		if (this.State==this.Specs.STATE.GAZETTEER) {
			WorldMap.CheckNationClicked();
			if (WorldMap.SelectedNation) {
				WorldMap.Draw();
				this.InfoView.SetNation(WorldMap.SelectedNation);
				this.InfoView.DisplayNationInfo();
			}
		}
	} else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		this.InfoView.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE))
		Mouse.ClearAll();

	WorldMap.Update();

	this.InfoView.Update();
	this.ConsoleView.Update();
};
DominionChoiceView.prototype.Draw = function() {  //UNLOGGED

	WorldMap.Draw();
};
