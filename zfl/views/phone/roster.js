
//----------------------------------------------------
//---------- GRIDIRON ROSTER VIEW --------------------  UNLOGGED
var GridironRosterView = function() {
	var OffDefIconPanel, ViewsIconPanel;
	var PositionButtons, UpButton, DownButton;
	var Roster;
	var Gridder, Prospect;
	var Slot, SelectedSlot, TopSlot, Slots;

	var Info;
	var Font;
	var RosterSlots;
	var TradeValue, TradeTargets, TradePartners;		//last is am array of team indices picked randomly
	var Symbols, Types;

	var Id;

	var i, x, y;
};
GridironRosterView.prototype = new GenieView();
GridironRosterView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Id = VIEW.TEAM.SUB.ROSTER;
	this.State = this.Specs.STATE.PReSEASON;
	this.SetSlots();
	this.TradePartners = new Array();
	this.Symbols = [ "÷","½","!","*","$","†","^","±" ];
	this.Types = [ "divisional","dimensional","injured","sparker","special","temperamental","versatile","volatile" ];
};
GridironRosterView.prototype.SetControls = function() {
	var i;
	var specs;

	this.PositionButtons = ArrayUtils.Create(POSITION.COUNT, TextButton);
	for (i=0;i<POSITION.COUNT;++i) {		//NOTE: L and T have to be set dynamically before drawing
		specs = { L: this.Specs.BUTTON.POSITIONS.L, T: this.Specs.BUTTON.POSITIONS.T, W: this.Specs.BUTTON.POSITIONS.W, H: this.Specs.BUTTON.POSITIONS.H,
					 LW: this.Specs.BUTTON.POSITIONS.LW, COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, LABEL: Positions[i], STYLE: BUTTON.STYLE.SHALLOW,
					 BACKGROUND: this.Specs.BUTTON.POSITIONS.BACKGROUND };
		this.PositionButtons[i].Set(this.Canvas, specs, Text);
		this.PositionButtons[i].SetCornersPic(ShallowCornerImages);
		this.Controls.push(this.PositionButtons[i]);
	}

	if (Game.CheckPhone()) {
		this.OffDefIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.OFFDEF, this.Specs.ICOnPANEL.OFFDEF.IMAGE, IconCornersImage, Graphics,
																																				ImageManager.Pics[IMAGeINDEX.CONTROLS] );
		this.Controls.push(ViewsIconPanel);
		this.UpButton = this.SetImageButton(this.Specs.BUTTON.UP, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
		this.DownButton = this.SetImageButton(this.Specs.BUTTON.DOWN, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	}
};
GridironRosterView.prototype.ShowControls = function() {

	if (Game.CheckPhone()) {
		this.ShowPositionButtons();
		this.ShowArrowButtons();
		this.OffDefIconPanel.Show();
		ViewsIconPanel.Show();
		return;
	}

	GenieView.prototype.ShowControls.call(this);
};
GridironRosterView.prototype.ShowPositionButtons = function() {
	var i;

	if (this.OffDefIconPanel.DepressedIcon==0) {
		for (i=0;i<POSITION.COUNT/2;++i)
			this.PositionButtons[i].Show();
		this.Slots = this.Roster.GetOffPlayers();
	} else {
		for (i=POSITION.COUNT/2;i<POSITION.COUNT;++i)
			this.PositionButtons[i].Show();
		this.Slots = this.Roster.GetDefPlayers();
	}
};
GridironRosterView.prototype.ShowArrowButtons = function() {

	if (this.TopSlot==0) {
		if (this.Slots>this.Specs.PHONE.SLOTS)
			this.DownButton.Show();
	} else
			this.UpButton.Show();
};
GridironRosterView.prototype.SetSlots = function() {

	this.RosterSlots = new GenieArray();
	this.RosterSlots.Set(ROSTER.SLOTS, function() { var X, Y, Player; } );
	this.SurplusSlots = 0;
	this.SelectedSlot = 0;
	this.TopSlot = 0;
};
GridironRosterView.prototype.SetRoster = function(rstr) {

	this.Roster = rstr;
};
GridironRosterView.prototype.Open = function() {

	if (this.OffDefIconPanel.DepressedIcon==0)
		this.Gridder = this.Roster.GetFirstOffPlayer();
	else
		this.Gridder = this.Roster.GetFirstDefPlayer();

	this.SetInfoView(GridderInfoView);
	this.InfoView.SetGridder(this.Gridder);

	this.SetPositionButtons();

	GenieView.prototype.Open.call(this);
};
GridironRosterView.prototype.Update = function() {  //LOGGED

	if (Game.CheckPhone())
		this.UpdatePhone();

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdateSlot();
};
GridironRosterView.prototype.UpdatePhone = function() {  //LOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.UpdatePhone.bind(this));

	if (this.OffDefIconPanel.CheckIconChanged()) {

		this.PositionButtons.forEach( function(btn) {btn.Hide();} );
		Graphics.DrawRectangle(0, 20, 295, SCREEN.HEIGHT-20, this.Specs.COLOUR, 0);
		this.SelectedSlot = 0;
		this.TopSlot = 0;
		this.DrawPhoneRoster();
		this.ShowPositionButtons();
		this.ShowArrowButtons();
		this.ResetArrowButtons();
	}

	this.UpdateArrowButtons();

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdatePhoneSlot();

	this.InfoView.Update();
	this.ConsoleView.Update();
};
GridironRosterView.prototype.UpdateSlot = function() {

	//UNLOGGED

	this.Slot = this.GetSlot();
	if (this.Slot) {
/*
	 this.InfoBox.fillStyle = GREY.LIGHT;
	 this.InfoBox.fillRect(0, 210, SCREEN.WIDTH, 30);
	 Text.SwitchContext(CANVAS.ZOOM);
	 Text.Write(this.Slot.Player.Name.GetFullName(), 5, 230);
	 this.TradeValue = this.Slot.Player.GetTradeValue(League.GamesPlayed);
	 if (this.TradeValue) {
		 if (this.TradeValue==18) this.Info = "	";
		 else if ((this.TradeValue % 3)==0) this.Info = "High ";
		 else if ((this.TradeValue % 3)==1) this.Info = "Mid ";
		 else if ((this.TradeValue % 3)==2) this.Info = "Low ";
		 this.Info += Math.floor(this.TradeValue/3) + 1;
		 Text.Write("Trade value: "+this.Info, 120, 230);
	 } else
		 Text.Write("Trade value: None", 110, 230);
	 Text.RestoreContext();
*/
		if (this.Slot!=this.SelectedSlot) {
			this.SelectedSlot = this.Slot;
			this.ColourScape();
			this.Draw();
			GridderInfoView.ResetGridder(this.SelectedSlot.Player);
/*
			 if (this.ConsoleView.Id==VIEW.ROSTER.TRADE) {
				 TradeSubSubView.SetGridder(this.SelectedSlot.Player);
				 TradeTargetPagination.Draw();
			 }
*/
		}
	}
};
GridironRosterView.prototype.UpdatePhoneSlot = function() {  //LOGGED
	var h;

	//Determine how many slots are visible
	if (this.OffDefIconPanel.DepressedIcon==0)
		nSlots = this.Roster.GetOffPlayers();
	else
		nSlots = this.Roster.GetDefPlayers();
	nSlots = (nSlots>25) ? 25 : nSlots;
	h = 15 * nSlots;

	//Check if clicked outside slots area
	if ( Mouse.Click.X<37 || Mouse.Click.Y<24 || Mouse.Click.X>292 || Mouse.Click.Y>(24+h) )
		return;

	//Get slot clicked
	this.SelectedSlot = this.TopSlot + Math.floor((Mouse.Click.Y-24)/15);

	Graphics.DrawRectangle(0, 20, 295, SCREEN.HEIGHT-20, this.Specs.COLOUR, 0);
	this.PositionButtons.forEach( function(btn) {btn.Hide();} );
	this.DrawPhoneRoster();
	this.ShowPositionButtons();
/* should be REDUNDANT
	if (this.OffDefIconPanel.DepressedIcon==0)
		this.Roster.GetOffGridder(this.SelectedSlot);
	else
		this.Roster.GetDefGridder(this.SelectedSlot);
*/
	GridderInfoView.ResetGridder(this.RosterSlots[this.SelectedSlot].Player);
};
GridironRosterView.prototype.UpdateArrowButtons = function() {  //LOGGED

	if (this.UpButton.CheckClicked()) {
		--this.TopSlot;
		++this.SelectedSlot;
		if (this.SelectedSlot==this.Specs.PHONE.SLOTS) {
			--this.SelectedSlot;
			GridderInfoView.ResetGridder(this.RosterSlots[this.SelectedSlot].Player);
		}
		this.DrawPhoneRoster();
		if (this.TopSlot==0)
			this.UpButton.Hide();
		this.DownButton.Show();
	}

	if (this.DownButton.CheckClicked()) {
		++this.TopSlot;
		--this.SelectedSlot;
		if (this.SelectedSlot==-1) {
			++this.SelectedSlot;
			GridderInfoView.ResetGridder(this.RosterSlots[this.SelectedSlot].Player);
		}
		this.DrawPhoneRoster();
		if (this.TopSlot==1)
			this.UpButton.Show();
		if (this.Slots-this.TopSlot==this.Specs.PHONE.SLOTS)
			this.DownButton.Hide();
	}
};
GridironRosterView.prototype.ResetArrowButtons = function() {  //UNLOGGED

	if (this.OffDefIconPanel.DepressedIcon==0)
		this.Slots = this.Roster.GetOffPlayers();
	else
		this.Slots = this.Roster.GetDefPlayers();

	this.UpButton.Hide();
	this.DownButton.Hide();

	this.ShowArrowButtons();
};
GridironRosterView.prototype.ClickedOn = function() {  //REDUNDANT?

	this.Slot = this.GetSlot();
	if (this.Slot) {
		this.SelectedSlot = this.Slot;
		Graphics.DrawRectangle(0, 20, 295, 280, this.Specs.COLOUR, 0);
		this.Draw();
		this.ShowButtons();
	}
};
GridironRosterView.prototype.Draw = function() {  //UNLOGGED

	if (Game.CheckPhone()) {
		Text.Write("Roster", 7, 20, { FONT: "18px Arial", STYLE: FONT.STYLE.BOLD } );		//heading
		this.DrawPhoneRoster();
		this.DrawPhoneKey();
	} else
		this.DrawLaptop();
};
GridironRosterView.prototype.DrawPhoneRoster = function() {  //LOGGED - also sets slots
	var i, j, y;
	var start, end;
	var qlty;
	var iSlot, hSlots;		//h- hidden

	//Position backgrounds
	if (this.OffDefIconPanel.DepressedIcon==0)
		this.DrawBackgrounds(0);
	else
		this.DrawBackgrounds(POSITION.COUNT/2);

	//Adjust for scrimmage side
	y = 35;
	if (this.OffDefIconPanel.DepressedIcon==0) {
		start = 0;
		end = POSITION.COUNT / 2;
	} else {
		start = POSITION.COUNT / 2;
		end = POSITION.COUNT;
	}

	//Display players
	iSlot = 0;
	hSlots = 0;
	for (i=start;i<end;++i) {
		for (j=0;j<this.Roster.Gridders[i].length;++j) {

			//Skip slots that have scrolled off up top
			if (hSlots<this.SelectedSlot) {
				++hSlots;
				continue
			}

			//Set font colour
			qlty = Math.floor(this.Roster.Gridders[i][j].Quality/3);
			if (qlty>5)
				qlty = 5;
			this.Font = { FONT: "bold 12px Arial", COLOUR: RosterColours[qlty] };

			//Show slot band
			if (this.SelectedSlot==iSlot) {
				this.Context.fillStyle = RosterColours[qlty];
				this.Context.fillRect(35, y-11, 256, 15);
				this.Font.COLOUR = (qlty==4) ? "black" : "white";	//NOTE: switching to black on yellow since white on yellow is illegible
			}

			//Write name
			if (this.Roster.Gridders[i][j].Type) {
				this.Info = this.Roster.Gridders[i][j].Name.GetFullName();
				this.AppendInfoIdentifier(this.Roster.Gridders[i][j].Type);
				Text.Write(this.Info, 40, y, this.Font);
			} else
				Text.Write(this.Roster.Gridders[i][j].Name.GetFullName(), 40, y, this.Font);

			//Display position
			this.Font.FONT = "bold 10px Arial";
			Text.Write(SubPositions[this.Roster.Gridders[i][j].Position][this.Roster.Gridders[i][j].SubPosition], 170, y, this.Font);
			this.Font.FONT = "bold 12px Arial";

			//Display Quality and Potential
			Text.Write(this.Roster.Gridders[i][j].Experience, 205, y, this.Font);
			Text.Write(Utils.NumberToGrade(this.Roster.Gridders[i][j].Quality), 230, y, this.Font);
			if (this.Roster.Gridders[i][j].Potential>=10)
				Text.Write("+"+this.Roster.Gridders[i][j].Potential, 249, y, this.Font);
			else if (this.Roster.Gridders[i][j].Potential>0)
				Text.Write("+"+this.Roster.Gridders[i][j].Potential, 255, y, this.Font);
			else if (this.Roster.Gridders[i][j].Potential<0)
				Text.Write(this.Roster.Gridders[i][j].Potential, 258, y, this.Font);
			else
				Text.Write(this.Roster.Gridders[i][j].Potential, 262, y, this.Font);

			//Display Injury Status
			if (League.GamesPlayed>=0)
				if (this.Roster.Gridders[i][j].CheckInjured())
					Text.Write("I", 280, y, this.Font);

			//Set slot
			this.RosterSlots[iSlot].X = 35;
			this.RosterSlots[iSlot].Y = y - 10;
			this.RosterSlots[iSlot].Player = this.Roster.Gridders[i][j];

			y += 15;
			++iSlot;
			if (iSlot==this.Specs.PHONE.SLOTS) {
				Graphics.DrawBasReliefSection(0, 21, 292, 377);
				break;
			}
		}
	}

	Graphics.DrawBasReliefSection(0, 21, 292, 377);
};
GridironRosterView.prototype.DrawPhoneKey = function() {
	var i;

//	Text.Write("key:  ÷divisional	°dimensional	!injured	*sparker	$special", 310, 273, { FONT: "12px Arial", COLOUR: "white" } );
//	Text.Write("†temperamental	^versatile	±volatile", 205, 26, { FONT: "12px Arial", COLOUR: "white" } );
//	Text.Write("key:", 335, 195, { FONT: "12px Arial", COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
	for (i=0;i<this.Types.length;++i) {
		Text.Write(this.Symbols[i], 300, 220+(15*i), { FONT: "12px Arial", COLOUR: "white" } );
		Text.Write(this.Types[i], 315, 220+(15*i), { FONT: "12px Arial", COLOUR: "white" } );
	}
};
GridironRosterView.prototype.SetPositionButtons = function() {
	var i;

	for (i=0;i<POSITION.COUNT/2;++i) {
		this.PositionButtons[i].Specs.L = 4;
		this.PositionButtons[i].Specs.T = (i==0) ? 25 : this.PositionButtons[i-1].Specs.T + (15*this.Roster.Gridders[i-1].length);
		this.PositionButtons[i+(POSITION.COUNT/2)].Specs.L = 4;
		this.PositionButtons[i+(POSITION.COUNT/2)].Specs.T = (i==0) ? 25 : this.PositionButtons[i+(POSITION.COUNT/2)-1].Specs.T +
																								(15*this.Roster.Gridders[(i+(POSITION.COUNT/2))-1].length);
	}
};
GridironRosterView.prototype.DrawBackgrounds = function(start) {
	var i;
	var h;

	for (i=start;i<(start+(POSITION.COUNT/2));++i) {
		h = 15 * this.Roster.Gridders[i].length;
		if (i % 2)
			Graphics.DrawRectangle(0, this.PositionButtons[i].Specs.T-1, 292, h, InterfaceColours[3], 0);
		else
			Graphics.DrawRectangle(0, this.PositionButtons[i].Specs.T-1, 292, h, InterfaceColours[4], 0);
	}
};
GridironRosterView.prototype.DrawLaptop = function() {
	var i, j;
	var x, y;
	var nSlots, nSlotsAssigned;

	//Heading
	Text.Write("Roster", 135, 20, { FONT: "18px Arial", STYLE: FONT.STYLE.BOLD } );
	Text.Write("key:  ÷divisional	°dimensional	!injured	*sparker	$special", 270, 12, { FONT: "12px Arial", COLOUR: "white" } );
	Text.Write("†temperamental	^versatile	±volatile", 395, 26, { FONT: "12px Arial", COLOUR: "white" } );

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
				Text.Write(this.Info, x, y, this.Font);
			} else
				Text.Write(this.RosterSlots[pIndex].Player.Name.GetFullName(), x, y, this.Font);

			//Display position
			this.Font.FONT = "bold 10px Arial";
			Text.Write(SubPositions[this.RosterSlots[pIndex].Player.Position][this.RosterSlots[pIndex].Player.SubPosition], x+145, y, this.Font);
			this.Font.FONT = "bold 12px Arial";

			//Display Quality and Potential
			Text.Write(this.RosterSlots[pIndex].Player.Experience, x+180, y, this.Font);
			Text.Write(Utils.NumberToGrade(this.RosterSlots[pIndex].Player.Quality), x+205, y, this.Font);
			if (this.RosterSlots[pIndex].Player.Potential>=10)
				Text.Write("+"+this.RosterSlots[pIndex].Player.Potential, x+224, y, this.Font);
			else if (this.RosterSlots[pIndex].Player.Potential>0)
				Text.Write("+"+this.RosterSlots[pIndex].Player.Potential, x+230, y, this.Font);
			else if (this.RosterSlots[pIndex].Player.Potential<0)
				Text.Write(this.RosterSlots[pIndex].Player.Potential, x+233, y, this.Font);
			else
				Text.Write(this.RosterSlots[pIndex].Player.Potential, x+237, y, this.Font);

			//Display Injury Status
			if (League.GamesPlayed>=0)
				if (this.RosterSlots[pIndex].Player.CheckInjured())
					Text.Write("I", x+255, y, this.Font);

			++pIndex;
		}
};
GridironRosterView.prototype.ListGridders = function() {	//NOTE: used in draft
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
		 Text.Write(SubPositions[this.Prospect.Position][this.Prospect.SubPosition], x+5, y, this.Font);
		 Text.Write(this.Prospect.Name.GetFullName(), x+35, y, this.Font);
		 Text.Write(this.Prospect.Experience, x+135, y, this.Font);
		 Text.Write(Utils.NumberToGrade(this.Prospect.Quality), x+155, y, this.Font);
		 if (this.Prospect.Potential>0)
			 Text.Write("+" + this.Prospect.Potential, x+175, y, this.Font);
		 else
			 Text.Write(this.Prospect.Potential, x+175, y, this.Font);
		 y += 16;
		 if (y>595) {
			 x = 200;
			 y = 16;
		 }
	 }

	 //Draw separating line
	 y += 4;
	 Graphics.DrawRectangle(x+5, y-16, 195, 2, "white", 1);
	 y += 4;
	 if (y>595) {
		 x = 200;
		 y = 16;
	 }
		}

		this.DisplayPositions(0, 4, true);
		this.DisplayPositions(5, 9, false);
};
GridironRosterView.prototype.DisplayPositions = function(start, end, off) {  //start and end indicated indices of positions - this method used by ::DisplayRoster exclusively
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
		 Text.Write(Positions[this.DisplayProspect.Position], this.x+5, this.y, this.Font);
		 Text.Write(this.DisplayProspect.Name.GetFullName(), this.x+30, this.y, this.Font);
		 Text.Write(this.DisplayProspect.Experience, this.x+130, this.y, this.Font);
		 Text.Write(Utilities.NumberToGrade(this.DisplayProspect.Quality), this.x+150, this.y, this.Font);
		 if (this.DisplayProspect.Potential>0)
			 Text.Write("+" + this.DisplayProspect.Potential, this.x+170, this.y, this.Font);
		 else
			 Text.Write(this.DisplayProspect.Potential, this.x+170, this.y, this.Font);
		 this.y += 16;
	 }

	 //Draw separating line
	 this.y += 4;
	 Graphics.DrawRectangle(this.x+5, this.y-16, 195, 2, "white", 1);
	 this.y += 4;
		}
};
GridironRosterView.prototype.DisplayButtons = function() {

		ExecuteButton.Show();
		HikeButton.Show();
		StartGameButton.Show();
		DraftButton.Show();
		SeasonsButton.Show();
};
GridironRosterView.prototype.WritePlayerInfo = function(slot, colour) {
		colour = colour || "white";
		Text.Write(slot.Player.Name.GetFullName(), slot.X, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		if (slot.Player.Experience)
	 Text.Write(slot.Player.Experience, slot.X+150, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		else
	 Text.Write("R", slot.X+150, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		Text.Write(Utilities.NumberToGrade(slot.Player.Quality), slot.X+180, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		if (slot.Player.Potential>0)
	 Text.Write("+" + slot.Player.Potential, slot.X+210, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
		else
	 Text.Write(slot.Player.Potential, slot.X+210, slot.Y, { FONT: "12px Arial", COLOUR: colour } );
};
GridironRosterView.prototype.WriteTargetInfo = function(player, slot, colour) {

		//UNLOGGED

		colour = colour || "white";
		Text.SwitchContext(CANVAS.ZOOM);
		Text.Write(TeamAbbreviations[player.Team], 10, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		Text.Write(player.Name.First[0] + " " + player.Name.Last, 40, (20*slot)+20, {FONT:"12px Arial", COLOUR:colour});
		Text.Write(player.Experience, 140, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		Text.Write(Utilities.NumberToGrade(player.Quality), 180, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		if (player.Potential>0)
	 Text.Write("+" + player.Potential, 210, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		else
	 Text.Write(player.Potential, 210, (20*slot)+20, { FONT: "12px Arial", COLOUR: colour } );
		Text.RestoreContext();
};
GridironRosterView.prototype.DrawBasReliefSection = function(x, y, slots, bButtonless) {

		Graphics.DrawRectangle(x, y, 280, (slots*15)+10, GREY.MEDIUM, 1);
		Graphics.DrawRectangle(x+1, y+1, 280, (slots*15)+10, "white", 1);
		if (!bButtonless) {
	 this.Context.fillStyle = "rgb(63,191,223)";
	 this.Context.fillRect(x+6, y-1, 36, 3);
		}
};
GridironRosterView.prototype.GetSlot = function() {

	for (this.i=0;this.i<this.RosterSlots.length;++this.i)
		if (Utilities.CheckPointInBox({X: Mouse.X, Y: Mouse.Y}, {L: this.RosterSlots[this.i].X, T: this.RosterSlots[this.i].Y-15, W: 260, H: 15}))
			return (this.RosterSlots[this.i]);

	return (null);
};
GridironRosterView.prototype.SelectSlot = function(slot) {

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
GridironRosterView.prototype.DeselectSlot = function(slot) {
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
GridironRosterView.prototype.HighlightSlot = function(slot) {

		if (Mouse.CanvasId==CANVAS.PRIME) {
	 this.Context.fillStyle = GREY.SILVER;
	 this.Context.fillRect(slot.X, slot.Y-12, 260, 15);
	 this.WritePlayerInfo(slot, "blue");
		} else {
	 this.InfoBox.fillStyle = GREY.SILVER;
	 this.InfoBox.fillRect(slot.X, slot.Y-12, 240, 15);
	 Text.SwitchContext(CANVAS.ZOOM);
	 this.WritePlayerInfo(slot, "blue");
		}
};
GridironRosterView.prototype.DeHighlightSlot = function(slot) {

		if (Mouse.CanvasId==CANVAS.PRIME) {
	 this.Context.fillStyle = GREY.SILVER;
	 this.Context.fillRect(slot.X, slot.Y-12, 260, 15);
	 this.WritePlayerInfo(slot);
		} else {
	 this.InfoBox.fillStyle = GREY.SILVER;
	 this.InfoBox.fillRect(slot.X, slot.Y-12, 240, 15);
	 Text.SwitchContext(CANVAS.ZOOM);
	 this.WritePlayerInfo(slot);
	 Text.RestoreContext();
		}
};
GridironRosterView.prototype.AppendInfoIdentifier = function(type) {

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
GridironRosterView.prototype.LaunchFADialog = function() {

	TeamFAsDialogView.SetRoster(this.Roster);
	TeamFAsDialogView.Open();
};
GridironRosterView.prototype.LaunchRetirementDialog = function() {

	Teams.forEach(function(team) {team.StartNewSeason();});
	League.GamesPlayed = SEASON.STATE.START;
	this.State = VIEW.ROSTER.STATE.PReDRAFT;
	GridderInfoView.State = VIEW.GRIDDER.STATE.TRADE;	
	this.Controls.forEach( function(cntrl) {cntrl.Disable();} );
	RetirementDialogView.SetRoster(this.Roster);
	RetirementDialogView.Open();
};
GridironRosterView.prototype.OpenDraftView = function() {

	Teams.forEach(function(team){team.PracticeSquad.PromoteAll();});
	Teams.forEach(function(team){team.GenerateDraftProfile();});
	Teams.forEach(function(team){team.EvaluateNeeds();});
	League.GamesPlayed = SEASON.STATE.DRAFT;
	this.State = VIEW.ROSTER.STATE.SEASON;
	GridderInfoView.State = VIEW.GRIDDER.STATE.DRAFT;
	DraftView.SetDraft(Draft);
	DraftView.SetRoster(this.Roster);
	this.Close(this.LaunchDraftView.bind(this), 100);
};
GridironRosterView.prototype.LaunchDraftView = function() {

	DraftView.Open();
	DraftView.Update();
};
GridironRosterView.prototype.OpenSeasonView = function() {  //TEMP only - UNLOGGED
//	var iTeam;
	var aTeams;
	var i, nTeams;
/*
	do {
		iTeam = Random.GetIndex(LEAGUE.TEAMS);
	} while (PlayerTeam.Index==iTeam);
*/
	aTeams = new Array(SEASON.GAMES+1);
	Random.GetUniqueIndices(aTeams, SEASON.GAMES+1, LEAGUE.TEAMS);
	nTeams = 0;
	for (i=0;i<(SEASON.GAMES+1);++i) {
		if (aTeams[i]!=PlayerTeam.Index) {
			PlayerTeam.Schedule[nTeams] = aTeams[i];
			++nTeams;
		}
		if (nTeams==SEASON.GAMES)
			break;
	}

	this.Close(this.LaunchSeasonView.bind(this), 100);
};
GridironRosterView.prototype.LaunchSeasonView = function() {  //TEMP only - UNLOGGED

	SeasonView.Open();
	SeasonView.Update();
};
