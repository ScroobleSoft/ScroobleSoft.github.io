
//---------------------------------------------------
//---------- EMPIRE TESTING VIEW --------------------
var EmpireTestingView = function() {
	var Methods;

	var indx;		//scratch variables
};
EmpireTestingView.prototype = new GenieView();
EmpireTestingView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
EmpireTestingView.prototype.SetData = function() {  //UNLOGGED

	//-make a list of functions to call in .Methods; e.g. below
	//-this.Methods = [ this.OpenTesting1.bind(this), this.OpenTesting2.bind(this), this.OpenTesting3.bind(this) ];
};
EmpireTestingView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked())
		if (TestingImage.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.indx = TestingImage.GetMapEntry(CLICKED);
			setTimeout(this.Methods[this.indx]);
		}
};
EmpireTestingView.prototype.Draw = function() {

	TestingImage.Draw();
};
