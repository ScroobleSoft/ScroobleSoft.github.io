
//-----------------------------------------------------------
//---------- GRIDIRON DRAFT CONSOLE VIEW --------------------
var GridironDraftConsoleView = function() {
	var PreviewButton, StartButton, ProjectsButton, CampButton;
	var PositionTouchBar, ProspectPagination, ProspectTouchBar;

	var info;
};
GridironDraftConsoleView.prototype = new GenieSubView();
GridironDraftConsoleView.prototype.Set = function(cnvs, specs, mView) {  //TODO: might need to add ID for current nested view
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironDraftConsoleView.prototype.SetData = function() {

	this.ProspectTypes = [ "", "Divisional", "Injured", "Sparker", "Special", "Temp'mental", "Versatile", "Volatile", "Project", "Dimensional" ];
};
GridironDraftConsoleView.prototype.SetControls = function() {

	this.SetButtons();
	this.SetOptions();
};
GridironDraftConsoleView.prototype.SetButtons = function() {

	this.PreviewButton = new ImageButton();
	this.PreviewButton.Set(this.Canvas, this.Specs.BUTTON.PREVIEW, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.PreviewButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.PreviewButton);
	this.StartButton = new ImageButton();
	this.StartButton.Set(this.Canvas, this.Specs.BUTTON.START, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.StartButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.StartButton);
	this.ProjectsButton = new ImageButton();
	this.ProjectsButton.Set(this.Canvas, this.Specs.BUTTON.PROJECTS, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.ProjectsButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.ProjectsButton);
	this.CampButton = new ImageButton();
	this.CampButton.Set(this.Canvas, this.Specs.BUTTON.CAMP, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.CampButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CampButton);
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
			this.StartButton.Show();
			break;
		case this.MainView.Specs.STATE.PREVIEW:
			this.StartButton.Show();
			break;
		case this.MainView.Specs.STATE.SELECTION:
			this.ShowSelectionControls();
			this.MainView.ShowControls();
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
GridironDraftConsoleView.prototype.ShowSelectionControls = function() {

	this.PositionTouchBar.Show();
	this.ProspectPagination.Show();
	this.ProspectTouchBar.Show();
	this.DisplayProspects();
};
GridironDraftConsoleView.prototype.ColourScape = function() {

	if (this.MainView.State==this.MainView.Specs.STATE.SELECTION)
		GenieSubView.prototype.ColourScape.call(this, null, BLUE.INDIGO);
	else
		GenieSubView.prototype.ColourScape.call(this);
};
GridironDraftConsoleView.prototype.SetDraft = function(drft) {

	this.Draft = drft;
};
GridironDraftConsoleView.prototype.Update = function() {

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

		this.TextWriter.SetColour("white");

		//Get prospect
		this.DisplayProspect = this.DisplayList[nStart+this.i];
		this.y += this.ProspectPagination.Specs.ITEM.H;
		if (this.MainView.MarkedProspects.includes(this.DisplayProspect))
			this.TextWriter.SetColour("red");

		//Write prospect info
		this.info = this.DisplayProspect.Name.GetFullName();
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
	}

	this.TextWriter.ResetFont();
	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();
};
GridironDraftConsoleView.prototype.UpdateButtons = function() {

	if (this.PreviewButton.CheckClicked()) {
		this.PreviewButton.Hide();
		GridderNestedView.SetMode(VIEW.GRIDDER.MODE.DRAFT);
		GridderNestedView.SetGridder(this.MainView.Draft.ValueList[0]);
		GridderNestedView.Open();
		this.MainView.DisplayPreview();
		this.MainView.State = this.MainView.Specs.STATE.PREVIEW;
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
