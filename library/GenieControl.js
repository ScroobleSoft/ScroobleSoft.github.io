
//----------------------------------------------
//----------- GENIE CONTROL --------------------
var GenieControl = function() {
	var Canvas, Context;
	var GraphicsTool, TextWriter;
	var Specs;
	var Pic;
	var Clicked, MouseDowned, MouseUpped;	//TODO: these should have 'Flag' suffix
	var Enabled, Visible, DeActivated;		//TODO: these should have 'Flag' suffix
	var ToolTip;

	var i, x, y, rct;
};
GenieControl.prototype = {
	Set(cnvs, specs, img) {
		this.Canvas = cnvs;
		this.Canvas.RegisterControl(this);
		this.Context = this.Canvas.Context;
		this.Specs = specs;
		this.Pic = img;
		this.Enabled = false;
		this.MouseDowned = false;
		this.Clicked = false;
		if (this.Specs.TOOLTIP) {
			this.ToolTip = new GenieToolTip();
			this.ToolTip.Set(this.Context, this.GraphicsTool, this.TextWriter, this.Specs.TOOLTIP);
		}
	},
	SetLinks(gTool, tWriter) {

		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
	},
	MakeSpecsUnique() {

		this.Specs = Object.assign({}, this.Specs);		//UNTESTED!
	},
	BespokeSpecs() {  //UNLOGGED - same as above, meant to replace

		this.Specs = Object.assign({}, this.Specs);
	},
	Erase(colour) {

		if (colour) {
			this.Context.fillStyle = colour;
			this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
		} else {
			if (this.Specs.BACKGROUND) {
				this.Context.fillStyle = this.Specs.BACKGROUND;
				this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
			} else
				this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
		}
	},
	Show() {

		this.Enabled = true;
		this.Draw();
		this.Visible = true;
	},
	Hide(colour) {  //TODO: should have the option as in ::DrawDisabled to state colour in specs

		this.Enabled = false;
		this.Erase(colour);
		this.Visible = false;
	},
	Enable() {

		this.Show();
	},
	Disable() {  //TODO: for most controls, could set opacity to 0.5 in over-riding functions

		if (this.Visible) {
			this.Enabled = false;
			this.DrawDisabled();
		}
	},
	DeActivate() {

		this.DeActivated = true;
	},
	Activate() {

		this.DeActivated = false;
	},
	MouseOver() {
/*
		this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
		this.Context.globalAlpha = 0.8;
		this.Draw();
		this.Context.globalAlpha = 1.0;
*/
	},
	MouseOut() {
//		this.Draw();
	},
	MouseDown() {

		this.MouseDowned = true;
	},
	MouseUp() {

		this.MouseUpped = true;
	},
	ClickedOn() {

		this.Clicked = true;
	},
	CheckClickedOn() {

		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.Specs))
			return (true);
		else
			return (false);
	},
	CheckClicked() {

		if (!this.Clicked)
			return (false);
		else {
			this.Clicked = false;
			return (true);
		}
	},
	CheckMouseDown() {

		if (!this.MouseDowned)
			return (false);
		else {
			this.MouseDowned = false;
			return (true);
		}
	},
	CheckMouseUp() {

		if (!this.MouseUpped)
			return (false);
		else {
			this.MouseUpped = false;
			return (true);
		}
	},
	Draw() {

		this.Pic.Draw(this.Specs.L, this.Specs.T);
	},
	DrawDisabled() {

		this.Context.globalAlpha = 0.5;
		this.Draw();
		this.Context.globalAlpha = 1.0;
	},
	CheckDisabled() {

		return (!this.Enabled);
	}
};
