
//-------------------------------------------------
//----------- GENIE OPTIONS VIEW ------------------  NOTE: expects ::SetControls and ::Update to be over-ridden
var GenieOptionsView = function() {
	var Buttons;

	var i;
};
GenieOptionsView.prototype = new GenieDialogView();
GenieOptionsView.prototype.Set = function(cnvs, specs, pView) {

	this.Buttons = new Array(specs.BUTTONS);

	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);
};
GenieOptionsView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	for (this.i=0;this.i<this.Buttons.length;++this.i)
		if (this.Buttons[this.i].CheckClicked())
			this.Close(this.i);
};
GenieOptionsView.prototype.Close = function(iOptn) {
	GenieDialogView.prototype.Close.call(this);

	this.ParentView.Option = iOptn;
	setTimeout(this.OpenParentView.bind(this), 100);
};
