
//----------------------------------------------------------
//---------- GRIDIRON GRIDDER INFO VIEW --------------------  UNLOGGED
var GridironGridderInfoView = function() {
	var TradeButton, CancelButton, TradeRadioOptions;
	var DemoteButton, CutButton, TradeButton;
	var MarkButton, UnmarkButton;
	var ViewsIconPanel;  //TODO: have to create
	var JerseyPolygon;
	var EyeImages, PupilImages, NoseImage, MouthImage;
	var Id;				//REDUNDANT?
	var Gridder;
	var TradeValue;
	var Offset;
};
GridironGridderInfoView.prototype = new GenieSubView();
GridironGridderInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.State = this.Specs.STATE.END;
};
GridironGridderInfoView.prototype.SetData = function() {

	this.JerseyPolygon = [ { X: 52, Y: 72 }, { X: 82, Y: 87 }, { X: 82, Y: 102 }, { X: 18, Y: 102 }, { X: 18, Y: 87 }, { X: 51, Y: 72 } ];
	if (Game.CheckPhone())
		this.Offset = 0;
	else
		this.Offset = 90;
};
GridironGridderInfoView.prototype.SetImages = function() {

	this.EyeImages = new GenieImage();
	this.EyeImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.EYE);
	this.PupilImages = new GenieImage();
	this.PupilImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PUPIL);
	this.NoseImage = new GenieImage();
	this.NoseImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.NOSE);
	this.MouthImage = new GenieImage();
	this.MouthImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.MOUTH);
};
GridironGridderInfoView.prototype.SetControls = function() {

	this.DemoteButton = new TextButton();
	this.DemoteButton.Set(this.Canvas, this.Specs.BUTTON.DEMOTE, Text);
	this.DemoteButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.DemoteButton);

	this.CutButton = new TextButton();
	this.CutButton.Set(this.Canvas, this.Specs.BUTTON.CUT, Text);
	this.CutButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CutButton);

	this.MarkButton = this.SetTextButton(this.Specs.BUTTON.MARK, RaisedCornerImages, Text);
	this.UnmarkButton = this.SetTextButton(this.Specs.BUTTON.UnMARK, RaisedCornerImages, Text);

	this.TradeButton = new TextButton();
	this.TradeButton.Set(this.Canvas, this.Specs.BUTTON.TRADE, Text);
	this.TradeButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.TradeButton);

	this.CancelButton = new TextButton();
	this.CancelButton.Set(this.Canvas, this.Specs.BUTTON.CANCEL, Text);
	this.CancelButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CancelButton);

	this.TradeRadioOptions = new GenieRadioControls();
	this.TradeRadioOptions.Set(this.Canvas, this.Specs.RADIO.TRADE, RadioOptionImage);
	this.TradeRadioOptions.SetLinks(null, Text);
	this.Controls.push(this.TradeRadioOptions);
};
GridironGridderInfoView.prototype.ShowControls = function() {

	switch (this.State) {
		case this.Specs.STATE.TRADE:
			this.TradeButton.Show();
			break;
		case this.Specs.STATE.PREVIEW:
			this.MarkButton.Show();
			this.UnmarkButton.Show();
			break;
		case this.Specs.STATE.SEASON:
			this.DemoteButton.Show();
			this.CutButton.Show();
			break;
		case this.Specs.STATE.DRAFT:
		case this.Specs.STATE.END:
			break;
	}
/*
	if (League.GamesPlayed>SEASON.STATE.END && League.GamesPlayed<=SEASON.DEADLINE) {
		this.TradeButton.Show();
		this.TradeRadioOptions.Show();
	}
	this.DemoteButton.Show();
	this.CutButton.Show();
*/
	if (Game.CheckPC())
		this.ViewsIconPanel.Show();
};
GridironGridderInfoView.prototype.SetGridder = function(grddr) {

	this.Gridder = grddr;
};
GridironGridderInfoView.prototype.ResetGridder = function(grddr) {

	this.SetGridder(grddr);
	this.ColourScape();
	this.Draw();
	this.ShowControls();
};
GridironGridderInfoView.prototype.Update = function() {  //UNLOGGED

	if ( this.State==this.Specs.STATE.DRAFT || this.State==this.Specs.STATE.END )
		return;

	if (this.TradeButton.CheckClicked()) {
		if (this.TradeRadioOptions.Selected==0) {		//trade for player
			this.TradeButton.DeActivate();
			TeamView.Disable();
			TradeConsoleView.SetGridder(this.Gridder);
			TradeConsoleView.Open();
		} else
			this.TradeForPick();
	}

	if (this.DemoteButton.CheckClicked()) {
		var x = 0;
	}

	if (this.CutButton.CheckClicked()) {
		var x = 0;
	}

	if (this.MarkButton.CheckClicked()) {
		this.MainView.Prospects[(VIEW.PROSPECTS.ENTRIES*this.MainView.Page)+this.MainView.Slot].Experience = -1;
		this.MainView.ColourScape();
		this.MainView.Draw();
	}

	if (this.UnmarkButton.CheckClicked()) {
		this.MainView.Prospects[(VIEW.PROSPECTS.ENTRIES*this.MainView.Page)+this.MainView.Slot].Experience = 0;
		this.MainView.ColourScape();
		this.MainView.Draw();
	}
};
GridironGridderInfoView.prototype.Draw = function() {

	Graphics.SetContext(this.Context);
	Graphics.DrawBasReliefSection(this.Offset+1.5, 1.5, 195, 230);
	this.DisplayGridderInfo();
	Graphics.ResetContext();
};
GridironGridderInfoView.prototype.TradeForPick = function() {
	var val;
	var tIndx;
	var round;

	//Get draft value
	val = this.Gridder.GetTradeValue();
	if (val==-1)
		return;

	//Determine trading team
	if (val==18)
		tIndx = Randomizer.GetInRange(0, 31);
	else {
		switch (val % 3) {
			case 0:
				tIndx = Randomizer.GetInRange(0, 10);
				break;
			case 1:
				tIndx = Randomizer.GetInRange(11, 20);
				break;
			case 2:
				tIndx = Randomizer.GetInRange(21, 31);
				break;
		 }
	}

	//Check if pick is already team's - if so, take next pick
	if (tIndx==TeamView.Team.Index) {
		if (tIndx==31)
			--tIndx;
		else
			++tIndx;
	}

	//Send player, acquire pick
	Teams[tIndx].Roster.AddGridder(TeamView.Team.Roster.RemoveGridder(this.Gridder));
	if (val==18)
		round = 7;
	else
		round = Math.floor(val/3) + 1;
	info = Positions[this.Gridder.Position] + " " + this.Gridder.Name.Last + " traded to ";
	info += TeamAbbreviations[tIndx] + " for Round " + round + " Pick " + (tIndx+1);
	alert(info);
	tIndx += 32*(round-1);
	Draft.SelectionOrder[tIndx] = TeamView.Team.Index;

	RosterView.SelectedSlot = RosterView.RosterSlots[0];
	RosterView.Open();
};
GridironGridderInfoView.prototype.UpdateClick = function() {
		//-at the moment an empty dummy function, but could find a use for it
};
GridironGridderInfoView.prototype.DisableControls = function() {		//TODO: DemoteButton has to be squeezed in

	TradeButton.Disable();
	TradeRadioOptions.Disable();
//		ViewsIconPanel.Disable();
};
GridironGridderInfoView.prototype.EnableControls = function() {

	TradeButton.Enable();
	TradeRadioOptions.Enable();
	ViewsIconPanel.Enable();
};
GridironGridderInfoView.prototype.DisplayGridderInfo = function() {
	var games;
	var info;

	//TODO: scale gridder name if it doesn't fit (keep scaling down in a loop until it does)

	Text.SetContext(this.Context);

	//Mugshot
	if (this.Gridder.Appearance!=null)	//TODO: this safety check will be removed once all saved teams have this field filled
		this.DrawMugshot();

	Text.SetFont( "bold 18px Arial" );

	//Name and vitals
	Text.Write(this.Gridder.Name.GetFullName(), this.Offset+13, 25);
	Text.Write(Positions[this.Gridder.Position], this.Offset+90, 50);
	info = Utils.NumberToGrade(this.Gridder.Quality);
	info[0] = info.toUpperCase()[0];
	Text.Write(info, this.Offset+130, 50);
	if (this.Gridder.Potential>0)
		Text.Write("+"+this.Gridder.Potential, this.Offset+165, 50);
	else
		Text.Write(this.Gridder.Potential, this.Offset+165, 50);
	Text.Write(SubPositions[this.Gridder.Position][this.Gridder.SubPosition], this.Offset+90, 75, { FONT: "bold 14px Arial" } );
	Text.Write(this.Gridder.Experience, this.Offset+170, 75);
	Text.Write("Stats: None", this.Offset+90, 100);

	Text.ResetFont();
	Text.SetFont( "12px Arial" );

	//Draft info
	Text.Write("Round:", this.Offset+13, 140, { STYLE: FONT.STYLE.UNDERLINED } );
	Text.Write("Pick:", this.Offset+88, 140, { STYLE: FONT.STYLE.UNDERLINED } );
	if (this.Gridder.Drafted==-1) {
		Text.Write("N/A", this.Offset+63, 140);
		Text.Write("Unknown", this.Offset+138, 140);
	} else if (this.Gridder.Drafted==0) {
		Text.Write("N/A", this.Offset+63, 140);
		Text.Write("Undrafted", this.Offset+138, 140);
	} else {
		info = Math.ceil(this.Gridder.Drafted/LEAGUE.TEAMS);
		Text.Write(info, this.Offset+63, 140);
		info = (this.Gridder.Drafted % LEAGUE.TEAMS);
		Text.Write(info, this.Offset+138, 140);
	}

	Text.ResetFont();

	Text.Write("Injury Status:", this.Offset+13, 122);
	if (League.CheckInSeason()) {
		if (this.Gridder.CheckInjured()) {
			games = this.Gridder.GetLayoff();
			Text.Write(games + " games", this.Offset+98, 120);
		}
	} else
		Text.Write("Clear", this.Offset+98, 122);

	Text.Write("Salary:", this.Offset+13, 200);

//	Text.Write("Strengths", 105, 135, { FONT: "10px Arial", STYLE: FONT.STYLE.UNDERLINED } );
//	Text.Write("Weaknesses", 170, 135, { FONT: "10px Arial", STYLE: FONT.STYLE.UNDERLINED } );

	//Trade value . . . TODO: all this can move to a ::GetTradeValueFormatted function in Gridder (or could break this method into sub-routines)
	this.TradeValue = this.Gridder.GetTradeValue(League.GamesPlayed);
	if (this.State==this.Specs.STATE.TRADE) {
	if (this.TradeValue!=-1) {
			if (this.TradeValue==18) info = "	";						//a seventh round pick
			else if ((this.TradeValue % 3)==0) info = "High ";
			else if ((this.TradeValue % 3)==1) info = "Mid ";
			else if ((this.TradeValue % 3)==2) info = "Low ";
			info += Math.floor(this.TradeValue/3) + 1;
			Text.Write("Trade value: "+info, this.Offset+13, 228);
		} else {
			Text.Write("Trade value: None", this.Offset+13, 228);
//			if (this.TradeButton.CheckVisible())
//				this.TradeButton.Disable();
		}
	} else
		Text.Write("Trade value: Irrelevant", this.Offset+13, 228);

	Text.ResetContext();
};
GridironGridderInfoView.prototype.DrawMugshot = function() {
	var num;
	var colour;

	//TODO: would like to draw background for top half teams, but this wouldn't look so good for bottom half ones

	Graphics.DrawRectangle(this.Offset+13, 35, 72, 72, "white", 0);	//background

	//Jersey
	if (this.Gridder.Team) {
		if (this.Gridder.Team.Index<(LEAGUE.TEAMS/2))
			colour = TeamColours[0][this.Gridder.Team.Index];
		else
			colour = TeamColours[1][this.Gridder.Team.Index-(LEAGUE.TEAMS/2)];
	} else
		colour = GREY.MEDIUM;
	Graphics.DrawPolygon(this.Offset, 0, this.JerseyPolygon, colour, 0)

	//Face and hair
	num = (this.Gridder.Appearance & 0b111000000)/64;
	colour = ZFLHairColours[num];
	Graphics.DrawCircle(this.Offset+49.5, 67, 24, colour, 0);			//hair
	num = (this.Gridder.Appearance & 0b000111000)/8;
	colour = ZFLComplexions[num];
	Graphics.DrawCircle(this.Offset+49.5, 75, 21, colour, 0);			//skin
	//TODO: eyebrows - may need colour2

	//Features
	this.EyeImages.DrawPatchNumber(0, this.Offset+35, 67);				//left eye
	num = this.Gridder.Appearance & 0b000000111;
	this.PupilImages.DrawPatchNumber(num, this.Offset+38, 68);			//left pupil
	this.EyeImages.DrawPatchNumber(0, this.Offset+51, 67);				//right eye
	this.PupilImages.DrawPatchNumber(num, this.Offset+54, 68);			//right pupil
	this.NoseImage.Draw(this.Offset+46, 73);									//nose
	this.MouthImage.Draw(this.Offset+43, 86);									//mouth

	Graphics.DrawRectangle(this.Offset+13, 35, 72, 72, "black", 5);	//frame
};
