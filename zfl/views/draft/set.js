
GridironDraftView.prototype.SetData = function() {

	this.GridderTypes = [ "", "Divisional", "Injured", "Sparker", "Special", "Temperamental", "Versatile", "Volatile", "Dimensional", "Project" ];
};
GridironDraftView.prototype.SetControls = function() {

	this.SetTradeButtons();
	this.SetSelectionControls();
	this.SetPreviewControls();
};
GridironDraftView.prototype.SetTradeButtons = function() {

	this.TradeUpButton = new TextButton();
	this.TradeUpButton.Set(this.Canvas, this.Specs.BUTTON.TRADeUP, this.TextWriter);
	this.TradeUpButton.SetCornersPic(ShallowCornerImages);
	this.Controls.push(this.TradeUpButton);
	this.TradeDownButton = new TextButton();
	this.TradeDownButton.Set(this.Canvas, this.Specs.BUTTON.TRADeDOWN, this.TextWriter);
	this.TradeDownButton.SetCornersPic(ShallowCornerImages);
	this.Controls.push(this.TradeDownButton);
};
GridironDraftView.prototype.SetSelectionControls = function() {

	this.RoundTouchBar = new GenieTouchBar();
	this.RoundTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.ROUND, this.Specs.TOUChBAR.ROUND.IMAGE);
	this.Controls.push(this.RoundTouchBar);

	this.AutoSelectCheckBox = new GenieCheckBox();
	this.AutoSelectCheckBox.Set(this.Canvas, this.Specs.CHECkBOX.AUToSELECT, CheckBoxImage);
	this.AutoSelectCheckBox.SetLinks(null, this.TextWriter);
	this.Controls.push(this.AutoSelectCheckBox);
	this.AutoSelectButton = new TextButton();
	this.AutoSelectButton.Set(this.Canvas, this.Specs.BUTTON.AUToSELECT, this.TextWriter);
	this.AutoSelectButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.AutoSelectButton);
//	this.AutoSelectButton.Disable();  move to ::Open
	this.SelectButton = new TextButton();
	this.SelectButton.Set(this.Canvas, this.Specs.BUTTON.SELECT, this.TextWriter);
	this.SelectButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.SelectButton);

};
GridironDraftView.prototype.SetPreviewControls = function() {

	//Buttons
	this.NextButton = new ImageButton();
	this.NextButton.Set(this.Canvas, this.Specs.BUTTON.NEXT, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.NextButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.NextButton);
	this.PreviousButton = new ImageButton();
	this.PreviousButton.Set(this.Canvas, this.Specs.BUTTON.PREVIOUS, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.PreviousButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.PreviousButton);

	this.PositionTouchBar = new GenieTouchBar();
	this.PositionTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.POSITION, this.Specs.TOUChBAR.POSITION.IMAGE);
	this.Controls.push(this.PositionTouchBar);
};
GridironDraftView.prototype.SetImages = function() {

	this.SlotImage = new GenieImage();
	this.SlotImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SLOT);
	this.LegendImages = new GenieImage();
	this.LegendImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LEGEND);
	this.MarkerImage = new GenieImage();
	this.MarkerImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.MARKER);
	this.SpeedImageMap = new GenieImageMap();
	this.SpeedMap = [ { L: 1, T: 1, W: 23, H: 23 }, { L: 1, T: 24, W: 23, H: 23 } ];
	this.SpeedImageMap.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGeMAP.SPEED, this.SpeedMap);
};
GridironDraftView.prototype.SetSelections = function() {
	var i;

	this.Selections = new Array(DRAFT.ROUNDS*LEAGUE.TEAMS);
	for (i=0;i<this.Selections.length;++i)
		this.Selections[i] = { Position: -1, Initials: "", Grade: "", Potential: -1 };
};
GridironDraftView.prototype.SetDraft = function(drft) {

	this.Draft = drft;
	DraftConsoleView.SetDraft(this.Draft);
};
GridironDraftView.prototype.SetRoster = function(rstr) {

	this.Roster = rstr;
};
