
//-------------------------------------------------
//---------- TRIANGULAR PUZZLE --------------------
var TriangularPuzzle = function () {
	var CalcPad;
	var ScreenRect;
};
TriangularPuzzle.prototype = new GenieGame();
TriangularPuzzle.prototype.Set = function(intrfc, gTool, cPad, tWriter, rGenerator) {
	GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

	this.CalcPad = cPad;
	this.ScreenRect = new GenieRect();
//	this.ScreenRect.Set((MAP.W-SCREEN.WIDTH)/2, (MAP.H-SCREEN.HEIGHT)/2, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.Components = new SawComponents();
};
TriangularPuzzle.prototype.SetComponents = function() {

	this.Components.Set(this.Interface, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer, this.ScreenRect);
};
TriangularPuzzle.prototype.Start = function() {

//	this.Play();		//TODO: this can be replaced by a view
	IntroView.Open();
};
