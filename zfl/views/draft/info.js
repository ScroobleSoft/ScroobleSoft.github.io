
//--------------------------------------------------------
//---------- GRIDIRON DRAFT INFO VIEW --------------------
var GridironDraftInfoView = function() {
	var TradeUpButton, TradeDownButton, AutoSelectButton, SelectButton;
	var AccelerateButton, DecelerateButton;
	var AutoSelectCheckBox;
	var Prospect;

	var i;
};
GridironDraftInfoView.prototype = new GenieSubView();
GridironDraftInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironDraftInfoView.prototype.SetControls = function() {

	if (Game.CheckPhone()) {
		this.AutoSelectButton = this.SetTextButton(this.Specs.BUTTON.AUToSELECT, RaisedCornerImages, Text);
		this.SelectButton = this.SetTextButton(this.Specs.BUTTON.SELECT, RaisedCornerImages, Text);
		this.TradeUpButton = this.SetTextButton(this.Specs.BUTTON.TRADeUP, ShallowCornerImages, Text);
		this.TradeDownButton = this.SetTextButton(this.Specs.BUTTON.TRADeDOWN, ShallowCornerImages, Text);
		this.AccelerateButton = this.SetImageButton(this.Specs.BUTTON.ACCELERATE, ImageManager.Pics[IMAGeINDEX.CONTROLS], ShallowCornerImages);
		this.DecelerateButton = this.SetImageButton(this.Specs.BUTTON.DECELERATE, ImageManager.Pics[IMAGeINDEX.CONTROLS], ShallowCornerImages);
		this.AutoSelectCheckBox = this.SetCheckBox(this.Specs.CHECkBOX.AUToSELECT, CheckBoxImage, Text);
	}
};
GridironDraftInfoView.prototype.ShowControls = function() {

	if (!Game.CheckPhone())
		return;

	GenieSubView.prototype.ShowControls.call(this);
};
GridironDraftInfoView.prototype.Update = function() {  //NOTE: only relevant for phone

	if (this.SelectButton.CheckClicked()) {
		this.MainView.SelectProspect();
		if (this.MainView.Draft.Round==(4*LEAGUE.TEAMS))
			this.TradeDownButton.Disable();
		if (this.MainView.Draft.Round==(DRAFT.ROUNDS+1))
			this.MainView.EndDraft();
	}

	this.UpdateAutoSelection();
	this.UpdateTradeButtons();
	this.UpdateSpeedButtons();
};
GridironDraftInfoView.prototype.UpdateAutoSelection = function() {

	if (this.AutoSelectButton.CheckClicked()) {
		if (this.MainView.AutoModeFlag) {
			this.AutoSelectButton.ReLabel("Start");
			this.AutoSelectCheckBox.Activate();
		} else {
			this.AutoSelectButton.ReLabel("Stop");
			this.AutoSelectCheckBox.DeActivate();
		}
		this.MainView.AutoModeFlag = !this.MainView.AutoModeFlag;
	}

	if (this.AutoSelectCheckBox.CheckClicked()) {
		if (this.AutoSelectCheckBox.Checked) {
			this.AutoSelectButton.ReLabel("Start");
			this.AutoSelectButton.Enable();
			this.SelectButton.Disable();
			this.MainView.Frames = 0;
		} else {
			this.AutoSelectButton.Disable();
			this.SelectButton.Enable();
		}
	}

	if (this.MainView.AutoModeFlag) {
		if (this.MainView.Draft.SelectionOrder[this.MainView.Draft.CurrentPick]==PlayerTeam.Index) {
			this.MainView.AutoModeFlag = false;
			this.AutoSelectCheckBox.UnCheck();
			this.AutoSelectButton.Disable();
			this.AutoSelectCheckBox.Activate();
			this.SelectButton.Enable();
		} else {
			if (!this.MainView.Frames) {
				this.MainView.Frames = this.MainView.SelectionFrames;
				this.MainView.SelectProspect();
			}
			--this.MainView.Frames;
		}
	}
};
GridironDraftInfoView.prototype.UpdateTradeButtons = function() {

	if (this.TradeUpButton.CheckClicked())
		TradeUpOptionView.Open();

	if (this.TradeDownButton.CheckClicked())
		TradeDownOptionView.Open();
};
GridironDraftInfoView.prototype.UpdateSpeedButtons = function() {

	if (this.AccelerateButton.CheckClicked()) {
		this.MainView.SelectionFrames -= 5;
		if (this.MainView.SelectionFrames==5)
			this.AccelerateButton.Disable();
		if (this.MainView.SelectionFrames==55)
			this.DecelerateButton.Enable();
	}

	if (this.DecelerateButton.CheckClicked()) {
		this.MainView.SelectionFrames += 5;
		if (this.MainView.SelectionFrames==60)
			this.DecelerateButton.Disable();
		if (this.MainView.SelectionFrames==10)
			this.AccelerateButton.Enable();
	}
};
GridironDraftInfoView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

};
GridironDraftInfoView.prototype.Draw = function() {

	if (Game.CheckPhone())
		this.DrawPhone();
	else if (this.MainView.State>=this.MainView.Specs.STATE.SELECTION) {
		this.DisplayTitle();
		this.DisplayPicks();
		return;
	}

	GenieSubView.prototype.Draw.call(this);  //REDUNDANT?
};
GridironDraftInfoView.prototype.DrawPhone = function() {

	this.Context.fillStyle = GREY.SILVER;
	this.Context.fillRect(0, 182, INFoBOX.WIDTH, 58);

	Text.SetContext(this.Context);
	Text.Write("Trade:", 2, 232);
	Text.ResetContext();

	this.DisplaySelections();
};
GridironDraftInfoView.prototype.DisplayTitle = function() {

	this.ColourScape();
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write("Selections:", 5, 20, { FONT: "14px Arial", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.RestoreContext();
};
GridironDraftInfoView.prototype.DisplayPicks = function() {
	var i;
	var y;
	var info;
	var val;

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("12px Arial");

	for (i=0;i<this.MainView.PlayerPicks;++i) {
		y = 40 + (16*i);
		this.Prospect = this.MainView.Draft.Picks[i];
		info = (Math.floor(this.MainView.Draft.PickNumbers[i]/LEAGUE.TEAMS)+1) + "." + ((this.MainView.Draft.PickNumbers[i] % LEAGUE.TEAMS)+1);
		this.TextWriter.Write(info, 10, y);																								//pick number
		this.TextWriter.Write(Positions[this.Prospect.Position], 42, y);														//position
		info = { FONT: "10px Arial" };
		this.TextWriter.Write(SubPositions[this.Prospect.Position][this.Prospect.SubPosition], 67, y, info);		//sub-position
		info = this.Prospect.Name.GetFullName();
		if (StringUtils.GetTextWidth(info, null, this.Context)<100)																//name
			this.TextWriter.Write(info, 95, y);
		else {
			info = this.Prospect.Name.First[0] + " ";
			info += this.Prospect.Name.Last;
			this.TextWriter.Write(info, 95, y);
		}
		this.info = Utils.NumberToGrade(this.Prospect.Quality);
		this.TextWriter.Write(this.info, 200, y);																						//quality
		this.TextWriter.Write("+"+this.Prospect.Potential, 220, y);																//potential
		this.TextWriter.Write(GridderTypes[this.Prospect.Type], 245, y);														//types
		info = { FONT: "10px Arial" };
		this.TextWriter.Write(Utils.NumberToGrade(this.Prospect.Value), 285, y, info);									//value
	}

	this.TextWriter.RestoreFont();
	this.TextWriter.RestoreContext();
};
GridironDraftInfoView.prototype.ClearSelections = function() {

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, 182);
};
GridironDraftInfoView.prototype.DisplaySelections = function() {  //PHONE only
	var i, y;
	var pick;
	var num;
	var iTeam;

	if (this.MainView.Draft.CurrentPick<6)
		pick = this.MainView.Draft.CurrentPick;
	else if (this.MainView.Draft.CurrentPick>((LEAGUE.TEAMS*DRAFT.ROUNDS)-6))
		pick = 12 - ((LEAGUE.TEAMS*DRAFT.ROUNDS)-this.MainView.Draft.CurrentPick);
	else
		pick = 6;

	Text.SetContext(this.Context);
	Text.SetFont("12px Arial");

	for (i=0;i<12;++i) {		//HARD-CODED
		y = (15*i) + 14;
		num = this.MainView.Draft.CurrentPick + i - pick;
		iTeam = this.MainView.Draft.SelectionOrder[num];

		if (iTeam==PlayerTeam.Index)
			Text.SetColour("yellow");
		else
			Text.SetColour("white");

		Text.Write((Math.floor(num/LEAGUE.TEAMS)+1)+"."+((num % LEAGUE.TEAMS)+1), 5, y);
		if (i<pick) {
			Text.Write(TeamAbbreviations[this.MainView.Draft.SelectionOrder[num] % LEAGUE.TEAMS], 35, y);
			Text.Write("select", 65, y);
			Text.Write(this.MainView.Selections[num].Position, 105, y);				//position
			Text.Write(this.MainView.Selections[num].Initials, 130, y);				//prospect initials
			Text.Write(this.MainView.Selections[num].Grade, 155, y);					//grade
			Text.Write("+"+this.MainView.Selections[num].Potential, 175, y);		//potential
		} else {
			Text.Write(TeamNames[iTeam][0], 35, y);
			Text.Write(Positions[Teams[iTeam].StarterNeeds[0].Position], 170, y);
		}

		Text.ResetColour();
	}

	Text.ResetFont();
	Text.ResetContext();
};
