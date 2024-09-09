
//------------------------------------------------
//----------- GENIE NESTED VIEW ------------------  NOTE: only small changes from GenieView
var GenieNestedView = function() {
	var ParentView;
};
GenieNestedView.prototype = new GenieView();
GenieNestedView.prototype.Set = function(cnvs, specs, pView) {
	GenieView.prototype.Set.call(this, cnvs, specs)

	this.ParentView = pView;
};
GenieNestedView.prototype.Open = function() {

	this.ParentView.NestedView = this;
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
GenieNestedView.prototype.Update = function() {  //NOTE: often over-ridden, but not always
};
GenieNestedView.prototype.Close = function() {

	if (this.Controls.length)  //hide controls
		this.Controls.forEach( function(cntrl) {cntrl.Hide();} );
};
