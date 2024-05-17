
//------------------------------------------------
//----------- GENIE DIALOG VIEW ------------------
var GenieDialogView = function() {
	var ParentView;
	var OkButton;
};
GenieDialogView.prototype = new GenieView();
GenieDialogView.prototype.Set = function(cnvs, specs, pView) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.ParentView = pView;
};
GenieDialogView.prototype.SetControls = function() {

	this.OkButton = new TextButton();
	this.OkButton.Set(this.Canvas, this.Specs.BUTTON.OK, this.TextWriter);
	this.OkButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.OkButton);
};
GenieDialogView.prototype.Open = function() {

	this.ParentView.Disable();

	GenieView.prototype.Open.call(this);
};
GenieDialogView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.OkButton.CheckClicked())
		this.Close();
};
GenieDialogView.prototype.Close = function() {
	GenieView.prototype.Close.call(this);

	setTimeout(this.OpenParentView.bind(this), 100);
};
GenieDialogView.prototype.OpenParentView = function() {

	this.ParentView.Open();
};
GenieDialogView.prototype.ColourScape = function() {

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
};
