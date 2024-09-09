
//---------------------------------------------
//----------- GENIE SUB VIEW ------------------  NOTE: only small changes from GenieView
var GenieSubView = function() {
	var MainView;
};
GenieSubView.prototype = new GenieView();
GenieSubView.prototype.Set = function(cnvs, specs, mView) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.MainView = mView;
};
GenieSubView.prototype.Open = function() {

	this.Canvas.View = this;
	if (this.Specs.COLOUR) {
		if (this.Specs.W) {
			this.Context.fillStyle = this.Specs.COLOUR;
			this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H); 
		} else
			this.ColourScape(null, this.Specs.COLOUR);
	}
	this.Draw();
	this.ShowControls();
};
GenieSubView.prototype.Update = function() {  //NOTE: often over-ridden, but not always
};
GenieSubView.prototype.Close = function() {

	//Disable controls
	if (this.Controls.length)
		this.Controls.forEach( function(cntrl) {cntrl.Enabled=false;} );
	if (this.NestedView)
		this.NestedView.Close();
//	this.Context.clearRect(0, 0, this.Canvas.Element.width, this.Canvas.Element.height);  //TODO: this might be unnecessarily spurious
};
GenieSubView.prototype.Disable = function() {

	this.Controls.forEach(function(cntrl){cntrl.DeActivate();});
	this.Darken();
};
