
//---------------------------------------------------------------
//---------- GRIDIRON PROSPECTS CONSOLE VIEW -------------------- 
var GridironProspectsConsoleView = function() {
	var PreviousButton, NextButton;
	var AllButton, PositionButtons;
	var MarkedButton, StartButton;
	var LegendImage;

	var i;
};
GridironProspectsConsoleView.prototype = new GenieSubView();
GridironProspectsConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironProspectsConsoleView.prototype.SetImages = function() {

	this.LegendImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LEGEND);
};
GridironProspectsConsoleView.prototype.SetControls = function() {  //NOTE: code duplication going on here (from GridironProspectsConsoleView) - UNLOGGED
	var i;
	var l, t;
	var sx, sy;
	var specs;

	this.PreviousButton = this.SetImageButton(this.Specs.BUTTON.PREVIOUS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.NextButton = this.SetImageButton(this.Specs.BUTTON.NEXT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);

	this.AllButton = this.SetImageButton(this.Specs.BUTTON.ALL, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);

	//Position buttons
	this.PositionButtons = ArrayUtils.Create(POSITION.COUNT, ImageButton);
	for (i=0;i<POSITION.COUNT;++i) {
		l = this.Specs.BUTTON.POSITIONS.L + (this.Specs.BUTTON.POSITIONS.W*(i % this.Specs.BUTTON.POSITIONS.C));
		t = this.Specs.BUTTON.POSITIONS.T + (this.Specs.BUTTON.POSITIONS.H*Math.floor(i/this.Specs.BUTTON.POSITIONS.C));
		sx = this.Specs.BUTTON.POSITIONS.SX + ((i % 5)*(this.Specs.BUTTON.POSITIONS.W+this.Specs.BUTTON.POSITIONS.O-(2*this.Specs.BUTTON.POSITIONS.LW)));
		sy = this.Specs.BUTTON.POSITIONS.SY+(Math.floor(i/5)*(this.Specs.BUTTON.POSITIONS.H+this.Specs.BUTTON.POSITIONS.O-(2*this.Specs.BUTTON.POSITIONS.LW)));
		specs = { L: l, T: t, W: this.Specs.BUTTON.POSITIONS.W, H: this.Specs.BUTTON.POSITIONS.H, LW: this.Specs.BUTTON.POSITIONS.LW, SX: sx, SY: sy,
					 STYLE: this.Specs.BUTTON.POSITIONS.STYLE };
		this.PositionButtons[i] = this.SetImageButton(specs, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	}

	this.MarkedButton = this.SetImageButton(this.Specs.BUTTON.MARKED, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.StartButton = this.SetImageButton(this.Specs.BUTTON.START, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
GridironProspectsConsoleView.prototype.Open = function() {

	GenieSubView.prototype.Open.call(this);

	//Show position selection square
	if (this.MainView.Position==-1)
		this.DisplayAllSelector();
	else
		this.DisplayPositionSelector();

	//Hide a navigation button if necessary
	if (this.MainView.Page==0)
		this.PreviousButton.Hide();
	if (this.MainView.Page==(this.PositionButtons.length-1))
		this.PositionButtons[this.MainView.Page].Hide();
};
GridironProspectsConsoleView.prototype.Update = function() {

	this.UpdateNavigationButtons();
	this.UpdatePositionButtons();

	if (this.MarkedButton.CheckClicked())
		MarkedDialogView.Open();

	if (this.StartButton.CheckClicked())
		this.MainView.OpenDraftView();
};
GridironProspectsConsoleView.prototype.UpdateNavigationButtons = function() {

	if (this.PreviousButton.CheckClicked()) {
		--this.MainView.Page;
		if (this.MainView.Page==0)
			this.PreviousButton.Hide();
		else if (this.MainView.Page==(this.MainView.Pages-2))
			this.NextButton.Show();
		this.MainView.ColourScape();
		this.MainView.Slot = 0;
		this.MainView.Draw();
		this.MainView.InfoView.ResetGridder(this.MainView.Prospects[this.MainView.ProspectIndex]);
		this.DisplayPageNumber();
	}

	if (this.NextButton.CheckClicked()) {
		++this.MainView.Page;
		if (this.MainView.Page==(this.MainView.Pages-1))
			this.NextButton.Hide();
		else if (this.MainView.Page==1)
			this.PreviousButton.Show();
		this.MainView.ColourScape();
		this.MainView.Slot = 0;
		this.MainView.Draw();
		this.MainView.InfoView.ResetGridder(this.MainView.Prospects[this.MainView.ProspectIndex]);
		this.DisplayPageNumber();
	}
};
GridironProspectsConsoleView.prototype.UpdatePositionButtons = function() {

	if (this.AllButton.CheckClicked()) {
		if (this.MainView.Position!=-1) {
			this.PositionButtons[this.MainView.Position].Show();
			this.MainView.Position = -1;
			this.MainView.Page = 0;
			this.MainView.Slot = 0;
			setTimeout(this.DisplayAllSelector.bind(this), 100);
			this.MainView.Prospects = Draft.ValueList;
			this.MainView.ColourScape();
			this.MainView.Draw();
			this.MainView.InfoView.ResetGridder(this.MainView.Prospects[this.MainView.Slot]);
			this.DisplayPageNumber();
			this.NextButton.Show();
		}
		return;
	}

	//Position buttons
	for (this.i=0;this.i<POSITION.COUNT;++this.i)
		if (this.PositionButtons[this.i].CheckClicked())
			break;
	if (this.i!=POSITION.COUNT) {
		this.MainView.Page = 0;
		this.MainView.Slot = 0;
		if (this.i!=this.MainView.Position) {
			if (this.MainView.Position==-1)
				this.AllButton.Show();
			else
				this.PositionButtons[this.MainView.Position].Show();
		}
		this.MainView.Position = this.i;
		setTimeout(this.DisplayPositionSelector.bind(this), 100);
		this.MainView.Prospects = Draft.GetPhoneProspects(this.MainView.Position, -1);		//TODO: allow for different types
		this.MainView.ColourScape();
		this.MainView.Draw();
		this.DisplayPageNumber();
		this.PreviousButton.Hide();
		if (this.MainView.Pages==1)
			this.NextButton.Hide();
		else
			this.NextButton.Show();
		return;
	}
};
GridironProspectsConsoleView.prototype.Draw = function() {
	var i;
	var info;

	Text.SetContext(this.Context);

	info = "Page: " + (this.MainView.Page+1)+ "/" + this.MainView.Pages;
	Text.Write(info, 5, 31, { FONT: "24px Arial", COLOUR: BLUE.INDIGO } );

	Text.SetFont("12px Arial");
	Text.SetColour(BLUE.INDIGO);

	Text.Write("Needs:", 10, 117);
	for (i=0;i<15;++i)  //HARD-CODING!!!
		Text.Write(Positions[PlayerTeam.PriorityNeeds[i].Position], 55+(25*(i % 5)), 117+(17*Math.floor(i/5)));

	Text.ResetColour();
	Text.ResetFont();

	Text.ResetContext();

	this.LegendImage.Draw();
};
GridironProspectsConsoleView.prototype.DisplayAllSelector = function() {

	DraftConsoleView.AllSelectionImage.Draw(this.Specs.IMAGE.ALL.X, this.Specs.IMAGE.ALL.Y);
};
GridironProspectsConsoleView.prototype.DisplayPositionSelector = function() {
	var x, y;

	x = this.Specs.BUTTON.POSITIONS.L + ((this.MainView.Position % 5)*this.Specs.BUTTON.POSITIONS.W) + this.Specs.BUTTON.POSITIONS.LW;
	y = this.Specs.BUTTON.POSITIONS.T + (Math.floor(this.MainView.Position/5)*this.Specs.BUTTON.POSITIONS.H) + this.Specs.BUTTON.POSITIONS.LW;
	DraftConsoleView.PositionSelectionImage.Draw(x, y);
};
GridironProspectsConsoleView.prototype.DisplayPageNumber = function() {

	Graphics.SetContext(this.Context);
	Graphics.DrawRectangle(5, 12, 105, 25, this.Specs.COLOUR, 0);
	Graphics.ResetContext();

	Text.SetContext(this.Context);
	info = "Page: " + (this.MainView.Page+1)+ "/" + this.MainView.Pages;
	Text.Write(info, 5, 31, { FONT: "24px Arial", COLOUR: BLUE.INDIGO } );
	Text.ResetContext();
};
