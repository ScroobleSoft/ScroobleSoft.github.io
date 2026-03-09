
//----------------------------------------------------
//---------- EMPIRE TUTORIAL VIEW --------------------
var EmpireTutorialView = function() {
	var Methods;

	var indx;		//scratch variables
};
EmpireTutorialView.prototype = new GenieView();
EmpireTutorialView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
EmpireTutorialView.prototype.SetData = function() {  //UNLOGGED

	//-make a list of functions to call in .Methods; e.g. below
	//-this.Methods = [ this.OpenTutorial1.bind(this), this.OpenTutorial2.bind(this), this.OpenTutorial3.bind(this) ];
};
EmpireTutorialView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked())
		if (TutorialImage.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.indx = TutorialImage.GetMapEntry(CLICKED);
			setTimeout(this.Methods[this.indx]);
		}
};
EmpireTutorialView.prototype.Draw = function() {

	TutorialImage.Draw();
};
