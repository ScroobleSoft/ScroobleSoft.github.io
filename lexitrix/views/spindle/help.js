
//---------------------------------------------------------
//----------- LEXI SPINDLE HELP VIEW ----------------------
var LexiSpindleHelpView = function() {
	var LedgerImage, KeyImage;
	var UnselectedCellImage, SelectedCellImage, WrongLetterImage, CorrectEntryImage;
};
LexiSpindleHelpView.prototype = new GenieDialogView();
LexiSpindleHelpView.prototype.Set = function(cnvs, specs, pView, gTool, tWriter) {

	this.SetLinks(gTool, tWriter);

	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);
};
LexiSpindleHelpView.prototype.SetImages = function() {

	this.LedgerImage = new GenieImage();
	this.LedgerImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.LEDGER);
	this.KeyImage = new GenieImage();
	this.KeyImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.KEY);
	this.UnselectedCellImage = new GenieImage();
	this.UnselectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.UnSELECTED);
	this.SelectedCellImage = new GenieImage();
	this.SelectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SELECTED);
	this.CorrectEntryImage = new GenieImage();
	this.CorrectEntryImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.CORRECT);
	this.WrongLetterImage = new GenieImage();
	this.WrongLetterImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.WRONG);
};
LexiSpindleHelpView.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);

	this.DrawImages();
	this.WriteText();
};
LexiSpindleHelpView.prototype.DrawImages = function() {

	this.LedgerImage.Draw();
	this.KeyImage.Draw();
	this.UnselectedCellImage.Draw();
	this.SelectedCellImage.Draw();
	this.WrongLetterImage.Draw();
	this.CorrectEntryImage.Draw();
};
LexiSpindleHelpView.prototype.WriteText = function() {

	this.TextWriter.Write("Aim of the game: Deduce the central", 55, 60);
	this.TextWriter.Write("11-letter word, or phrase.", 55, 78);

	this.TextWriter.Write("All vowels in the 5-letter", 165, 108);
	this.TextWriter.Write("words to the left and", 165, 126);
	this.TextWriter.Write("right are revealed, none", 165, 144);
	this.TextWriter.Write("in the 11-letter word.", 165, 162);

	this.TextWriter.Write("Solve the 5-letter words", 165, 193);
	this.TextWriter.Write("as necessary to reveal", 165, 211);
	this.TextWriter.Write("the central word.", 165, 229);

	this.TextWriter.Write("Click/tap a cell to select it", 125, 265);
	this.TextWriter.Write("(indicated by pink outline).", 125, 283);

	this.TextWriter.Write("Click a key to place a letter.", 90, 320);

	this.TextWriter.Write("A green background means the", 90, 358);
	this.TextWriter.Write("correct letter has been placed.", 90, 376);
	this.TextWriter.Write("All instances of that letter", 90, 394);
	this.TextWriter.Write("are revealed in the cells.", 90, 412);

	this.TextWriter.Write("A wrong letter has a red", 90, 437);
	this.TextWriter.Write("background.", 90, 455);
};
