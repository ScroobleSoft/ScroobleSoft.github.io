
//-------------------------------------------
//---------- SOLAR CRATE --------------------
var SolarCrate = function() {
	var GraphicsTool;
	var Type;
	var X, Y;
};
SolarCrate.prototype = {
	Set(gTool) {
		this.GraphicsTool = gTool;
	},
	SetType(type) {

		this.Type = type;
	},
	SetLocation(x, y) {

		this.X = x;
		this.Y = y;
	},
	Draw() {

		this.GraphicsTool.DrawRectangle(this.X, this.Y, 31, -31, CrateColours[this.Type][1], 0);
		this.GraphicsTool.DrawRectangle(this.X, this.Y, 31, -31, CrateColours[this.Type][0], 1);
		CrateImage.DrawPatchNumber(this.Type, this.X, this.Y);
	}
};
