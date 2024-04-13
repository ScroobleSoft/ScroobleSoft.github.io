
//--------------------------------------------
//---------- LEXI PUZZLES --------------------
var LexiPuzzles = function () {
};
LexiPuzzles.prototype = new GenieGame();
LexiPuzzles.prototype.Set = function(intrfc, gTool, tWriter, rGenerator) {

	this.Interface = intrfc;
	this.Screen = this.Interface.PrimeScape.Context;
	this.GraphicsTool = gTool;
	this.TextWriter = tWriter;
	this.Randomizer = rGenerator;

   this.Components = new LexiComponents();
};
LexiPuzzles.prototype.SetComponents = function() {

   this.Components.Set(this.Interface, this.GraphicsTool, this.TextWriter, this.Randomizer);
};
LexiPuzzles.prototype.CheckImagesLoaded = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.CheckImagesLoaded.bind(this));

	if (ImageManager.AllLoaded) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.SetComponents();
		this.Start();
	}
};
LexiPuzzles.prototype.Start = function() {

	MainView.Open();
	MainView.Update();
};
