
//------------------------------------------------------
//---------- GRIDIRON DRAFT PREVIEW --------------------
var GridironDraftPreview = function() {
	var Draft;

	//Controls
	var TypeRadioOptions;
	var AlternateIconsPanel;

	var Prefixes;
	var Entries;				//prospects and titles
	var Position;			//index
	var Prospect;
};
GridironDraftPreview.prototype = new GridironTableView();
GridironDraftPreview.prototype.Set = function(cnvs, specs, gTool, tWriter) {
	GridironTableView.prototype.Set.call(this, cnvs, specs, gTool, tWriter);

	this.Prefixes = ["","÷","!","*","$","†","^","±"];
	this.Entries = new Array(VIEW.DRAFT.PREVIEW.ENTRIES);
};
GridironDraftPreview.prototype.SetSubControls = function(cScape) {
	GridironTableView.prototype.SetSubControls.call(this, null, cScape);

	//TODO: need a start draft button here

	this.TypeRadioOptions = new GenieRadioControls();
	this.TypeRadioOptions.Set(this.ConsoleScape, TYPeRADIoOPTIONs, RadioOptionImage);
	this.TypeRadioOptions.SetLinks(null, this.TextWriter);
	this.AlternateIconsPanel = new GenieIconPanel();
	this.AlternateIconsPanel.Set(this.ConsoleScape, ALTERNATeICONsPANEL, ALTERNATeICONsIMAGE);
	this.AlternateIconsPanel.SetLinks(this.GraphicsTool);
	this.AlternateIconsPanel.SetCornersPic(IconCornersImage);

	this.Controls.push(PositionTouchBar);
	this.Controls.push(this.TypeRadioOptions);
	this.Controls.push(this.AlternateIconsPanel);
};
GridironDraftPreview.prototype.SetDraft = function(drft) {
	var i;
	var nProspects;
	var value;

	this.Draft = drft;
	nProspects = 0;
	value = -1;
	for (i=0;i<this.Entries.length;++i)
		if (this.Draft.ValueList[nProspects].Value!=value) {
	 ++value;
	 this.Entries[i] = 1000 + value;			//NOTE: numbers higher than or equal to 1000 indicate heading
		} else {
	 this.Entries[i] = nProspects;
	 ++nProspects;
		}
},
GridironDraftPreview.prototype.Open = function() {

	this.DisplayConsole();

	GridironTableView.prototype.Open.call(this);

	this.DisplayProspects();
},
GridironDraftPreview.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	GridironTableView.prototype.Update.call(this);

	if (this.CheckColumnChanged())
		this.DisplayProspects();

	//Check touchbar
	if (PositionTouchBar.CheckKeyChanged()) {
		if (PositionTouchBar.SelectedKey>(this.Specs.COLUMN.COUNT-4))
	 PositionTouchBar.SelectedKey = this.Specs.COLUMN.COUNT - 4;
		else {
	 PositionTouchBar.Draw();
	 this.DisplayProspects();
		}
	}

	//-respond to all 3 console controls
};
/*
GridironDraftPreview.prototype.Close = function() {
	GridironTableView.prototype.Close.call(this);

		//UNLOGGED

};
*/
GridironDraftPreview.prototype.DisplayConsole = function() {

	this.ColourScape(this.ConsoleScape, this.Specs.COLOUR.CONSOLE);
	this.GraphicsTool.SwitchContext(this.ConsoleScape.Context);
	this.GraphicsTool.DrawBasReliefSection(35, 20, 110, 75, 50, this.Specs.COLOUR.CONSOLE)
	this.GraphicsTool.RestoreContext();
	this.TextWriter.Write("Types", 38, 25, null, CANVAS.CONSOLE);
//	this.Controls.forEach(function(control) {control.Show();});
};
GridironDraftPreview.prototype.DisplayProspects = function() {
	var x, y;
	var nEntries;
	var info;

	this.ClearTable();

	nEntries = VIEW.TABLE.COLUMN.ENTRIES * this.ColumnNumber;
	for (x=VIEW.TABLE.L;x<(VIEW.TABLE.L+VIEW.TABLE.W);x+=VIEW.TABLE.COLUMN.W) {
		for (y=VIEW.TABLE.T+12;y<VIEW.TABLE.T+VIEW.TABLE.H;y+=VIEW.TABLE.ENTRY.H) {

	 if (this.Entries[nEntries]>=1000)
			 this.DisplaySectionTitle(x+12, y-12, this.Entries[nEntries]-1000);
	 else {
		 this.Prospect = this.Draft.ValueList[this.Entries[nEntries]];

		 //Prospect index by value
		 this.TextWriter.Write((this.Entries[nEntries]+1) + ".", x+5, y, { FONT: "12px Arial" } );
		 this.TextWriter.Write(SubPositions[this.Prospect.Position][this.Prospect.SubPosition], x+30, y, { FONT: "12px Arial" } );

		 //Status marker plus initials
		 info = this.Prefixes[this.Prospect.Type] + this.Prospect.Name.First[0] + this.Prospect.Name.Last[0];
		 this.TextWriter.Write(info, x+60, y, { FONT: "12px Arial" } );

		 //Quality and Potential
		 this.TextWriter.Write(Utils.NumberToGrade(this.Prospect.Quality), x+90, y, { FONT: "12px Arial" } );
		 if (this.Prospect.Type==GRIDDER.TYPE.VOLATILE)
			 info = "±";
		 else
			 info = "+";
		 info += this.Prospect.Potential;
		 this.TextWriter.Write(info, x+110, y, { FONT: "12px Arial" } );
	 }

	 ++nEntries;
	 if (nEntries==this.Specs.ENTRIES)
		 return;
		}
	}
};
GridironDraftPreview.prototype.DisplaySectionTitle = function(x, y, value) {
	var grade, mark;

	grade = Math.floor(value/3);
	mark = value % 3;
	this.GraphicsTool.DrawRectangle(x-9, y, 100, 15, PAINT.NAVY, 0);
	DraftGradeImages.DrawPatchNumber(grade, x, y);
	if (mark==0)
		GradeMarksImages.DrawPatchNumber(0, x+14, y+3);
	else if (mark==2)
		GradeMarksImages.DrawPatchNumber(1, x+14, y+3);
};
GridironDraftPreview.prototype.StartDraft = function() {

	 DraftButton.Hide();
	 Teams.forEach(function(team){team.PracticeSquad.PromoteAll();});
	 Teams.forEach(function(team){team.GenerateDraftProfile();});
	 Teams.forEach(function(team){team.EvaluateNeeds();});
	 DraftSubView.SetDraft(Draft);
	 DraftSubView.Open();
	 TeamView.SubView = DraftSubView;
		TeamView.Update();
};
