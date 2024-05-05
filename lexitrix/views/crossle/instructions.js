
//----------------------------------------------------------------
//----------- LEXI INSTRUCTION CROSSLE VIEW ----------------------
var LexiCrossleInstructionView = function() {
	var EmptyGridImage, FaintImage, AllImage;
	var KeyImage, SolidImage, IncorrectImage, ClearImage;
};
LexiCrossleInstructionView.prototype = new GenieDialogView();
LexiCrossleInstructionView.prototype.Set = function(cnvs, specs, pView, gTool, tWriter) {

	this.SetLinks(gTool, tWriter);

	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);
};
LexiCrossleInstructionView.prototype.SetImages = function() {

	this.EmptyGridImage = new GenieImage();
	this.EmptyGridImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.EMPTY);
	this.KeyImage = new GenieImage();
	this.KeyImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.KEY);
	this.FaintImage = new GenieImage();
	this.FaintImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.FAINT);
	this.SolidImage = new GenieImage();
	this.SolidImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SOLID);
	this.AllImage = new GenieImage();
	this.AllImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.ALL);
	this.IncorrectImage = new GenieImage();
	this.IncorrectImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.INCORRECT);
	this.ClearImage = new GenieImage();
	this.ClearImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.CLEAR);
};
LexiCrossleInstructionView.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);

	this.DrawImages();
	this.WriteText();
};
LexiCrossleInstructionView.prototype.DrawImages = function() {

	this.EmptyGridImage.Draw();
	this.FaintImage.Draw();
	this.AllImage.Draw();
	this.KeyImage.Draw();
	this.SolidImage.Draw();
	this.IncorrectImage.Draw();
	this.ClearImage.Draw();
};
LexiCrossleInstructionView.prototype.WriteText = function() {

	this.TextWriter.Write("Aim of the game: solve the 'crossword' with", 30, 40);
	this.TextWriter.Write("the fewest double-clicks and incorrect clicks.", 30, 60);

	this.TextWriter.Write("Click/tap a cell to select it", 30, 85);
	this.TextWriter.Write("(indicated by blue outline).", 30, 105);
	this.TextWriter.Write("Click a key to place", 70, 135);
	this.TextWriter.Write("a letter in the cell.", 70, 155);

	this.TextWriter.Write("A singles click writes", 30, 190);
	this.TextWriter.Write("the letter in faint ink.", 30, 210);
	this.TextWriter.Write("If there isn't a second click", 30, 230);
	this.TextWriter.Write("within a second, the letter", 30, 250);
	this.TextWriter.Write("is re-written in solid ink.", 30, 270);

	this.TextWriter.Write("But a second click", 30, 300);
	this.TextWriter.Write("(double-click) reveals all", 30, 320);
	this.TextWriter.Write("instances of that letter.", 30, 340);
	this.TextWriter.Write("A correct single click also", 30, 370);
	this.TextWriter.Write("displays all occurrences.", 30, 390);

	this.TextWriter.Write("An incorrect entry is indicated", 30, 425);
	this.TextWriter.Write("by a red background.", 30, 445);

	this.TextWriter.Write("Double-clicking a cell clears it.", 30, 480);
};
