
//-----------------------------------------------------------
//----------- LEXI FIDDLE GUIDE DIALOG ----------------------
var LexiFiddleGuideDialog = function() {
	var SelectedCellImage, SwitchedCellImage, CorrectCellImage;
	var RedBumperImage, AmberBumperImage, GreenBumperImage;
};
LexiFiddleGuideDialog.prototype = new GenieDialogView();
LexiFiddleGuideDialog.prototype.Set = function(cnvs, specs, pView) {
	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);

};
LexiFiddleGuideDialog.prototype.SetImages = function() {

	this.SelectedCellImage = new GenieImage();
	this.SelectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SELECTED);
	this.SwitchedCellImage = new GenieImage();
	this.SwitchedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.SWITCHED);
	this.CorrectCellImage = new GenieImage();
	this.CorrectCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.CORRECT);
	this.RedBumperImage = new GenieImage();
	this.RedBumperImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.RED);
	this.AmberBumperImage = new GenieImage();
	this.AmberBumperImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.AMBER);
	this.GreenBumperImage = new GenieImage();
	this.GreenBumperImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.GREEN);
};
LexiFiddleGuideDialog.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);

	this.DrawImages();
	this.WriteText();
};
LexiFiddleGuideDialog.prototype.DrawImages = function() {

	this.SelectedCellImage.Draw();
	this.SwitchedCellImage.Draw();
	this.CorrectCellImage.Draw();
	this.RedBumperImage.Draw();
	this.AmberBumperImage.Draw();
	this.GreenBumperImage.Draw();
};
LexiFiddleGuideDialog.prototype.WriteText = function() {

	this.TextWriter.Write("Click/tap a tile to select it, selection", 105, 121);
	this.TextWriter.Write("indicated by a blue background.", 105, 139);

	this.TextWriter.Write("Click another tile to exchange", 105, 175);
	this.TextWriter.Write("letters between them.", 105, 193);

	this.TextWriter.Write("A correctly placed tile is shown", 105, 234);
	this.TextWriter.Write("with a green background.", 105, 252);

	this.TextWriter.Write("Tiles without letters are red if all surrounding", 35, 395);
	this.TextWriter.Write("tiles are incorrect, yellow if some are correct,", 35, 413);
	this.TextWriter.Write("green if they are all correct.", 35, 431);
};
