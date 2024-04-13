
//------------------------------------------------------
//---------- MOBILE GAME CONTROLLER --------------------
var MobileGameController = function() {
	var Canvas;
	var PushButtons;
	var ButtonSpecs;		//NOTE: additional info to allow mobile scaling
	var EdgeImages;
	var KeyClicked;
};
MobileGameController.prototype = new GenieControl();
MobileGameController.prototype.Set = function(cnvs, specs, iBtn, iEdges) {
//	GenieControl.prototype.Set.call(this, cnvs, specs, iBtn);

	this.Canvas = cnvs;
	this.Context = this.Canvas.Context;
	this.Specs = specs;
	this.Pic = iBtn;
	this.EdgeImages = iEdges;
	this.SetPushButtons();
};
MobileGameController.prototype.SetPushButtons = function() {
	var i;
	var w, h, lw;

	this.PushButtons = new GenieArray();
	this.PushButtons.Set(MOBILeCONTROLLER.BUTTONS, GeniePushButton, INDEXED, this.Canvas, MOBILeCONTROLLER.KEY, this.EdgeImages);
	for (i=0;i<this.PushButtons.length;++i) {
		this.PushButtons[i].BespokeSpecs();
		if (this.Specs.KEY) {
			w = this.Specs.KEY.W || MOBILeCONTROLLER.KEY.W;
			h = this.Specs.KEY.H || MOBILeCONTROLLER.KEY.H;
			lw = this.Specs.KEY.LW || MOBILeCONTROLLER.KEY.LW;
		} else {
			w = MOBILeCONTROLLER.KEY.W;
			h = MOBILeCONTROLLER.KEY.H;
			lw = MOBILeCONTROLLER.KEY.LW;
		}
		this.PushButtons[i].Specs.L = this.Specs.L + ((w+this.Specs.O)*(i % MOBILeCONTROLLER.KEY.C));
		this.PushButtons[i].Specs.T = this.Specs.T + ((h+this.Specs.O)*Math.floor(i/MOBILeCONTROLLER.KEY.C));
		this.PushButtons[i].Specs.W = w;
		this.PushButtons[i].Specs.H = h;
		this.PushButtons[i].Specs.LW = lw;
	}
};
MobileGameController.prototype.CheckClicked = function() {

	for (this.i=0;this.i<this.PushButtons.length;++this.i)
		if (this.PushButtons[this.i].CheckPressed()) {
			this.KeyClicked = this.i;
			return (true);
		}

	return (false);
};
