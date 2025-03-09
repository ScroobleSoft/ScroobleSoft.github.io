
//---------------------------------------------------------------
//----------- LEXI INSTRUCTION TURTLE VIEW ----------------------
var LexiTurtleInstructionView = function() {
	var SelectedCellImage, IncorrectSelectedImage, IncorrectCellImage, CorrectCellImage, UnselectedCellImage;
	var KeyImage, LettersIconImage;
};
LexiTurtleInstructionView.prototype = new GenieDialogView();
LexiTurtleInstructionView.prototype.Set = function(cnvs, specs, pView) {
	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);

};
LexiTurtleInstructionView.prototype.SetImages = function() {

	this.SelectedCellImage = new GenieImage();
	this.SelectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SELECTED);
	this.IncorrectSelectedImage = new GenieImage();
	this.IncorrectSelectedImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.YELLOW);
	this.IncorrectCellImage = new GenieImage();
	this.IncorrectCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.INCORRECT);
	this.CorrectCellImage = new GenieImage();
	this.CorrectCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.CORRECT);
	this.KeyImage = new GenieImage();
	this.KeyImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.KEY);
	this.UnselectedCellImage = new GenieImage();
	this.UnselectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.UNSELECTED);
	this.LettersIconImage = new GenieImage();
	this.LettersIconImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.LETTERS);
};
LexiTurtleInstructionView.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);

	this.DrawImages();
	this.WriteText();
};
LexiTurtleInstructionView.prototype.DrawImages = function() {

	this.SelectedCellImage.Draw();
	this.IncorrectSelectedImage.Draw();
	this.KeyImage.Draw();
	this.IncorrectCellImage.Draw();
	this.CorrectCellImage.Draw();
	this.UnselectedCellImage.Draw();
	this.LettersIconImage.Draw();
};
LexiTurtleInstructionView.prototype.WriteText = function() {

	this.TextWriter.Write("Aim of the game: guess the 9-letter word,", 30, 40);
	this.TextWriter.Write("6-letter word, and 4 5-letter words.", 30, 60);

	this.TextWriter.Write("Click/tap a cell to select it", 40, 90);
	this.TextWriter.Write("(indicated by green/yellow", 40, 110);
	this.TextWriter.Write("outline).", 40, 130);


	this.TextWriter.Write("Click a key to place a", 40, 160);
	this.TextWriter.Write("letter in the cell.", 40, 180);

	this.TextWriter.Write("An incorrect entry is indicated", 40, 210);
	this.TextWriter.Write("by a red background.", 40, 230);

	this.TextWriter.Write("A correct entry retains the", 40, 260);
	this.TextWriter.Write("green background.", 40, 280);

	this.TextWriter.Write("Pressing the 'Show Solved Letters' icon", 40, 340);
	this.TextWriter.Write("reveals all instances of correctly guessed", 40, 360);
	this.TextWriter.Write("letters from that point on.", 40, 380);
};
