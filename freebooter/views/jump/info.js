
//----------------------------------------------------
//---------- SOLAR JUMP INFO VIEW --------------------
var SolarJumpInfoView = function() {
};
SolarJumpInfoView.prototype = new GenieSubView();
SolarJumpInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
/*
SolarJumpInfoView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {
		this.InstantButton = this.SetTextButton(this.Specs.BUTTON.INSTANT, RaisedCornerImages, this.TextWriter);
		this.SubsButton = this.SetTextButton(this.Specs.BUTTON.SUBSTITUTION, RaisedCornerImages, this.TextWriter);
		this.PauseButton = this.SetTextButton(this.Specs.BUTTON.PAUSE, RaisedCornerImages, this.TextWriter);
	}
};
*/
/*
SolarTJumpInfoView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	this.Update();
};
*/
SolarJumpInfoView.prototype.Draw = function() {  //UNLOGGED

	//TEMP
	this.Context.fillStyle = GREY.SILVER;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	SolarText.SetContext(this.Context);
	SolarText.Write("Chosen planet shown rotating", 10, 125);
	SolarText.ResetContext();
};
