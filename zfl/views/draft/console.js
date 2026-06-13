
//-----------------------------------------------------------
//---------- GRIDIRON DRAFT CONSOLE VIEW --------------------
var GridironDraftConsoleView = function() {
	var PreviewButton, NeedsButton, StartButton, ProjectsButton, CampButton;
	var PositionTouchBar, ProspectPagination, ProspectTouchBar;
	var AllButton, PositionButtons, PageButtons;														//phone
	var AllSelectionImage, PositionSelectionImage, PageSelectionImage, SymbolImages;		//phone
	var ProspectTypes;																						//phone
	var Position, Page, Type, Items, Slot;																//phone
	var DisplayList;																							//phone
	var ClickedFlag;

	var i, num, info;
};
GridironDraftConsoleView.prototype = new GenieSubView();
GridironDraftConsoleView.prototype.Set = function(cnvs, specs, mView) {  //TODO: might need to add ID for current nested view
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironDraftConsoleView.prototype.SetData = function() {

	this.ProspectTypes = [ "", "Divisional", "Injured", "Sparker", "Special", "Temp'mental", "Versatile", "Volatile", "Project", "Dimensional" ];

	this.Position = -1;
	this.Page = 0;
	this.Type = 0;
	this.Slot = 0;
};
GridironDraftConsoleView.prototype.SetImages = function() {

	this.AllSelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.ALL);
	this.PositionSelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.POSITION);
	this.PageSelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.PAGE);
	this.SymbolImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SYMBOLS);
};
GridironDraftConsoleView.prototype.SetControls = function() {

	this.SetButtons();
	this.SetOptions();
	if (Game.CheckPhone())
		this.SetPhoneButtons();
};
GridironDraftConsoleView.prototype.SetButtons = function() {

	this.PreviewButton = this.SetImageButton(this.Specs.BUTTON.PREVIEW, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.NeedsButton = this.SetImageButton(this.Specs.BUTTON.NEEDS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.StartButton = this.SetImageButton(this.Specs.BUTTON.START, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.ProjectsButton = this.SetImageButton(this.Specs.BUTTON.PROJECTS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.CampButton = this.SetImageButton(this.Specs.BUTTON.CAMP, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
GridironDraftConsoleView.prototype.SetPhoneButtons = function() {
	var i;
	var l, t;
	var sx, sy;
	var specs;

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

	//Page buttons
	this.PageButtons = ArrayUtils.Create(8, ImageButton);
	for (i=0;i<this.PageButtons.length;++i) {
		l = this.Specs.BUTTON.PAGES.L + (this.Specs.BUTTON.PAGES.W*i);
		t = this.Specs.BUTTON.PAGES.T;
		sx = this.Specs.BUTTON.PAGES.SX + (i*(this.Specs.BUTTON.PAGES.W+this.Specs.BUTTON.PAGES.O-(2*this.Specs.BUTTON.PAGES.LW)));
		sy = this.Specs.BUTTON.PAGES.SY;
		specs = { L: l, T: t, W: this.Specs.BUTTON.PAGES.W, H: this.Specs.BUTTON.PAGES.H, LW: this.Specs.BUTTON.PAGES.LW, SX: sx, SY: sy,
					 STYLE: this.Specs.BUTTON.PAGES.STYLE, BACKGROUND: this.Specs.BUTTON.PAGES.BACKGROUND };
		this.PageButtons[i] = this.SetImageButton(specs, ImageManager.Pics[IMAGeINDEX.CONTROLS], ShallowCornerImages);
	}
};
GridironDraftConsoleView.prototype.SetOptions = function() {

	this.PositionTouchBar = new GenieTouchBar();
	this.PositionTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.POSITION, this.Specs.TOUChBAR.POSITION.IMAGE);
	this.Controls.push(this.PositionTouchBar);
	this.ProspectPagination = new GeniePagination();
	this.ProspectPagination.Set(this.Canvas, this.Specs.PAGINATION.PROSPECT, this.Specs.PAGINATION.PROSPECT.IMAGE);
	this.Controls.push(this.ProspectPagination);
	this.ProspectTouchBar = new GenieTouchBar();
	this.ProspectTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.PROSPECT, this.Specs.TOUChBAR.PROSPECT.IMAGE);
	this.Controls.push(this.ProspectTouchBar);
};
GridironDraftConsoleView.prototype.ShowControls = function() {

	switch (this.MainView.State) {
		case this.MainView.Specs.STATE.INTRO:
			this.PreviewButton.Show();
			this.NeedsButton.Show();
			this.StartButton.Show();
			break;
		case this.MainView.Specs.STATE.PREVIEW:
			this.StartButton.Show();
			break;
		case this.MainView.Specs.STATE.SELECTION:
			if (Game.CheckPhone()) {
				this.AllButton.Show();
				this.PositionButtons.forEach(function(btn) {btn.Show();} );
				this.PageButtons.forEach(function(btn) {btn.Show();} );
			} else {
				this.ShowSelectionControls();
				this.MainView.ShowControls();
			}
			break;
		case this.MainView.Specs.STATE.PROJECTS:
			this.ProjectsButton.Show();
			this.CampButton.Show();
			break;
		case this.MainView.Specs.STATE.CAMP:
			this.CampButton.Show();
			break;
	}
};
GridironDraftConsoleView.prototype.ShowPhoneControls = function() {

	this.AllButton.Show();
	this.PositionButtons.forEach(function(btn) {btn.Show();} );
	this.DisplayPageButtons();
};
GridironDraftConsoleView.prototype.DisplayPageButtons = function() {

	this.PageButtons.forEach( function(btn) {btn.Hide();} );

	//Check if there is anything to display
	if (this.DisplayList) {
		if (this.DisplayList.length==0)
			return;
	} else
		return;

	//Show correct number of buttons
	nBtns = Math.ceil(this.DisplayList.length/10);
	nBtns = nBtns>8 ? 8 : nBtns;
	for (i=0;i<nBtns;++i)
		this.PageButtons[i].Show();

	this.DisplayPageSelector();
};
GridironDraftConsoleView.prototype.ShowSelectionControls = function() {

	this.PositionTouchBar.Show();
	this.ProspectPagination.Show();
	this.ProspectTouchBar.Show();
	this.DisplayProspects();
};
GridironDraftConsoleView.prototype.SetDraft = function(drft) {

	this.Draft = drft;
};
GridironDraftConsoleView.prototype.Open = function() {
	GenieSubView.prototype.Open.call(this);

	if (this.MainView.State==this.MainView.Specs.STATE.SELECTION)
		this.DisplaySelectors();
};
GridironDraftConsoleView.prototype.Update = function() {

	if (Game.CheckPhone())
		this.UpdatePhone();
	else
		switch (this.MainView.State) {
			case this.MainView.Specs.STATE.INTRO:
			case this.MainView.Specs.STATE.PREVIEW:
			case this.MainView.Specs.STATE.PROJECTS:
			case this.MainView.Specs.STATE.CAMP:
				this.UpdateButtons();
				break;
			case this.MainView.Specs.STATE.SELECTION:
				this.CheckProspectControls();
				break;
		}
};
GridironDraftConsoleView.prototype.UpdateClick = function() {
	var iSlot;

	if (!this.ClickedFlag) {
		this.ClickedFlag = true;
		return;
	}

	if (this.MainView.State!=this.MainView.Specs.STATE.SELECTION)
		return;

	if (IntersectUtils.CheckPointBox(Mouse.Click, this.Specs.PROSPECTS)) {
		iSlot = Math.floor((Mouse.Click.Y-this.Specs.PROSPECTS.T)/this.Specs.PROSPECTS.SLOT.H);
		if (iSlot<this.Items) {
			this.Slot = iSlot;
			this.DisplayPhoneProspects();
		}
	}
};
GridironDraftConsoleView.prototype.Draw = function() {

	if (Game.CheckPhone())
		if (this.MainView.State==this.MainView.Specs.STATE.SELECTION) {
			this.ColourScape(null, BLUE.INDIGO);
			this.DisplayPhoneProspects();
		}
};
GridironDraftConsoleView.prototype.UpdatePhone = function() {

	if (this.PreviewButton.CheckClicked())
		this.MainView.OpenProspectsView();

	if (this.NeedsButton.CheckClicked())
		this.MainView.SwitchConsoleView(PrioritiesConsoleView);

	if (this.StartButton.CheckClicked()) {
		this.StartButton.Hide();
		this.NeedsButton.Hide();
		this.PreviewButton.Hide();
		this.ColourScape(null, BLUE.INDIGO);
		this.DisplayPhoneProspects();
		this.ShowPhoneControls();
		this.DisplaySelectors();
		this.MainView.InfoView.Enable();
		this.MainView.State = this.MainView.Specs.STATE.SELECTION;
	}

	if (this.ProjectsButton.CheckClicked()) {
		this.MainView.State = this.MainView.Specs.STATE.CAMP;
		ProjectDialogView.Open();
	}

	if (this.CampButton.CheckClicked())
		CampDialogView.Open();


	this.UpdateProspectButtons();
};
GridironDraftConsoleView.prototype.DisplayProspects = function() {
	var nStart;
	var pos;

	this.DisplayList = this.Draft.GetProspectList(this.PositionTouchBar.SelectedKey-1, this.ProspectTouchBar.SelectedKey);
	this.ProspectPagination.SetItems(this.DisplayList);

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("12px Arial");

	//Write info to page
	this.ProspectPagination.DrawPage();
	nStart = this.ProspectPagination.SelectedPage * this.ProspectPagination.Specs.ITEM.COUNT;
	this.y = this.ProspectPagination.Specs.T - 4;
	for (this.i=0;this.i<this.ProspectPagination.Specs.ITEM.COUNT;++this.i) {

		//Safety checks
		if (this.DisplayList.Length) {  //for GenieLists
			if ((nStart+this.i)==this.DisplayList.Length)
				break;
		} else if ((nStart+this.i)==this.DisplayList.length)
			break;

		//Get prospect, set colour
		this.DisplayProspect = this.DisplayList[nStart+this.i];
		if (this.DisplayProspect.Experience==FLAG)
			this.TextWriter.SetColour("yellow");
		else
			this.TextWriter.SetColour("white");

		//Write prospect info
		this.info = this.DisplayProspect.Name.GetFullName();
		this.y += this.ProspectPagination.Specs.ITEM.H;
		if (StringUtils.GetTextWidth(this.info, "12px Arial", this.Context)<135)
			this.TextWriter.Write(this.info, this.ProspectPagination.Specs.L+5, this.y);
		else {
			this.info = this.DisplayProspect.Name.First[0] + " ";
			this.info += this.DisplayProspect.Name.Last;
			this.TextWriter.Write(this.info, this.ProspectPagination.Specs.L+5, this.y);
		}
		if (!this.ProspectPagination.SelectedKey)  //prospects by value
			this.TextWriter.Write(Positions[this.DisplayProspect.Position], this.ProspectPagination.Specs.L+140, this.y);
		pos = SubPositions[this.DisplayProspect.Position][this.DisplayProspect.SubPosition];
		this.TextWriter.Write(pos, this.ProspectPagination.Specs.L+165, this.y, { FONT: "10px Arial" } );
		this.TextWriter.Write(Utils.NumberToGrade(this.DisplayProspect.Quality), this.ProspectPagination.Specs.L+192, this.y);
		this.TextWriter.Write("+"+this.DisplayProspect.Potential, this.ProspectPagination.Specs.L+209, this.y);
		this.TextWriter.Write(GridderTypes[this.DisplayProspect.Type], this.ProspectPagination.Specs.L+235, this.y);
		this.TextWriter.Write(Utils.NumberToGrade(this.DisplayProspect.Value), this.ProspectPagination.Specs.L+273, this.y, { FONT: "10px Arial" } );

		this.TextWriter.ResetColour();
	}

	this.TextWriter.ResetFont();
	this.TextWriter.ResetContext();
};
GridironDraftConsoleView.prototype.DisplayPhoneProspects = function() {
	var i;
	var y;
	var nBtns;
	var info;

	Graphics.SetContext(this.Context);
	Graphics.DrawRectangle(4, 64, 188, 150, ZFL.TURQUOISE, 0);
	Graphics.DrawRectangle(2, 62, 192, 154, "white", 2);
	Graphics.ResetContext();

	Text.SetContext(this.Context);

	//Get list of prospects matching criteria specified
	this.DisplayList = this.Draft.GetProspectList(this.Position, this.Type);
	if (this.DisplayList.length==0)
		return;

	//Colour selected slot
	Graphics.SetContext(this.Context);
	Graphics.DrawRectangle(4, 64+(15*this.Slot), 188, 14, GREY.SILVER, 0);
	Graphics.ResetContext();

	//Show 10 prospects
	for (i=0;i<10;++i) {		//HARD-CODED

		//Safety check
		if ( (10*this.Page)+i < this.DisplayList.length )		//HARD-CODED
			this.DisplayProspect = this.DisplayList[(10*this.Page)+i];
		else
			break;

		//Set colour
		if (this.DisplayProspect.Experience==FLAG)
			Text.SetColour("yellow");
		else
			Text.SetColour("white");

		y = 60 + (15*(i+1));
		info = this.DisplayProspect.Name.GetFullName();
		if (StringUtils.GetTextWidth(info, "12px Arial", this.Context)<90)
			Text.Write(info, 6, y, { FONT: "12px Arial" } );
		else {
			info = this.DisplayProspect.Name.First[0] + " ";
			info += this.DisplayProspect.Name.Last;
			Text.Write(info, 6, y, { FONT: "12px Arial" } );
		}
		Text.Write(Positions[this.DisplayProspect.Position], 102, y, { FONT: "12px Arial" } );
		Text.Write(Utils.NumberToGrade(this.DisplayProspect.Quality), 126, y, { FONT: "12px Arial" } );
		Text.Write("+"+this.DisplayProspect.Potential, 144, y, { FONT: "12px Arial" } );
		if (this.DisplayProspect.Type)
			this.SymbolImages.DrawPatchNumber(this.DisplayProspect.Type-1, 166, y-9);
		Text.Write(Utils.NumberToGrade(this.DisplayProspect.Value), 178, y, { FONT: "10px Arial" } );

		Text.ResetColour();
	}

	this.Items = i;

	this.DisplayPageButtons();
};
GridironDraftConsoleView.prototype.DisplaySelectors = function() {

	if (this.Position==-1)
		this.DisplayAllSelector();
	else
		this.DisplayPositionSelector();
	if (this.DisplayList.length!=0)
		this.DisplayPageSelector();
};
GridironDraftConsoleView.prototype.DisplayAllSelector = function() {

	this.AllSelectionImage.Draw();
};
GridironDraftConsoleView.prototype.DisplayPositionSelector = function() {
	var x, y;

	x = this.Specs.BUTTON.POSITIONS.L + ((this.Position % 5)*this.Specs.BUTTON.POSITIONS.W) + this.Specs.BUTTON.POSITIONS.LW;
	y = this.Specs.BUTTON.POSITIONS.T + (Math.floor(this.Position/5)*this.Specs.BUTTON.POSITIONS.H) + this.Specs.BUTTON.POSITIONS.LW;
	this.PositionSelectionImage.Draw(x, y);
};
GridironDraftConsoleView.prototype.DisplayPageSelector = function() {
	var x;

	x = this.Specs.BUTTON.PAGES.L + (this.Page*this.Specs.BUTTON.PAGES.W) + this.Specs.BUTTON.PAGES.LW;
	this.PageSelectionImage.Draw(x, this.Specs.BUTTON.PAGES.T+this.Specs.BUTTON.PAGES.LW);
};
GridironDraftConsoleView.prototype.UpdateButtons = function() {

	if (this.PreviewButton.CheckClicked()) {
		this.PreviewButton.Hide();
		GridderNestedView.SetMode(VIEW.GRIDDER.MODE.DRAFT);
		GridderNestedView.SetGridder(this.MainView.Draft.ValueList[0]);
		GridderNestedView.Open();
		this.MainView.DisplayPreview();
		this.MainView.State = this.MainView.Specs.STATE.PREVIEW;
		GridderInfoView.State = VIEW.GRIDDER.STATE.PREVIEW;
	}

	if (this.StartButton.CheckClicked()) {
		if (this.MainView.State==this.MainView.Specs.STATE.INTRO)
			this.PreviewButton.Hide();
		else {
			this.MainView.PreviousButton.Hide();
			this.MainView.NextButton.Hide();
			this.MainView.PositionTouchBar.Hide();
			GridderNestedView.Close();
		}
		this.StartButton.Hide();
		this.MainView.State = this.MainView.Specs.STATE.SELECTION;
		GridderInfoView.State = VIEW.GRIDDER.STATE.DRAFT;
		this.MainView.Draw();
		this.ColourScape();
		this.ShowControls();
		this.MainView.InfoView.DisplayTitle();
	}

	if (this.ProjectsButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		--this.MainView.DisplayRound;									//HACK!!
		ProjectDialogView.Open();
	}

	if (this.CampButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		CampDialogView.Open();
	}
};
GridironDraftConsoleView.prototype.UpdateProspectButtons = function() {

	//All buttons
	if (this.AllButton.CheckClicked()) {
		if (this.Position!=-1) {
			this.PositionButtons.forEach( function(btn) {btn.Show();} );
			this.Position = -1;
			this.Page = 0;
			this.Slot = 0;
			setTimeout(this.DisplayAllSelector.bind(this), 100);
			this.DisplayPhoneProspects();
		}
		return;
	}

	//Position buttons
	for (this.i=0;this.i<POSITION.COUNT;++this.i)
		if (this.PositionButtons[this.i].CheckClicked())
			break;
	if (this.i!=POSITION.COUNT) {
		this.Page = 0;
		this.Slot = 0;
		if (this.Position==-1) {
			this.AllButton.Show();
			this.Position = this.i;
			setTimeout(this.DisplayPositionSelector.bind(this), 100);
			this.DisplayPhoneProspects();
		} else if (this.i!=this.Position) {
			this.PositionButtons.forEach( function(btn) {btn.Show();} );
			this.Position = this.i;
			setTimeout(this.DisplayPositionSelector.bind(this), 100);
			this.DisplayPhoneProspects();
		}
		return;
	}

	//Page buttons
	if (this.DisplayList) {
		if (this.DisplayList.length==0)
			return;
	} else
		return;
	this.num = Math.ceil(this.DisplayList.length/10);
	this.num = (this.num>8) ? 8 : this.num;
	for (this.i=0;this.i<this.num;++this.i)
		if (this.PageButtons[this.i].CheckClicked())
			break;
	if (this.i!=this.num)
		if (this.i!=this.Page) {
			this.PageButtons[this.Page].Show();
			this.Page = this.i;
			this.Slot = 0;
			setTimeout(this.DisplayPageSelector.bind(this), 100);
			this.DisplayPhoneProspects();
		}
};
GridironDraftConsoleView.prototype.CheckProspectControls = function() {

	//Positions bar
	if (this.PositionTouchBar.CheckKeyChanged()) {
		this.ProspectPagination.SelectedItemIndex = 0;
		this.DisplayProspects();
		this.ProspectPagination.DrawStrip();
	}

	//Prospect pages
	if (this.ProspectPagination.CheckSelectionChanged())
		this.DisplayProspects();
	if (this.ProspectPagination.CheckPageChanged()) {
		this.ProspectPagination.SelectedItemIndex = 0;
		this.DisplayProspects();
	}

	//Positions bar
	if (this.ProspectTouchBar.CheckKeyChanged()) {
		this.ProspectPagination.SelectedPage = 0;
		this.ProspectPagination.SelectedItemIndex = 0;
		this.DisplayProspects();
		this.ProspectPagination.DrawStrip();
	}
};
GridironDraftConsoleView.prototype.EndDraft = function() {

	this.Controls.forEach(function(cntrl) {cntrl.Hide();});
	this.ColourScape();
	this.ProjectsButton.Show();
	this.CampButton.Show();
};
