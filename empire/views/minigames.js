
//------------------------------------------------------
//---------- EMPIRE MINI-GAMES VIEW --------------------
var EmpireMiniGamesView = function() {
	var Methods;

	var indx;		//scratch variables
};
EmpireMiniGamesView.prototype = new GenieView();
EmpireMiniGamesView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
EmpireMiniGamesView.prototype.SetData = function() {  //UNLOGGED

	//-make a list of functions to call in .Methods; e.g. below
	//-this.Methods = [ this.OpenMiniGames1.bind(this), this.OpenMiniGames2.bind(this), this.OpenMiniGames3.bind(this) ];
};
EmpireMiniGamesView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked())
		if (MiniGamesImage.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.indx = MiniGamesImage.GetMapEntry(CLICKED);
			setTimeout(this.Methods[this.indx]);
		}
};
EmpireMiniGamesView.prototype.Draw = function() {

	MiniGamesImage.Draw();
};
