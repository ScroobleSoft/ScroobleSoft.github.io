
//---------------------------------------------------------------
//----------- LEXI FIDDLE INSTRUCTION VIEW ----------------------
var LexiFiddleInstructionView = function() {
	var UnselectedCellImage, SelectedCellImage, SwitchedCellImage, CorrectCellsImage, CellSwitchImage;
	var RedCellImage, YellowCellImage, GreenCellImage;
	var CornerIconImage, VowelsIconImage;
};
LexiFiddleInstructionView.prototype = new GenieDialogView();
LexiFiddleInstructionView.prototype.Set = function(cnvs, specs, pView) {
	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);

};
LexiFiddleInstructionView.prototype.SetImages = function() {

	//Letter cells
	this.UnselectedCellImage = new GenieImage();
	this.UnselectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.UNSELECTED);
	this.SelectedCellImage = new GenieImage();
	this.SelectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SELECTED);
	this.SwitchedCellImage = new GenieImage();
	this.SwitchedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SWITCHED);
	this.CorrectCellsImage = new GenieImage();
	this.CorrectCellsImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.CORRECT);
	this.CellSwitchImage = new GenieImage();
	this.CellSwitchImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SWITCH);

	//Bumpers
	this.RedCellImage = new GenieImage();
	this.RedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.RED);
	this.AmberCellImage = new GenieImage();
	this.AmberCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.AMBER);
	this.GreenCellImage = new GenieImage();
	this.GreenCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.GREEN);

	//Icons
	this.CornerIconImage = new GenieImage();
	this.CornerIconImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.CORNER);
	this.VowelsIconImage = new GenieImage();
	this.VowelsIconImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.VOWELS);
};
LexiFiddleInstructionView.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);

	this.DrawImages();
	this.WriteText();
};
LexiFiddleInstructionView.prototype.DrawImages = function() {

	this.UnselectedCellImage.Draw();
	this.SelectedCellImage.Draw();
	this.SwitchedCellImage.Draw();
	this.CorrectCellsImage.Draw();
	this.CellSwitchImage.Draw();
	this.RedCellImage.Draw();
	this.AmberCellImage.Draw();
	this.GreenCellImage.Draw();
	this.CornerIconImage.Draw();
	this.VowelsIconImage.Draw();
};
LexiFiddleInstructionView.prototype.WriteText = function() {

	this.TextWriter.Write("Guess the 24 4-letter words by switching tiles.", 30, 40);

	this.TextWriter.Write("Click/tap a tile to", 220, 67);
	this.TextWriter.Write("select it (indicated", 220, 85);
	this.TextWriter.Write("by a light blue", 220, 103);
	this.TextWriter.Write("background).", 220, 121);

	this.TextWriter.Write("Click a second cell to make", 30, 185);
	this.TextWriter.Write("the switch.", 30, 203);

	this.TextWriter.Write("All correct entries are indicated", 135, 280);
	this.TextWriter.Write("by a green background.", 135, 298);

	this.TextWriter.Write("Tiles without letters are red if they", 30, 355);
	this.TextWriter.Write("are surrounded by all incorrect", 30, 373);
	this.TextWriter.Write("entries, yellow for some correct", 30, 391);
	this.TextWriter.Write("ones, green if they are all right.", 30, 409);

	this.TextWriter.Write("Pressing this icon", 30, 470);
	this.TextWriter.Write("uncovers the letters on", 30, 488);
	this.TextWriter.Write("each corner of a square.", 30, 506);

	this.TextWriter.Write("Pressing this icon", 190, 470);
	this.TextWriter.Write("displays all vowels", 190, 488);
	this.TextWriter.Write("in the word grid.", 190, 506);
};
