
GridironDraftView.prototype.DisplayRoster = function() {

	this.Context.fillStyle = ZFL.TURQUOISE;
	this.Context.fillRect(0, 0, 400, SCREEN.HEIGHT);
	this.DisplayPositions(0, 4, true);
	this.DisplayPositions(5, 9, false);
};
GridironDraftView.prototype.DisplayPositions = function(start, end, bOff) {	//start and end indicated indices of positions - this method used by
	var i, j;																						// ::DisplayRoster exclusively
	var x, y;
	var lName;  //l- last
	var qlty;

	//Set indentations
	if (bOff)
		x = 0;
	else
		x = 200;
	y = 16;

	for (i=start;i<=end;++i) {

		//Player info
		for (j=0;j<this.Roster.Gridders[i].length;++j) {
			this.DisplayProspect = this.Roster.Gridders[i][j];
			qlty = Math.floor(this.DisplayProspect.Quality/3);
			if (qlty>5)
				qlty = 5;
			this.Font = { FONT: "12px Arial", COLOUR: RosterColours[qlty] };
			this.TextWriter.Write(Positions[this.DisplayProspect.Position], x+5, y, this.Font);
			this.Font = { FONT: "10px Arial", COLOUR: RosterColours[qlty] };
			this.TextWriter.Write(SubPositions[this.DisplayProspect.Position][this.DisplayProspect.SubPosition], x+30, y, this.Font);
			this.Font = { FONT: "12px Arial", COLOUR: RosterColours[qlty] };
			this.TextWriter.Write(this.DisplayProspect.Name.First[0], x+60, y, this.Font);
			if (this.Context.measureText(this.DisplayProspect.Name.Last).width>50) {
				lName = GridironUtils.TruncateName(this.DisplayProspect, 50, this.Context);
				this.TextWriter.Write(lName, x+75, y, this.Font);
			} else
				this.TextWriter.Write(this.DisplayProspect.Name.Last, x+75, y, this.Font);
			this.TextWriter.Write(this.DisplayProspect.Experience, x+135, y, this.Font);
			this.TextWriter.Write(Utils.NumberToGrade(this.DisplayProspect.Quality), x+155, y, this.Font);
			if (this.DisplayProspect.Potential>0)
				this.TextWriter.Write("+" + this.DisplayProspect.Potential, x+175, y, this.Font);
			else
				this.TextWriter.Write(this.DisplayProspect.Potential, x+175, y, this.Font);
			y += 16;
		}

		//Draw separating line
		y += 4;
		this.GraphicsTool.DrawRectangle(x+5, y-16, 195, 2, "white", 1);
		y += 4;
	}
};
GridironDraftView.prototype.DisplaySelections = function() {

	//Heading
	this.Context.fillStyle = BLUE.INDIGO;
	this.Context.fillRect(400, 0, 75, 25);
	this.Context.fillRect(400, 25, 200, 515);
	this.TextWriter.Write("ROUND " + this.DisplayRound, 405, 20, { FONT: "14px Arial", COLOUR: "white" } );
	this.GraphicsTool.DrawRectangle(405, 23, 62, 2, "white", 0)

	this.TextWriter.SetFont("12px Arial");
	this.TextWriter.SetColour("white");

	//Teams, needs, picks
	for (this.i=0;this.i<LEAGUE.TEAMS;++this.i) {

		this.y = (16*(this.i % LEAGUE.TEAMS)) + 40;

		//Draw highlight bar if appropriate
		if (this.DisplayRound==this.Draft.Round)			//check if current round is shown
			if (this.i==(this.Draft.CurrentPick % LEAGUE.TEAMS)) {
				this.Context.fillStyle = GREY.SILVER;
				this.Context.fillRect(400, this.y-12, 200, 16);
			}

		this.TextWriter.Write(((this.i % LEAGUE.TEAMS)+1)+".", 405, this.y);					//pick number of round
		this.Pick = (LEAGUE.TEAMS*(this.DisplayRound-1)) + this.i;
		if (this.Draft.SelectionOrder[this.Pick]==PlayerTeam.Index)
			this.TextWriter.SetColour("rgb(127,255,255)");

		//If selection made, write details, else write team name and position of need
		if (this.Pick<this.Draft.CurrentPick) {
			this.num = this.Draft.SelectionOrder[this.Pick] % LEAGUE.TEAMS;					//REDUNDANT?
			this.TextWriter.Write(TeamAbbreviations[this.num], 425, this.y);					//team abbreviation
			this.TextWriter.Write("select", 455, this.y);
			this.TextWriter.Write(this.Selections[this.Pick].Position, 495, this.y);		//position
			this.TextWriter.Write(this.Selections[this.Pick].Initials, 520, this.y);		//prospect initials
			this.TextWriter.Write(this.Selections[this.Pick].Grade, 545, this.y);			//grade
			this.TextWriter.Write("+"+this.Selections[this.Pick].Potential, 568, this.y);	//potential
		} else {
			this.TextWriter.Write(TeamNames[this.Draft.SelectionOrder[this.Pick]][0], 425, this.y);							//team name
			this.TextWriter.Write(Positions[Teams[this.Draft.SelectionOrder[(32*(this.DisplayRound-1))+this.i]].StarterNeeds[0].Position], 570, this.y);	//pos
		}

		this.TextWriter.SetColour("white");
	}

	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
};
GridironDraftView.prototype.DisplayPreview = function() {

	this.DisplayPreviewBackground();
	this.DisplayPreviewProspects();
	this.DisplaySlotOutline();
	this.DisplaySelectedProspect();
	this.DisplayLegend();
};
GridironDraftView.prototype.DisplayPreviewBackground = function() {

	this.Context.fillStyle = InterfaceColours[0];
	this.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	this.TextWriter.Write("Page "+(this.PreviewPage+1)+"/4", 5, 25, { FONT: "bold 18px Arial" } );

	//Dividers
	for (i=1;i<=this.Specs.PREVIEW.COLUMNS;++i) {
		this.GraphicsTool.DrawVerticalLine( { X: 200*i, Y: 50 }, 510, GREY.MEDIUM, 1);
		this.GraphicsTool.DrawVerticalLine( { X: (200*i)+1, Y: 50 }, 510, "white", 1);
	}

	//Controls
	if (this.PreviewPage==0)
		this.NextButton.Show();
	else if (this.PreviewPage==(this.Specs.PREVIEW.PAGES-1))
		this.PreviousButton.Show();
	else {
		this.PreviousButton.Show();
		this.NextButton.Show();
	}
	this.PositionTouchBar.Show();
};
GridironDraftView.prototype.DisplayPreviewProspects = function() {
	var i, j;
	var x, y;
	var nEntries;
	var info;

	this.TextWriter.SetFont("12px Arial");

	nEntries = this.PreviewPage * (this.Specs.PREVIEW.COLUMNS*LEAGUE.TEAMS);
	for (i=0;i<this.Specs.PREVIEW.COLUMNS;++i) {
		x = (200*i) + 10;
		y = 45;
		for (j=0;j<LEAGUE.TEAMS;++j) {
			y += this.Specs.PREVIEW.RH;
			this.Prospect = this.Draft.ValueList[nEntries];

			if (this.Prospect.Position==this.PositionTouchBar.SelectedKey)
				this.TextWriter.SetColour("white");

			//Prospect index by value
			this.TextWriter.Write((nEntries+1) + ".", x, y);
			this.TextWriter.Write(Positions[this.Prospect.Position], x+30, y);
			this.TextWriter.Write(SubPositions[this.Prospect.Position][this.Prospect.SubPosition], x+55, y, { FONT: "9px Arial" } );

			//Status marker plus initials
			info = this.Prospect.Name.First[0] + this.Prospect.Name.Last[0];
			if (this.Prospect.Type)
				TypeSymbolImages.DrawPatchNumber(this.Prospect.Type-1, x+80, y-9);
			this.TextWriter.Write(info, x+90, y);

			//Quality and Potential
			this.TextWriter.Write(Utils.NumberToGrade(this.Prospect.Quality), x+120, y);
			if (this.Prospect.Type==GRIDDER.TYPE.VOLATILE) {
				TypeSymbolImages.DrawPatchNumber(GRIDDER.TYPE.VOLATILE-1, x+145, y-9);
				this.TextWriter.Write(this.Prospect.Potential, x+155, y);
			} else {
				info = "+" + this.Prospect.Potential;
				this.TextWriter.Write(info, x+145, y);
			}

			this.TextWriter.ResetColour();

			//Marker
			if (this.MarkedProspects.includes(this.Prospect))
				this.MarkerImage.Draw(x+170, y-10);

			++nEntries;
			if (nEntries==this.Draft.ValueList.length)
				return;
		}
	}

	this.TextWriter.ResetFont();
};
GridironDraftView.prototype.DisplaySelectedProspect = function() {

	this.PreviewProspectIndex = (this.Specs.PREVIEW.C*this.Specs.PREVIEW.R*this.PreviewPage) + this.PreviewSlot;
	GridderNestedView.ResetGridder(this.Draft.ValueList[this.PreviewProspectIndex]);
};
GridironDraftView.prototype.DisplaySlotOutline = function() {

	this.x = (200*Math.floor(this.PreviewSlot/LEAGUE.TEAMS)) + 5;
	this.y = (this.Specs.PREVIEW.RH*(this.PreviewSlot % LEAGUE.TEAMS)) + this.Specs.PREVIEW.Y;
	this.SlotImage.Draw(this.x, this.y);
};
GridironDraftView.prototype.DisplayMarker = function(slot) {

	this.x = ((Math.floor(slot/this.Specs.PREVIEW.R)+1)*this.Specs.PREVIEW.CW) - 20;
	this.y = ((slot % this.Specs.PREVIEW.R)*this.Specs.PREVIEW.RH) + this.Specs.PREVIEW.Y + 3;
	this.MarkerImage.Draw(this.x, this.y);
};
GridironDraftView.prototype.RemoveMarker = function(slot) {

	this.x = ((Math.floor(slot/this.Specs.PREVIEW.R)+1)*this.Specs.PREVIEW.CW) - 20;
	this.y = ((slot % this.Specs.PREVIEW.R)*this.Specs.PREVIEW.RH) + this.Specs.PREVIEW.Y + 3;
	this.Context.fillStyle = BLUE.POWDER;
	this.Context.fillRect(this.x, this.y, 12, 10);
};
GridironDraftView.prototype.DisplayLegend = function() {
	var i;
	var x, y;

	this.TextWriter.SetColour("white");

	this.TextWriter.Write("Key:", 5, 580);

	for (i=0;i<GRIDDER.ANORMALS;++i) {
		x = (115*(i % 4)) + 40;
		y = (15*Math.floor(i/4)) + 580;
		this.LegendImages.DrawPatchNumber(i, x, y-9);
		this.TextWriter.Write(this.GridderTypes[i+1], x+12, y);
	}

	this.TextWriter.ResetColour();
};
