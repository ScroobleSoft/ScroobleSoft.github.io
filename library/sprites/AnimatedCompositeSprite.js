
//---------------------------------------------------------
//---------- ANIMATED COMPOSITE SPRITE --------------------
var AnimatedCompositeSprite = function() {
	var MultiShapes;
	var State;
	var ZeroStateLeft, ZeroStateTop;
};
AnimatedCompositeSprite.prototype = new CompositeSprite();
AnimatedCompositeSprite.prototype.Set = function(cntxt, pic, specs, cPad) {
	CompositeSprite.prototype.Set.call(this, cntxt, pic, specs, cPad);

	this.State = 0;
	this.ZeroStateLeft = this.Specs.L;
	this.ZeroStateTop = this.Specs.T;
};
AnimatedCompositeSprite.prototype.SetShapesArray = function() {
	var i;

	if (Array.isArray(this.Specs.GS[0])) {
		this.MultiShapes = new Array(this.Specs.GS.length);
		for (i=0;i<this.Specs.GS.length;++i) {
			this.MultiShapes[i] = new Array(this.Specs.GS[i].length);
			this.SetShapes(this.MultiShapes[i], this.Specs.GS[i]);
		}
	} else
		CompositeSprite.prototype.SetShapesArray.call(this);
};
AnimatedCompositeSprite.prototype.SetDraw = function(state) {

	//Set starting point for drawing from sprite sheet
	this.State = state;
	if (this.Specs.C) {
		this.Left = this.ZeroStateLeft + ((this.State % this.Specs.C)*(this.Specs.W+this.Specs.O));
		this.Top = this.ZeroStateTop + (Math.floor(this.State/this.Specs.C)*(this.Specs.H+this.Specs.O));
	} else
		this.Left = this.ZeroStateLeft + (this.State*(this.Specs.W+this.Specs.O));
};
AnimatedCompositeSprite.prototype.Draw = function(x, y, state) {

	state = state || 0;
	this.SetDraw(state);
	if (this.MultiShapes)
		this.Shapes = this.MultiShapes[state];

	CompositeSprite.prototype.Draw.call(this, x, y);
};
