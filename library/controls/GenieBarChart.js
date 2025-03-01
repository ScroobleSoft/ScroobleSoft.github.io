
//-----------------------------------------------  Specs: { L: -1, T: -1, W: -1, H: -1, BAR: { W: -1, H: -1, COUNT: -1 }, GAP: -1,
//---------- GENIE BAR CHART --------------------				BACKGROUND: "", COLOUR: "", COLOURS: [], ORIENT: ORIENTATION.VERTICAL }
var GenieBarChart = function() {
	var Bars;
	var BarSpacing;

	var i, x, y, w, h;		//NOTE: using scratch variables as some charts could change repeatedly and quickly
};
GenieBarChart.prototype = new GenieControl();
GenieBarChart.prototype.Set = function(canvas, specs) {
	GenieControl.prototype.Set.call(this, canvas, specs);

	this.SetBars();
};
GenieBarChart.prototype.SetBars = function() {

	this.Bars = new Array(this.Specs.BAR.COUNT);
	if (this.Specs.GAP)
		this.BarSpacing = this.Specs.GAP;
	else {
		if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL)  //NOTE: default is vertical
			this.BarSpacing = Math.round((this.Specs.H-(this.Specs.BAR.COUNT*this.Specs.BAR.H))/this.Specs.BAR.COUNT+1);
		else
			this.BarSpacing = Math.round((this.Specs.W-(this.Specs.BAR.COUNT*this.Specs.BAR.W))/this.Specs.BAR.COUNT+1);
	}
};
GenieBarChart.prototype.Update = function(nBar, val) {  //NOTE: val signifies percentage

	this.Bars[nBar] = val;
};
GenieBarChart.prototype.Draw = function() {

	//Draw background
	this.Context.fillStyle = this.Specs.BACKGROUND || BArCHART.COLOUR.BACKGROUND;
	this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

	this.GraphicsTool.SetContext(this.Context);

	//Draw axes
	this.GraphicsTool.DrawVerticalLine( { X: this.Specs.L, Y: this.Specs.T }, this.Specs.H, "black", 1);
	this.GraphicsTool.DrawHorizontalLine( { X: this.Specs.L, Y: this.Specs.T+this.Specs.H }, this.Specs.W, "black", 1);

	//Draw bars
	if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL)
		for (this.i=0;this.i<this.Specs.BAR.COUNT;++this.i) {
			this.w = Math.round((this.Specs.W*this.Bars[this.i])/100);
			this.x = this.Specs.L + 1;
			this.y = this.Specs.T + ((this.i+1)*this.BarSpacing) + (this.i*this.Specs.BAR.H);
			if (this.Specs.COLOUR)
				this.GraphicsTool.DrawRectangle(this.x, this.y, this.w, this.Specs.BAR.H, this.Specs.COLOUR, 0);
			else
				this.GraphicsTool.DrawRectangle(this.x, this.y, this.w, this.Specs.BAR.H, this.Specs.COLOURS[this.i], 0);
		}
	else
		for (this.i=0;this.i<this.Specs.BAR.COUNT;++this.i) {
			this.h = Math.round((this.Specs.H*this.Bars[this.i])/100);
			this.x = this.Specs.L + ((this.i+1)*this.BarSpacing) + (this.i*this.Specs.BAR.W) + 1;
			this.y = (this.Specs.T+this.Specs.H) - 1;
			this.GraphicsTool.DrawRectangle(this.x, this.y, this.Specs.BAR.W, -this.h, this.Specs.COLOURS[this.i], 0);
		}

	this.GraphicsTool.ResetContext();
};
