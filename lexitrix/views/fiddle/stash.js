
//---------------------------------------------------------
//----------- LEXI FIDDLE STASH VIEW ----------------------
var LexiFiddleStashView = function() {
	var StashIcons, OkButton;
	var CellImage, SelectionImage;
	var CellIndex, Col, Row;

	var i;
};
LexiFiddleStashView.prototype = new GenieView();
LexiFiddleStashView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Col = 0;
	this.Row = 0;
	this.CellIndex = 0;
};
LexiFiddleStashView.prototype.SetControls = function() {

	this.StashIcons = this.SetCornersIconPanel(this.Specs.ICONS.STASH, this.Specs.ICONS.STASH.IMAGE, IconCornerImages, this.GraphicsTool);
	this.OkButton = this.SetTextButton(this.Specs.BUTTON.OK, RaisedCornerImages, this.TextWriter);
};
LexiFiddleStashView.prototype.SetImages = function() {

	this.CellImage = new GenieImage();
	this.CellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL);
	this.SelectionImage = new GenieImage();
	this.SelectionImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
};
LexiFiddleStashView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

	this.Update();
};
LexiFiddleStashView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		this.Col = Math.floor((Mouse.Click.X-(this.Specs.NUMBERS.X+1))/(this.Specs.NUMBERS.W-1));
		this.Row = Math.floor((Mouse.Click.Y-(this.Specs.NUMBERS.Y+1))/(this.Specs.NUMBERS.H-1));
		if (this.Col<this.Specs.NUMBERS.C && this.Col>=0 && this.Row<this.Specs.NUMBERS.R && this.Row>=0) {		//check within numbers frame
			this.indx = (this.Specs.NUMBERS.C*this.Row) + this.Col;
			if ((this.indx+(100*this.StashIcons.DepressedIcon))<FiddleView.Selector.Solutions.length) {		//check if valid cell is clicked
				this.CellIndex = this.indx;
				this.DrawNumbers();
			}
		}
	}

	if (this.StashIcons.CheckIconChanged())
		this.DrawNumbers();

	if (this.OkButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		FiddleView.Selector.SelectStash((100*this.StashIcons.DepressedIcon)+this.CellIndex);
		FiddleView.Board.SetSolution(FiddleView.Selector);
		FiddleView.Board.SetLetters();
		this.Close(this.OpenFiddleView.bind(this), 100);
	}
};
LexiFiddleStashView.prototype.Draw = function() {

	this.TextWriter.Write("Pick a number:", 5, 30, { FONT: "24px Arial" } );
	this.DrawNumbers();
};
LexiFiddleStashView.prototype.DrawNumbers = function() {
	var x, y;
	var iCell;
	var c, r;

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(this.Specs.NUMBERS.X, this.Specs.NUMBERS.Y, this.Specs.NUMBERS.W*this.Specs.NUMBERS.C, this.Specs.NUMBERS.H*this.Specs.NUMBERS.R);

	iCell = 0;
	for (r=0;r<this.Specs.NUMBERS.R;++r)
		for (c=0;c<this.Specs.NUMBERS.C;++c) {
			if ((iCell+(100*this.StashIcons.DepressedIcon))>=FiddleView.Selector.Solutions.length)
				return;
			x = this.Specs.NUMBERS.X + (c*(this.Specs.NUMBERS.W-1));
			y = this.Specs.NUMBERS.Y + (r*(this.Specs.NUMBERS.H-1));
			this.CellImage.Draw(x, y);
			if (this.CellIndex==iCell)
				this.SelectionImage.DrawPatchNumber(0, x+1, y+1);			//TODO: correct patch number has to be determined (maybe should be seperate func)
			++iCell;
			this.DrawDigits(iCell+(100*this.StashIcons.DepressedIcon), x+this.Specs.NUMBERS.OX, y+this.Specs.NUMBERS.OY);
		}
};
LexiFiddleStashView.prototype.DrawDigits = function(num, x, y) {
	var i;
	var nDgts;
	var dgt;

	if (num==0)
		nDgts = 1;
	else
		nDgts = Math.floor(Math.log10(num)) + 1;
	x += this.Specs.NUMBERS.O[nDgts-1];
	for (i=0;i<nDgts;++i) {
		dgt = num % 10;
		MediumDigitImages.DrawPatchNumber(dgt, x, y);
		num = Math.floor(num/10);
		x -= 7;
	}
};
LexiFiddleStashView.prototype.OpenFiddleView = function() {

	FiddleView.Open();
};
