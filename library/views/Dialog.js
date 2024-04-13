
//------------------------------------------------
//----------- GENIE DIALOG VIEW ------------------  UNLOGGED
var GenieDialogView = function() {
	var ParentView;
	var OkButton;
};
GenieDialogView.prototype = new GenieView();
GenieDialogView.prototype.Set = function(cnvs, specs, tWriter, pView) {

	this.SetLinks(null, this.TextWriter);

	GenieView.prototype.Set.call(this, cnvs, specs);

	this.ParentView = pView;
};
GenieDialogView.prototype.SetControls = function() {

	this.OkButton = new GenieText();
	this.OkButton.Set(this.Canvas, this.Specs, this.TextWriter);
	this.Controls.push(this.OkButton);
};
GenieDialogView.prototype.Open = function() {

	this.ParentView.Disable();
	this.Draw();
	this.OkButton.Show();
};
GenieDialogView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.OkButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		setTimeout(this.Close.bind(this), 100);
	}
};
GenieDialogView.prototype.Close = function() {

	this.OkButton.Disable();
	this.ParentView.Open();
};
