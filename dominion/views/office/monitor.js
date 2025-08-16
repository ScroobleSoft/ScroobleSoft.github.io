
//----------------------------------------------
//---------- OFFICE MONITOR --------------------
var OfficeMonitor = function() {
	var Specs;
	var GraphicsTool;
	var Location;
};
OfficeMonitor.prototype = {
	Set(specs, gTool) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.Location = new Coordinate2D();
	},
	SetLocation(x, y) {

		this.Location.Set(x, y);
	},
	EraseScreen() {

		this.GraphicsTool.DrawRectangle(this.Location.X+2, this.Location.Y+2, this.Specs.W-4, this.Specs.H-4, "white", 0);
	},
	DrawFrame() {  //-draw image first, then the rounded rectangle

		this.GraphicsTool.DrawRoundedRectangle(this.Location.X, this.Location.Y, this.Specs.W, this.Specs.H, this.Specs.RDS, "black", null, this.Specs.LW);
	}
};
