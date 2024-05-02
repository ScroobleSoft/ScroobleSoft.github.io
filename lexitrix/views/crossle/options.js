
//----------------------------------------------------
//----------- LEXI CROSSLE OPTIONS VIEW ----------------------
var LexiCrossleOptionsView = function() {
	var DailyButton, NumberedButton, SymmetricalButton, AsymmetricButton;
	var DifficultyButtons;
	var CellImage, SelectionImage, OkButton;
	var CellIndex, Col, Row;

	var i;
};
LexiCrossleOptionsView.prototype = new GenieView();
LexiCrossleOptionsView.prototype.Set = function(cnvs, specs, tWriter) {

	this.SetLinks(null, tWriter);

	GenieView.prototype.Set.call(this, cnvs, specs);
};
LexiCrossleOptionsView.prototype.SetControls = function() {

	this.SetOptionButtons();
	this.SetDiffcultyButtons();
	this.SetStashComponents();
};
LexiCrossleOptionsView.prototype.SetOptionButtons = function() {

	this.DailyButton = new ImageButton();
	this.DailyButton.Set(this.Canvas, this.Specs.BUTTON.DAILY, ImageManager.Pics[IMAGeINDEX.CONTROLS] );
	this.DailyButton.SetCornersPic(CrossleButtonCornerImages);
	this.DailyButton.SetEdgeColours(null, GREY.MEDIUM);
	this.Controls.push(this.DailyButton);
	this.NumberedButton = new ImageButton();
	this.NumberedButton.Set(this.Canvas, this.Specs.BUTTON.NUMBERED, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.NumberedButton.SetCornersPic(CrossleButtonCornerImages);
	this.NumberedButton.SetEdgeColours(null, GREY.MEDIUM);
	this.Controls.push(this.NumberedButton);
	this.SymmetricalButton = new ImageButton();
	this.SymmetricalButton.Set(this.Canvas, this.Specs.BUTTON.SYMMETRICAL, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.SymmetricalButton.SetCornersPic(CrossleButtonCornerImages);
	this.SymmetricalButton.SetEdgeColours(null, GREY.MEDIUM);
	this.Controls.push(this.SymmetricalButton);
	this.AsymmetricButton = new ImageButton();
	this.AsymmetricButton.Set(this.Canvas, this.Specs.BUTTON.ASYMMETRIC, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.AsymmetricButton.SetCornersPic(CrossleButtonCornerImages);
	this.AsymmetricButton.SetEdgeColours(null, GREY.MEDIUM);
	this.Controls.push(this.AsymmetricButton);
};
LexiCrossleOptionsView.prototype.SetDiffcultyButtons = function() {
	var i;
	var sy;
	var specs;

	this.DifficultyButtons = new Array(this.Specs.BUTTON.DIFFICULTY.COUNT);
	for (i=0;i<this.Specs.BUTTON.DIFFICULTY.COUNT;++i) {
		sy = this.Specs.BUTTON.DIFFICULTY.SY + (i*(this.Specs.BUTTON.DIFFICULTY.H+this.Specs.BUTTON.DIFFICULTY.O-(2*this.Specs.BUTTON.DIFFICULTY.LW)))
		specs = { L: this.Specs.BUTTON.DIFFICULTY.L, T: this.Specs.BUTTON.DIFFICULTY.T+(this.Specs.BUTTON.DIFFICULTY.GAP*i),
					 W: this.Specs.BUTTON.DIFFICULTY.W, H: this.Specs.BUTTON.DIFFICULTY.H, LW: this.Specs.BUTTON.DIFFICULTY.LW,
					 SX: this.Specs.BUTTON.DIFFICULTY.SX, SY: sy, STYLE: this.Specs.BUTTON.DIFFICULTY.STYLE };
		this.DifficultyButtons[i] = new ImageButton();
		this.DifficultyButtons[i].Set(this.Canvas, specs, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.DifficultyButtons[i].SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.DifficultyButtons[i]);
	}
};
LexiCrossleOptionsView.prototype.SetStashComponents = function() {

	this.CellImage = new GenieImage();
	this.CellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL);
	this.SelectionImage = new GenieImage();
	this.SelectionImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
	this.OkButton = new ImageButton();
	this.OkButton.Set(this.Canvas, this.Specs.BUTTON.OK, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.OkButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.OkButton);
};
LexiCrossleOptionsView.prototype.Open = function() {

	Game.View = this;
	this.Canvas.View = this;
	this.ColourScape(null, this.Specs.COLOUR);
	this.Draw();

	this.DailyButton.Show();
	this.NumberedButton.Show();
	this.SymmetricalButton.Show();
	this.AsymmetricButton.Show();

	Game.Interface.ResumeInput();
};
LexiCrossleOptionsView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.DailyButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		CrossleView.SetDaily();
		this.Close(this.OpenCrossleView.bind(this), 100);
	}
	if (this.NumberedButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		setTimeout(this.PickGameNumber.bind(this), 100);
	}
	if (this.SymmetricalButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		CrossleView.SetSymmetrical();
		this.Close(this.OpenCrossleView.bind(this), 100);
	}
	if (this.AsymmetricButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		CrossleView.SetAsymmetric();
		setTimeout(this.PickDifficulty.bind(this), 100);
	}
};
LexiCrossleOptionsView.prototype.CloseOptionButtons = function() {

	this.DailyButton.Hide();
	this.NumberedButton.Hide();
	this.SymmetricalButton.Hide();
	this.AsymmetricButton.Hide();
};
LexiCrossleOptionsView.prototype.PickGameNumber = function() {

	this.CloseOptionButtons();
	this.ColourScape(null, this.Specs.COLOUR);
	this.TextWriter.Write("Pick a number:", 5, 40, { FONT: "24px Arial" } );
	this.Col = 0;
	this.Row = 0;
	this.CellIndex = 0;
	this.DrawNumbers();
	this.OkButton.Show();
	this.UpdateNumbered();
};
LexiCrossleOptionsView.prototype.DrawNumbers = function() {
	var x, y;
	var iCell;
	var c, r;

	iCell = 0;
	for (r=0;r<this.Specs.NUMBERS.R;++r)
		for (c=0;c<this.Specs.NUMBERS.C;++c) {
			x = this.Specs.NUMBERS.X + (c*(this.Specs.NUMBERS.W-1));
			y = this.Specs.NUMBERS.Y + (r*(this.Specs.NUMBERS.H-1));
			this.CellImage.Draw(x, y);
			if (this.CellIndex==iCell)
				this.SelectionImage.DrawPatchNumber(0, x+1, y+1);			//TODO: correct patch number has to be determined (maybe should be seperate func)
			this.DrawDigits(iCell+1, x+this.Specs.NUMBERS.OX, y+this.Specs.NUMBERS.OY);
			++iCell;
			if (iCell==Solutions.length)
				return;
		}
};
LexiCrossleOptionsView.prototype.DrawDigits = function(num, x, y) {
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
LexiCrossleOptionsView.prototype.UpdateNumbered = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.UpdateNumbered.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		this.Col = Math.floor((Mouse.Click.X-(this.Specs.NUMBERS.X+1))/(this.Specs.NUMBERS.W-1));
		this.Row = Math.floor((Mouse.Click.Y-(this.Specs.NUMBERS.Y+1))/(this.Specs.NUMBERS.H-1));
		this.CellIndex = (this.Specs.NUMBERS.C*this.Row) + this.Col;
		this.DrawNumbers();
	}

	if (this.OkButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		CrossleView.SetNumber(this.CellIndex);
		this.Close(this.OpenCrossleView.bind(this), 100);
	}
};
LexiCrossleOptionsView.prototype.PickDifficulty = function() {

	this.CloseOptionButtons();
	this.ColourScape(null, this.Specs.COLOUR);
	this.DifficultyButtons.forEach(function(btn){btn.Show();});
	this.UpdateDifficulty();
};
LexiCrossleOptionsView.prototype.UpdateDifficulty = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.UpdateDifficulty.bind(this));

	for (this.i=0;this.i<this.DifficultyButtons.length;++this.i) {
		if (this.DifficultyButtons[this.i].CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			CrossleView.SetDifficulty(this.i);
			this.Close(this.OpenCrossleView.bind(this), 100);
			break;
		}
	}
};
LexiCrossleOptionsView.prototype.OpenCrossleView = function() {

	CrossleView.SelectWords();
	CrossleView.Open();
};
