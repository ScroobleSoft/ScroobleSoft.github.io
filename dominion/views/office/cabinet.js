
//----------------------------------------------
//---------- FILING CABINET --------------------
var FilingCabinet = function() {
	var Specs, DimensionSpecs;
	var GraphicsTool;
};
FilingCabinet.prototype = {
	Set(specs, gTool) {
		this.Specs = specs;
		if (Game.CheckMobile())
			this.DimensionSpecs = this.Specs.MOBILE;
		else
			this.DimensionSpecs = this.Specs;
		this.GraphicsTool = gTool;
	},
	Draw() {  //UNLOGGED . . . TODO: show drawer open, maybe with tops of files/folders visible
		var i;
		var l, t;
		var tw, h;

		//Body, drawers and handles
		this.GraphicsTool.DrawRectangle(this.DimensionSpecs.L, this.DimensionSpecs.T, this.DimensionSpecs.W, this.DimensionSpecs.H, this.Specs.COLOUR.BODY, 0);
		for (i=0;i<this.Specs.DRAWER.COUNT;++i) {
			l = this.DimensionSpecs.L + this.DimensionSpecs.DRAWER.GAP;
			t = this.DimensionSpecs.T + (this.DimensionSpecs.DRAWER.GAP*(i+1)) + (this.DimensionSpecs.DRAWER.H*i) + 1;
			this.GraphicsTool.DrawRectangle(l, t, this.DimensionSpecs.DRAWER.W, this.DimensionSpecs.DRAWER.H, this.Specs.COLOUR.HANDLE, 1);		//crease
			l += this.DimensionSpecs.HANDLE.L;
			t += this.DimensionSpecs.HANDLE.T;
			this.GraphicsTool.DrawRectangle(l, t, this.DimensionSpecs.HANDLE.W, this.DimensionSpecs.HANDLE.H, this.Specs.COLOUR.HANDLE, 0);		//handle
			this.GraphicsTool.DrawRectangle(l, t, this.DimensionSpecs.HANDLE.W, this.DimensionSpecs.HANDLE.H, "black", 1);
		}

		//Trapezoid
		tw = this.DimensionSpecs.W / 2;
		h = this.DimensionSpecs.W / 4;
		this.GraphicsTool.DrawTrapezoid(this.DimensionSpecs.L, this.DimensionSpecs.T, tw, this.DimensionSpecs.W, h, this.Specs.COLOUR.BODY, 0);
		this.GraphicsTool.DrawHorizontalLine( { X: this.DimensionSpecs.L, Y: this.DimensionSpecs.T }, this.DimensionSpecs.W, this.Specs.COLOUR.HANDLE, 1);
	}
};
