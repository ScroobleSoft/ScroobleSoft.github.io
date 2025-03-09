
//-----------------------------------------------------------
//----------- LEXI TURTLE GUIDE DIALOG ---------------------- 
var LexiTurtleGuideDialog = function() {
	var EmptyCellImage, SelectedCellImage, KeyImage, FilledCellImage, IncorrectImage;
};
LexiTurtleGuideDialog.prototype = new GenieDialogView();
LexiTurtleGuideDialog.prototype.Set = function(cnvs, specs, pView) {
	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);

};
LexiTurtleGuideDialog.prototype.SetImages = function() {

	this.EmptyCellImage = new GenieImage();
	this.EmptyCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.EMPTY);
	this.SelectedCellImage = new GenieImage();
	this.SelectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SELECTED);
	this.KeyImage = new GenieImage();
	this.KeyImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.KEY);
	this.FilledCellImage = new GenieImage();
	this.FilledCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.FILLED);
	this.IncorrectImage = new GenieImage();
	this.IncorrectImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.INCORRECT);
};
LexiTurtleGuideDialog.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);

	this.DrawImages();
	this.WriteText();
};
LexiTurtleGuideDialog.prototype.DrawImages = function() {

	this.EmptyCellImage.Draw();
	this.SelectedCellImage.Draw();
	this.KeyImage.Draw();
	this.FilledCellImage.Draw();
	this.IncorrectImage.Draw();
};
LexiTurtleGuideDialog.prototype.WriteText = function() {

	this.TextWriter.Write("Click/tap a cell to select it.", 135, 135);

	this.TextWriter.Write("Click a key to place a", 135, 185);
	this.TextWriter.Write("letter in the cell.", 135, 205);

	this.TextWriter.Write("An incorrect entry is", 135, 255);
	this.TextWriter.Write("indicated by a red", 135, 275);
	this.TextWriter.Write("background.", 135, 295);
};
