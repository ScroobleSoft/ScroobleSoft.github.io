
//-------------------------------------------
//---------- GENIE SHAPE --------------------
var GenieShape = function() {
	var CalcPad;
	var Context, SavedContext;
	var Specs;
	var GlobalAlpha;
	var X, Y;
	var Colour, LineWidth;
	var Angle, Style, Opacity;

	var i;
};
GenieShape.prototype = {
	Set(cntxt, cPad, specs) {	//TODO: rather have specs first with the rest of the arguments to follow; actually, use SetLinks
		this.Context = cntxt;
		this.CalcPad = cPad;
		this.Specs = specs;
	},
	Reset() {

		this.Colour = this.Specs.COLOUR || "black";
		if (this.Specs.LW==null)
			this.LineWidth = 1;
		else
			this.LineWidth = this.Specs.LW;
		this.Angle = this.Specs.ANGLE || 0;
		this.Style = this.Specs.STYLE || STYLE.WIReFRAME;
		this.Opacity = this.Specs.OPACITY || 1.0;
		this.X = this.Specs.X;
		this.Y = this.Specs.Y;
	},
	SetContext(cntxt) {

		this.SavedContext = this.Context;
		this.Context = cntxt;
	},
	ResetContext() {

		this.Context = this.SavedContext;
	},
	SetPosition(pos) {

		this.X = pos.X;
		this.Y = pos.Y;
	},
	SetOpacity(opcty) {

		if (opcty) {
	 this.GlobalAlpha = this.Context.globalAlpha;
	 this.Context.globalAlpha = opcty;
		} else
	 this.GlobalAlpha = null;
	},
	ResetOpacity() {

		if (this.GlobalAlpha)
	 this.Context.globalAlpha = this.GlobalAlpha;
	},
	DrawOutlined(x, y, size, colour, lWidth, style, opcty) {

		this.Draw(x, y, size, "black", 1);
		this.Draw(x, y, size, colour, lWidth, style, opcty);
	},
	Draw(x, y, vrtcs, colour, lWidth, style, opcty) {

		if (lWidth) {
	 this.Context.strokeStyle = colour;
	 this.Context.lineWidth = lWidth;
		} else
	 this.Context.fillStyle = colour;
		this.Context.beginPath();
		this.Context.moveTo(x+vrtcs[0].X, y+vrtcs[0].Y);
		for (i=1;i<vrtcs.length;++i)
	 this.Context.lineTo(x+vrtcs[i].X, y+vrtcs[i].Y);
		if (lWidth) {
	 this.Context.lineTo(x+vrtcs[0].X, y+vrtcs[0].Y);
	 this.Context.stroke();
		} else
	 this.Context.fill();
		this.Context.closePath();
	}
};
