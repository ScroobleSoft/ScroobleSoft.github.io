
//---------------------------------------------------
//---------- GRIDIRON INTRO VIEW --------------------
var GridironIntroView = function() {
};
GridironIntroView.prototype = new GenieView();
GridironIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
GridironIntroView.prototype.SetControls = function() {  //UNLOGGED

};
GridironIntroView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckClicked(CANVAS.PRIME)) {
	} else if (Mouse.CheckClicked(CANVAS.ZOOM))
		this.InfoView.UpdateClick();
	else if (Mouse.CheckClicked(CANVAS.CONSOLE)) {
	}

	this.ConsoleView.Update();
};
GridironIntroView.prototype.Draw = function() {  //UNLOGGED

};
GridironIntroView.prototype.OpenLeagueView = function() {

	LeagueView.Open();
	LeagueView.Update();
};
