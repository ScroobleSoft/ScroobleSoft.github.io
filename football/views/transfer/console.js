
//--------------------------------------------------------------
//---------- FOOTBALL TRANSFER CONSOLE VIEW --------------------
var FootballTransferConsoleView = function() {
};
FootballTransferConsoleView.prototype = new GenieSubView();
FootballTransferConsoleView.prototype.Set = function(cnvs, specs, tWriter) {
	GenieSubView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(null, tWriter);
};
FootballTransferConsoleView.prototype.SetControls = function() {
	//UNLOGGED
	this.BuyButton = new ImageButton();
	this.BuyButton.Set(this.Canvas, this.Specs.BUTTON.BUY, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.BuyButton.SetCornersPic(ShallowCornerImages);
	this.Controls.push(this.BuyButton);
	this.SellButton = new ImageButton();
	this.SellButton.Set(this.Canvas, this.Specs.BUTTON.SELL, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.SellButton.SetCornersPic(ShallowCornerImages);
	this.Controls.push(this.SellButton);
};
