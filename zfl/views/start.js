/*
 *		main screen could have game info, such as differences from pro football, and general instructions
 */
//---------------------------------------------------
//---------- GRIDIRON START VIEW --------------------
var GridironStartView = function() {
};
GridironStartView.prototype = new GenieView();
GridironStartView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
GridironStartView.prototype.SetControls = function() {  //UNLOGGED

};
GridironStartView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckClicked(CANVAS.PRIME)) {
	} else if (Mouse.CheckClicked(CANVAS.ZOOM))
		this.InfoView.UpdateClick();
	else if (Mouse.CheckClicked(CANVAS.CONSOLE)) {
	}

	this.ConsoleView.Update();
};
GridironStartView.prototype.Draw = function() {  //UNLOGGED

};
GridironStartView.prototype.OpenLeagueView = function() {  //UNLOGGED

	LeagueView.Open();
	LeagueView.Update();
};
