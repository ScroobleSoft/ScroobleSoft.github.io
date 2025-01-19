
//-----------------------------------------------------------
//---------- GRIDIRON ROSTER NESTED VIEW --------------------
var GridironRosterNestedView = function() {
	var Roster;
	var PositionButtons;
	var Prospect;
	var Slot, SelectedSlot;

	var Info;
	var Font;
	var RosterSlots;
	var TradeValue;
	var TradeTargets;
	var TradePartners;		//array of team indices picked randomly

	var Id;

	var i, x, y;
};
GridironRosterNestedView.prototype = new GenieNestedView();
//GridironRosterNestedView.prototype.Set = function(cntxt, iBox, cPanel, gTool, tWriter) {
GridironRosterNestedView.prototype.Set = function(cnvs, specs, mView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, mView);

	this.Id = VIEW.TEAM.SUB.ROSTER;
	this.RosterSlots = new GenieArray();
	this.RosterSlots.Set(ROSTER.SLOTS, Coordinate2D);
	this.SelectedSlot = this.RosterSlots[0];
	this.TradePartners = new Array();
	this.SurplusSlots = 0;
};
GridironRosterNestedView.prototype.SetControls = function() {
	var i;
	var specs;

	this.PositionButtons = ArrayUtils.Create(POSITION.COUNT, TextButton);
	for (i=0;i<POSITION.COUNT;++i) {		//NOTE: L and T have to be set dynamically before drawing
		specs = { L: this.Specs.BUTTON.POSITIONS.L, T: this.Specs.BUTTON.POSITIONS.T, W: this.Specs.BUTTON.POSITIONS.W, H: this.Specs.BUTTON.POSITIONS.H,
					 LW: this.Specs.BUTTON.POSITIONS.LW, COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, LABEL: Positions[i], STYLE: BUTTON.STYLE.SHALLOW,
					 BACKGROUND: this.Specs.BUTTON.POSITIONS.BACKGROUND };
		this.PositionButtons[i].Set(this.Canvas, specs, this.TextWriter);
		this.PositionButtons[i].SetCornersPic(ShallowCornerImages);
		this.Controls.push(this.PositionButtons[i]);
	}
};
GridironRosterNestedView.prototype.SetRoster = function(rstr) {

	this.Roster = rstr;
};
/*
	Open() {
 
		this.DisplayRoster();
	},
*/
GridironRosterNestedView.prototype.Update = function() {

	//UNLOGGED

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdateSlot();
};
/*
	Close() {

		PositionButtons.forEach(function(btn){btn.Hide();});
		this.Context.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);		//TODO: does entire width of screen need to be cleared?
//		this.InfoView.Close();
//		this.ConsoleView.Close();
	},
*/
GridironRosterNestedView.prototype.UpdateSlot = function() {

	//UNLOGGED

	this.Slot = this.GetSlot();
	if (this.Slot) {
/*
	 this.InfoBox.fillStyle = GREY.LIGHT;
	 this.InfoBox.fillRect(0, 210, SCREEN.WIDTH, 30);
	 this.TextWriter.SwitchContext(CANVAS.ZOOM);
	 this.TextWriter.Write(this.Slot.Player.Name.GetFullName(), 5, 230);
	 this.TradeValue = this.Slot.Player.GetTradeValue(League.GamesPlayed);
	 if (this.TradeValue) {
		 if (this.TradeValue==18) this.Info = "	";
		 else if ((this.TradeValue % 3)==0) this.Info = "High ";
		 else if ((this.TradeValue % 3)==1) this.Info = "Mid ";
		 else if ((this.TradeValue % 3)==2) this.Info = "Low ";
		 this.Info += Math.floor(this.TradeValue/3) + 1;
		 this.TextWriter.Write("Trade value: "+this.Info, 120, 230);
	 } else
		 this.TextWriter.Write("Trade value: None", 110, 230);
	 this.TextWriter.RestoreContext();
*/
		if (this.Slot!=this.SelectedSlot) {
			this.SelectedSlot = this.Slot;
			this.ColourScape();
			this.Draw();
			GridderNestedView.ResetGridder(this.SelectedSlot.Player);
/*
			 if (this.ConsoleView.Id==VIEW.ROSTER.TRADE) {
				 TradeSubSubView.SetGridder(this.SelectedSlot.Player);
				 TradeTargetPagination.Draw();
			 }
*/
		}
	}
};
GridironRosterNestedView.prototype.ClickedOn = function() {

	this.Slot = this.GetSlot();
	if (this.Slot) {
		this.SelectedSlot = this.Slot;
		this.Draw();
	}
};
GridironRosterNestedView.prototype.Draw = function() {
	var i, j;
	var x, y;
	var nSlots, nSlotsAssigned;

	//Heading
	this.TextWriter.Write("Roster", 135, 20, { FONT: "18px Arial", STYLE: FONT.STYLE.BOLD } );
	this.TextWriter.Write("key:  ÷divisional	°dimensional	!injured	*sparker	$special", 270, 12, { FONT: "12px Arial", COLOUR: "white" } );
	this.TextWriter.Write("†temperamental	^versatile	±volatile", 395, 26, { FONT: "12px Arial", COLOUR: "white" } );

	//First determine slot and section locations, draw sections
	this.SlotsWritten = 0;
	x = 19;
	y = 30;
	nSlotsAssigned = 0;
	for (i=0;i<POSITION.COUNT;++i) {
		if ( (y+(15*this.Roster.Gridders[i].length)+10+10) > SCREEN.HEIGHT ) {  //check if section doesn't spill off the bottom of the screen

			//--Break the slots into two sections--

			//Left section
			nSlots = Math.floor((SCREEN.HEIGHT-(y+10+10))/15);  //10 for section padding, 10 for space till bottom of screen
			this.DrawBasReliefSection(x-9, y, nSlots);
			this.PositionButtons[i].Specs.L = x;
			this.PositionButtons[i].Specs.T = y - 10;
			for (j=0;j<nSlots;++j) {								//slots on left side of page
				this.RosterSlots[nSlotsAssigned].X = x;
				this.RosterSlots[nSlotsAssigned].Y = y + 20 + (15*j);
				this.RosterSlots[nSlotsAssigned].Player = this.Roster.Gridders[i][j];
				++nSlotsAssigned;
			}

			//Right section
			x += (SCREEN.WIDTH/2);
			y = 30;
			this.DrawBasReliefSection(x-9, y, this.Roster.Gridders[i].length-nSlots, true);
			for (j=nSlots;j<this.Roster.Gridders[i].length;++j) {				//slots on right side of page
				this.RosterSlots[nSlotsAssigned].X = x;
				this.RosterSlots[nSlotsAssigned].Y = y + 20 + (15*(j-nSlots));
				this.RosterSlots[nSlotsAssigned].Player = this.Roster.Gridders[i][j];
				++nSlotsAssigned;
			}
			y += (15*(j-nSlots)) + 10 + 25;		//25 is space between sections, 10 is padding
		} else {
			this.DrawBasReliefSection(x-9, y, this.Roster.Gridders[i].length);
			this.PositionButtons[i].Specs.L = x;
			this.PositionButtons[i].Specs.T = y - 10;
			for (j=0;j<this.Roster.Gridders[i].length;++j) {  					//all slots on one side of the page only
				this.RosterSlots[nSlotsAssigned].X = x;
				this.RosterSlots[nSlotsAssigned].Y = y + 20 + (15*j);
				this.RosterSlots[nSlotsAssigned].Player = this.Roster.Gridders[i][j];
				++nSlotsAssigned;
			}
			y += (15*j) + 10 + 25;
		}

		if (y>(SCREEN.HEIGHT-30)) {  //check if any space left on page
			x += (SCREEN.WIDTH/2);
			y = 30;
		}

		this.PositionButtons[i].Show();
	}

	//Write player info using smaller, multi-coloured font
	pIndex = 0;
	for (i=0;i<POSITION.COUNT;++i)
		for (j=0;j<this.Roster.Gridders[i].length;++j) {

			//Set font colour
			qlty = Math.floor(this.RosterSlots[pIndex].Player.Quality/3);
			if (qlty>5)
				qlty = 5;
			this.Font = { FONT: "bold 12px Arial", COLOUR: RosterColours[qlty] };
			x = this.RosterSlots[pIndex].X;
			y = this.RosterSlots[pIndex].Y;
			if (this.SelectedSlot)
				if (this.SelectedSlot===this.RosterSlots[pIndex]) {
					this.Context.fillStyle = RosterColours[qlty];
					this.Context.fillRect(x-7, y-11, 275, 15);
					this.Font.COLOUR = (qlty==3) ? "black" : "white";	//NOTE: switching to black on yellow since white on yellow is illegible
				}

			//Write name
			if (this.RosterSlots[pIndex].Player.Type) {
				this.Info = this.RosterSlots[pIndex].Player.Name.GetFullName();
				this.AppendInfoIdentifier(this.RosterSlots[pIndex].Player.Type);
				this.TextWriter.Write(this.Info, x, y, this.Font);
			} else
				this.TextWriter.Write(this.RosterSlots[pIndex].Player.Name.GetFullName(), x, y, this.Font);

			//Display position
			this.Font.FONT = "bold 10px Arial";
			this.TextWriter.Write(SubPositions[this.RosterSlots[pIndex].Player.Position][this.RosterSlots[pIndex].Player.SubPosition], x+145, y, this.Font);
			this.Font.FONT = "bold 12px Arial";

			//Display Quality and Potential
			this.TextWriter.Write(this.RosterSlots[pIndex].Player.Experience, x+180, y, this.Font);
			this.TextWriter.Write(Utils.NumberToGrade(this.RosterSlots[pIndex].Player.Quality), x+205, y, this.Font);
			if (this.RosterSlots[pIndex].Player.Potential>=10)
				this.TextWriter.Write("+"+this.RosterSlots[pIndex].Player.Potential, x+224, y, this.Font);
			else if (this.RosterSlots[pIndex].Player.Potential>0)
				this.TextWriter.Write("+"+this.RosterSlots[pIndex].Player.Potential, x+230, y, this.Font);
			else if (this.RosterSlots[pIndex].Player.Potential<0)
				this.TextWriter.Write(this.RosterSlots[pIndex].Player.Potential, x+233, y, this.Font);
			else
				this.TextWriter.Write(this.RosterSlots[pIndex].Player.Potential, x+237, y, this.Font);

			//Display Injury Status
			if (League.GamesPlayed>=0)
				if (this.RosterSlots[pIndex].Player.CheckInjured())
					this.TextWriter.Write("I", x+255, y, this.Font);

			++pIndex;
		}
};
GridironRosterNestedView.prototype.ListGridders = function() {	//NOTE: used in draft
		var i, j;
		var x, y;
		var iColour;

		this.Context.fillStyle = GRIDIROnCOLOUR.TURQUOISE;
		this.Context.fillRect(0, 0, 400, SCREEN.HEIGHT);

		x = 0;
		y = 0;
		xOffst = 0;
		for (i=0;i<=POSITION.COUNT;++i) {
	 for (j=0;j<this.Gridders[i].length;++j) {
		 this.Gridder = this.Gridders[i][j];
		 iColour = Math.floor(this.Gridder.Quality/3);
		 if (iColour>5)
			 iColour = 5;
		 this.Font = { FONT: "12px Arial", COLOUR: RosterColours[iColour] };
		 this.TextWriter.Write(SubPositions[this.Prospect.Position][this.Prospect.SubPosition], x+5, y, this.Font);
		 this.TextWriter.Write(this.Prospect.Name.GetFullName(), x+35, y, this.Font);
		 this.TextWriter.Write(this.Prospect.Experience, x+135, y, this.Font);
		 this.TextWriter.Write(Utils.NumberToGrade(this.Prospect.Quality), x+155, y, this.Font);
		 if (this.Prospect.Potential>0)
			 this.TextWriter.Write("+" + this.Prospect.Potential, x+175, y, this.Font);
		 else
			 this.TextWriter.Write(this.Prospect.Potential, x+175, y, this.Font);
		 y += 16;
		 if (y>595) {
			 x = 200;
			 y = 16;
		 }
	 }

	 //Draw separating line
	 y += 4;
	 this.GraphicsTool.DrawRectangle(x+5, y-16, 195, 2, "white", 1);
	 y += 4;
	 if (y>595) {
		 x = 200;
		 y = 16;
	 }
		}

		this.DisplayPositions(0, 4, true);
		this.DisplayPositions(5, 9, false);
};
GridironRosterNestedView.prototype.DisplayPositions = function(start, end, off) {  //start and end indicated indices of positions - this method used by ::DisplayRoster exclusively
		var i, j;
		var qlty;

		if (off)
	 this.x = 0;
		else
	 this.x = 200;
		this.y = 16;

		for (i=start;i<=end;++i) {
	 for (j=0;j<TeamView.Team.Roster.Gridders[i].length;++j) {
		 this.DisplayProspect = TeamView.Team.Roster.Gridders[i][j];
		 qlty = Math.floor(this.DisplayProspect.Quality/3);
		 if (qlty>5)
			 qlty = 5;
		 this.Font = { FONT: "12px Arial", COLOUR: RosterColours[qlty] };
		 this.TextWriter.Write(Positions[this.DisplayProspect.Position], this.x+5, this.y, this.Font);
		 this.TextWriter.Write(this.DisplayProspect.Name.GetFullName(), this.x+30, this.y, this.Font);
		 this.TextWriter.Write(this.DisplayProspect.Experience, this.x+130, this.y, this.Font);
		 this.TextWriter.Write(Utilities.NumberToGrade(this.DisplayProspect.Quality), this.x+150, this.y, this.Font);
		 if (this.DisplayProspect.Potential>0)
			 this.TextWriter.Write("+" + this.DisplayProspect.Potential, this.x+170, this.y, this.Font);
		 else
			 this.TextWriter.Write(this.DisplayProspect.Potential, this.x+170, this.y, this.Font);
		 this.y += 16;
	 }

	 //Draw separating line
	 this.y += 4;
	 this.GraphicsTool.DrawRectangle(this.x+5, this.y-16, 195, 2, "white", 1);
	 this.y += 4;
		}
};
GridironRosterNestedView.prototype.DisplayButtons = function() {

		ExecuteButton.Show();
		HikeButton.Show();
		StartGameButton.Show();
		DraftButton.Show();
		SeasonsButton.Show();
};
GridironRosterNestedView.prototype.WritePlayerInfo = function(slot, colour) {
		colour = colour || "white";
		this.TextWriter.Write(slot.Player.Name.GetFullName(), slot.X, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		if (slot.Player.Experience)
	 this.TextWriter.Write(slot.Player.Experience, slot.X+150, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		else
	 this.TextWriter.Write("R", slot.X+150, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		this.TextWriter.Write(Utilities.NumberToGrade(slot.Player.Quality), slot.X+180, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		if (slot.Player.Potential>0)
	 this.TextWriter.Write("+" + slot.Player.Potential, slot.X+210, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		else
	 this.TextWriter.Write(slot.Player.Potential, slot.X+210, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
};
GridironRosterNestedView.prototype.WriteTargetInfo = function(player, slot, colour) {

		//UNLOGGED

		colour = colour || "white";
		this.TextWriter.SwitchContext(CANVAS.ZOOM);
		this.TextWriter.Write(TeamAbbreviations[player.Team], 10, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		this.TextWriter.Write(player.Name.First[0] + " " + player.Name.Last, 40, (20*slot)+20, {FONT:"12px Arial", COLOUR:colour});
		this.TextWriter.Write(player.Experience, 140, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		this.TextWriter.Write(Utilities.NumberToGrade(player.Quality), 180, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		if (player.Potential>0)
	 this.TextWriter.Write("+" + player.Potential, 210, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		else
	 this.TextWriter.Write(player.Potential, 210, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		this.TextWriter.RestoreContext();
};
GridironRosterNestedView.prototype.DrawBasReliefSection = function(x, y, slots, bButtonless) {

		this.GraphicsTool.DrawRectangle(x, y, 280, (slots*15)+10, GREY.MEDIUM, 1);
		this.GraphicsTool.DrawRectangle(x+1, y+1, 280, (slots*15)+10, "white", 1);
		if (!bButtonless) {
	 this.Context.fillStyle = "rgb(63,191,223)";
	 this.Context.fillRect(x+6, y-1, 36, 3);
		}
};
GridironRosterNestedView.prototype.GetSlot = function() {

		for (this.i=0;this.i<this.RosterSlots.length;++this.i)
	 if (Utilities.CheckPointInBox({X: Mouse.X, Y: Mouse.Y}, {L: this.RosterSlots[this.i].X, T: this.RosterSlots[this.i].Y-15, W: 260, H: 15}))
		 return (this.RosterSlots[this.i]);
		return (null);
};
GridironRosterNestedView.prototype.SelectSlot = function(slot) {

		if (Mouse.CanvasId==CANVAS.PRIME) {
	 this.Context.fillStyle = "blue";
	 this.Context.fillRect(slot.X, slot.Y-12, 260, 15);
	 this.WritePlayerInfo(slot, "yellow");
		} else {
	 this.InfoBox.fillStyle = "blue";
	 this.InfoBox.fillRect(0, (slot*20)+5, 240, 20);
	 this.WriteTargetInfo(this.TradeTargets[slot], slot, "yellow");
		}
};
GridironRosterNestedView.prototype.DeselectSlot = function(slot) {
		if (Mouse.CanvasId==CANVAS.PRIME) {
	 this.Context.fillStyle = GREY.SILVER;
	 this.Context.fillRect(slot.X, slot.Y-12, 260, 15);
	 this.WritePlayerInfo(slot);
		} else {
	 this.InfoBox.fillStyle = GREY.SILVER;
	 this.InfoBox.fillRect(0, (slot*20)+5, 240, 20);
	 this.WriteTargetInfo(this.TradeTargets[slot], slot);
		}
};
GridironRosterNestedView.prototype.HighlightSlot = function(slot) {

		if (Mouse.CanvasId==CANVAS.PRIME) {
	 this.Context.fillStyle = GREY.SILVER;
	 this.Context.fillRect(slot.X, slot.Y-12, 260, 15);
	 this.WritePlayerInfo(slot, "blue");
		} else {
	 this.InfoBox.fillStyle = GREY.SILVER;
	 this.InfoBox.fillRect(slot.X, slot.Y-12, 240, 15);
	 this.TextWriter.SwitchContext(CANVAS.ZOOM);
	 this.WritePlayerInfo(slot, "blue");
		}
};
GridironRosterNestedView.prototype.DeHighlightSlot = function(slot) {

		if (Mouse.CanvasId==CANVAS.PRIME) {
	 this.Context.fillStyle = GREY.SILVER;
	 this.Context.fillRect(slot.X, slot.Y-12, 260, 15);
	 this.WritePlayerInfo(slot);
		} else {
	 this.InfoBox.fillStyle = GREY.SILVER;
	 this.InfoBox.fillRect(slot.X, slot.Y-12, 240, 15);
	 this.TextWriter.SwitchContext(CANVAS.ZOOM);
	 this.WritePlayerInfo(slot);
	 this.TextWriter.RestoreContext();
		}
};
GridironRosterNestedView.prototype.AppendInfoIdentifier = function(type) {

	switch (type) {
		case GRIDDER.TYPE.DIVISIONAL:
			this.Info = "÷" + this.Info;
			break;
		case GRIDDER.TYPE.INJURED:
			this.Info = "!" + this.Info;
			break;
		case GRIDDER.TYPE.SPARKER:
			this.Info = "*" + this.Info;
			break;
		case GRIDDER.TYPE.SPECIAL:
			this.Info = "$" + this.Info;
			break;
		case GRIDDER.TYPE.TEMPERAMENTAL:
			this.Info = "†" + this.Info;
			break;
		case GRIDDER.TYPE.VERSATILE:
			this.Info = "^" + this.Info;
			break;
		case GRIDDER.TYPE.VOLATILE:
			this.Info = "±" + this.Info;
			break;
		case GRIDDER.TYPE.DIMENSIONAL:
			this.Info = "½" + this.Info;
			break;
	}
};
