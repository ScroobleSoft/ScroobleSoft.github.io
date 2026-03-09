
//------------------------------------------------
//---------- EMPIRE DEMO VIEW --------------------
var EmpireDemoView = function() {
	var Methods;

	var indx;		//scratch variables
};
EmpireDemoView.prototype = new GenieView();
EmpireDemoView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
EmpireDemoView.prototype.SetData = function() {  //UNLOGGED

	//-make a list of functions to call in .Methods; e.g. below
	//-this.Methods = [ this.OpenDemo1.bind(this), this.OpenDemo2.bind(this), this.OpenDemo3.bind(this) ];
};
EmpireDemoView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked())
		if (DemoImage.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.indx = DemoImage.GetMapEntry(CLICKED);
			setTimeout(this.Methods[this.indx]);
		}
};
EmpireDemoView.prototype.Draw = function() {

	DemoImage.Draw();
};
