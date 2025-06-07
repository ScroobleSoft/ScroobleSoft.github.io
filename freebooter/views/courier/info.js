
//-------------------------------------------------------
//---------- SOLAR COURIER INFO VIEW --------------------  UNLOGGED
var SolarCourierInfoView = function() {
};
SolarCourierInfoView.prototype = new GenieSubView();
SolarCourierInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
/*
SolarCourierInfoView.prototype.SetControls = function() {

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
SolarCourierInfoView.prototype.Draw = function() {  //UNLOGGED

	//TEMP
	this.Context.fillStyle = GREY.SILVER;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	SolarText.SetContext(this.Context);
	SolarText.Write("4 rectangles in 2x2 layout.", 10, 120);
	SolarText.Write("Show contents of slots.", 10, 135);
	SolarText.ResetContext();
};
