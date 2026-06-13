
//---------------------------------------------------
//---------- GRIDIRON DRAFT VIEW --------------------
var GridironDraftView = function() {
	var OffDefIconPanel;
	var GridImage, ProjectImage, ProjectLegendImage;
	var Draft;
	var Roster;
	var GridderTypes;
	var NextButton, PreviousButton, PositionTouchBar;
	var TradeUpButton, TradeDownButton, RoundTouchBar, AutoSelectCheckBox, AutoSelectButton, SelectButton;
	var SlotImage, LegendImages, MarkerImage, SpeedImageMap, SpeedMap;		//.MarkerImage REDUNDANT?

	var PreviewPage, PreviewSlot, PreviewProspectIndex, MarkedProspects;
	var DisplayRound, DisplayProspect, DisplayList;									//.DisplayList REDUNDANT
	var Selections;																			//array of strings containing basic team and player info
	var AutoModeFlag;
	var PlayerPicks;																			//quantity
	var DraftPickSection;

	//Frequently used variables
	var Font, Prospect;
	var Team, Position, Pick;																//indices
	var SelectionFrames;

	//Slots
	var SelectedSlot, OldSelectedSlot;
	var HighlightedSlot, OldHighlightedSlot;

	var TeamNeeds;					//for waiver exchanges . . . TODO: whole mechanism belongs elsewhere

	var i, c, r, x, y, num, info, slot;  //scratch variables
};
GridironDraftView.prototype = new GenieView();
GridironDraftView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Frames = 0;
	this.PreviewPage = 0;
	this.PreviewProspectIndex = 0;
	this.PreviewSlot = 0;
	this.MarkedProspects = new GenieArray();
	this.MarkedProspects.Set();
	this.DisplayRound = 1;
	this.AutoModeFlag = false;
	this.PlayerPicks = 0;
	this.State = this.Specs.STATE.INTRO;
	this.SelectionFrames = 30;
	this.SetSelections();
};
GridironDraftView.prototype.ShowControls = function() {

	if (this.State==this.Specs.STATE.SELECTION) {
		this.TradeUpButton.Show();
		this.TradeDownButton.Show();
		this.RoundTouchBar.Show();
		this.AutoSelectCheckBox.Show();
		this.AutoSelectButton.DrawDisabled();
		this.SelectButton.Show();
		this.SpeedImageMap.Draw();
	}
};
GridironDraftView.prototype.Open = function() {

	PlayerTeam.Roster.GeneratePriorityNeeds();
	PrioritiesConsoleView.SyncNeeds();

	GenieView.prototype.Open.call(this);

	if (this.State!=this.Specs.STATE.SELECTION)
		this.InfoView.Disable();
};
GridironDraftView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Game.CheckPhone())
		this.InfoView.Update();
	else
		switch (this.State) {
			case this.Specs.STATE.PREVIEW:
				this.UpdateControls();
				if (this.CheckSlotChanged())
					this.DisplayPreview();
				this.UpdateDoubleClick();
				break;
			case this.Specs.STATE.SELECTION:
				this.UpdateButtons();
				this.UpdateTouchBar();
				this.UpdateSelectors();
				if (this.Draft.Round==8)		 //check if draft has ended
					this.EndDraft();
				break;
			case this.Specs.STATE.PROJECTS:
				break;
			case this.Specs.STATE.CAMP:
				break;
		}

	this.ConsoleView.Update();

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
	} else if (Mouse.CheckLeftClicked(CANVAS.ZOOM)) {
	} else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE))
		this.ConsoleView.UpdateClick();
};
GridironDraftView.prototype.Draw = function() {

	this.DisplayRoster();
	if (Game.CheckPhone()) {
		this.DisplayPhonePicks();
		this.DisplayGrid();
		this.DisplayNeeds();
	} else {
		this.DisplaySelections();		//selection order

		this.Context.fillStyle = GREY.ASH;
		this.Context.fillRect(475, 0, 125, 25);
		this.TextWriter.Write("Trade:", 476, 18);
		
		this.Context.fillStyle = GREY.ASH;
		this.Context.fillRect(400, 540, 200, 60);
	}
};
GridironDraftView.prototype.OpenProspectsView = function() {

	GridderInfoView.State = VIEW.GRIDDER.STATE.PREVIEW;
	this.Close(this.LaunchProspectsView.bind(this), 100);
};
GridironDraftView.prototype.LaunchProspectsView = function() {

	DraftProspectsView.Open();
	DraftProspectsView.Update();
};
