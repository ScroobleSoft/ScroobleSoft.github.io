
GridironDraftView.prototype.UpdateControls = function() {

	if (this.NextButton.CheckClicked()) {
		if (this.PreviewPage==(this.Specs.PREVIEW.PAGES-2))
			this.NextButton.DeActivate();
		++this.PreviewPage;
		this.DisplayPreview();
	}

	if (this.PreviousButton.CheckClicked()) {
		if (this.PreviewPage==1)
			this.PreviousButton.DeActivate();
		--this.PreviewPage;
		this.DisplayPreview();
	}

	if (this.PositionTouchBar.CheckKeyChanged())
		this.DisplayPreview();
};
GridironDraftView.prototype.UpdateDoubleClick = function() {

	if (Mouse.CheckLeftDoubleClicked(CANVAS.PRIME)) {
		this.slot = this.GetSlot(Mouse.DoubleClick);
		this.Prospect = this.Draft.ValueList[(this.PreviewPage*this.Specs.PREVIEW.PAGE.ITEMS)+this.slot];
		if (this.MarkedProspects.indexOf(this.Prospect)==-1) {
			this.DisplayMarker(this.slot);
			this.MarkedProspects.Add(this.Prospect);
		} else {
			this.RemoveMarker(this.slot);
			this.MarkedProspects.RemoveElement(this.Prospect);
		}
	} else
		Mouse.ClearClicks();
};
GridironDraftView.prototype.GetSlot = function(click) {

	this.c = Math.floor(click.X/this.Specs.PREVIEW.CW);
	this.r = Math.floor((click.Y-this.Specs.PREVIEW.Y)/this.Specs.PREVIEW.RH);

	return ((this.Specs.PREVIEW.R*this.c) + this.r);
};
GridironDraftView.prototype.UpdateButtons = function() {

	if (this.TradeUpButton.CheckClicked())
		TradeUpOptionView.Open();

	if (this.TradeDownButton.CheckClicked())
		TradeDownOptionView.Open();

	//Check if first 4 rounds are over
	if (this.Draft.CurrentPick==128) {
		this.TradeUpButton.Disable();
		this.TradeDownButton.Disable();
	}

	//Update auto selection speed
	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		if (this.SpeedImageMap.CheckClicked()) {
			this.i = this.SpeedImageMap.GetMapEntry(CLICKED);
			switch (this.i) {
				case 0:
					if (this.SelectionFrames>5)
						this.SelectionFrames -= 5;
					break;
				case 1:
					if (this.SelectionFrames<60)
						this.SelectionFrames += 5;
					break;
			}
		}
};
GridironDraftView.prototype.UpdateTouchBar = function() {

	//Show round selected
	if (this.RoundTouchBar.CheckKeyChanged()) {
		this.DisplayRound = this.RoundTouchBar.SelectedKey + 1;
		this.DisplaySelections();
	}
};
GridironDraftView.prototype.UpdateSelectors = function() {

	if (this.SelectButton.CheckClicked())
		this.SelectProspect();

	if (this.AutoSelectButton.CheckClicked()) {
		if (this.AutoModeFlag) {
			this.AutoSelectButton.ReLabel("Start");
			this.AutoSelectCheckBox.Activate();
		} else {
			this.AutoSelectButton.ReLabel("Stop");
			this.AutoSelectCheckBox.DeActivate();
		}
		this.AutoModeFlag = !this.AutoModeFlag;
	}

	if (this.AutoSelectCheckBox.CheckClicked()) {
		if (this.AutoSelectCheckBox.Checked) {
			this.AutoSelectButton.ReLabel("Start");
			this.AutoSelectButton.Enable();
			this.SelectButton.Disable();
			this.Frames = 0;
		} else {
			this.AutoSelectButton.Disable();
			this.SelectButton.Enable();
		}
	}

	if (this.AutoModeFlag) {
		if (this.Draft.SelectionOrder[this.Draft.CurrentPick]==PlayerTeam.Index) {
			this.AutoModeFlag = false;
			this.AutoSelectCheckBox.UnCheck();
			this.AutoSelectButton.Disable();
			this.AutoSelectCheckBox.Activate();
			this.SelectButton.Enable();
		} else {
			if (!this.Frames) {
				this.Frames = this.SelectionFrames;
				this.SelectProspect();
			}
			--this.Frames;
		}
	}
};
GridironDraftView.prototype.CheckSlotChanged = function() {

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		this.slot = this.GetSlot(Mouse.Click);
		if (this.slot!=this.PreviewSlot) {
			this.PreviewSlot = this.slot;
			return (true);
		} else
			return (false);
	} else
		Mouse.ClearClicks();
};
GridironDraftView.prototype.EndDraft = function() {

	this.Draft.End();
	this.ConsoleView.EndDraft();
	this.State = this.Specs.STATE.PROJECTS;

	//Hide controls
	this.AutoSelectCheckBox.Hide();
	this.TradeUpButton.Hide();
	this.TradeDownButton.Hide();
	this.AutoSelectButton.Hide();
	this.SelectButton.Hide();
	this.RoundTouchBar.Hide();
};
