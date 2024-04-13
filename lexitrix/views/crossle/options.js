
//----------------------------------------------------
//----------- LEXI CROSSLE OPTIONS VIEW ----------------------
var LexiCrossleOptionsView = function() {
	var DailyButton, NumberedButton, SymmetricalButton, AsymmetricButton;
	var DifficultyButtons;
	var DigitKeys, BackspaceButton, ClearButton, OkButton;		//UNLOGGED

	var i;
};
LexiCrossleOptionsView.prototype = new GenieView();
LexiCrossleOptionsView.prototype.Set = function(cnvs, specs, tWriter) {

	this.SetLinks(null, this.TextWriter);

	GenieView.prototype.Set.call(this, cnvs, specs);
};
LexiCrossleOptionsView.prototype.SetControls = function() {

	this.SetOptionButtons();
	this.SetDiffcultyButtons();
	this.SetNumberedButtons();
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
LexiCrossleOptionsView.prototype.SetNumberedButtons = function() {

//	this.DigitKeys
	this.BackspaceButton = new ImageButton();
	this.BackspaceButton.Set(this.Canvas, this.Specs.BUTTON.BACKSPACE, this.TextWriter);
	this.BackspaceButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.BackspaceButton);
	this.ClearButton = new ImageButton();
	this.ClearButton.Set(this.Canvas, this.Specs.BUTTON.CLEAR, this.TextWriter);
	this.ClearButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.ClearButton);
	this.OkButton = new ImageButton();
	this.OkButton.Set(this.Canvas, this.Specs.BUTTON.OK, this.TextWriter);
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
	this.NumberedButton.Disable();		//TEMP
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
		this.PickGameNumber();
		this.Close(this.OpenCrossleView.bind(this), 100);
	}
	if (this.SymmetricalButton.CheckClicked()) {
		CrossleView.SetSymmetrical();
		cancelAnimationFrame(this.AnimationFrameHandle);
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
	//UNLOGGED
	this.CloseOptionButtons();
	this.ColourScape(null, this.Specs.COLOUR);
	//-button panel
	this.BackspaceButton.Show();
	this.ClearButton.Show();
	this.OkButton.Show();
	this.UpdateNumbered();
};
LexiCrossleOptionsView.prototype.UpdateNumbered = function() {
	//UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.UpdateNumbered.bind(this));

	//-button panel
	if (this.BackspaceButton.CheckClicked()) {
	}
	if (this.ClearButton.CheckClicked()) {
	}
	if (this.OkButton.CheckClicked()) {
		//-call CrossleView.SetNumber(num)
	}
};
LexiCrossleOptionsView.prototype.PickDifficulty = function() {

	this.CloseOptionButtons();
	this.ColourScape(null, this.Specs.COLOUR);
//	this.DifficultyButtons.forEach(function(btn){btn.Show();});
	var i;
	for (i=0;i<this.DifficultyButtons.length;++i)
		this.DifficultyButtons[i].Show();
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
	CrossleView.Update();
};
