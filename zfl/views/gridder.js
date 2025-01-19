
//-----------------------------------------------------
//---------- ZFL GRIDDER INFO VIEW --------------------
var ZFLGridderInfoView = function() {
	var Mode;
	var TradeButton, CancelButton, TradeRadioOptions;
	var DemoteButton, CutButton, TradeButton;
	var JerseyPolygon;
	var EyeImages, PupilImages, NoseImage, MouthImage;
	var Id;				//REDUNDANT?
	var Gridder;
	var TradeValue;
};
ZFLGridderInfoView.prototype = new GenieNestedView();
ZFLGridderInfoView.prototype.Set = function(cnvs, specs, pView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, pView);

	this.Mode = this.Specs.MODE.ROSTER;
};
ZFLGridderInfoView.prototype.SetData = function() {

	this.JerseyPolygon = [ { X: 142, Y: 72 }, { X: 172, Y: 87 }, { X: 172, Y: 102 }, { X: 109, Y: 102 }, { X: 109, Y: 87 }, { X: 141, Y: 72 } ];
};
ZFLGridderInfoView.prototype.SetImages = function() {

	this.EyeImages = new GenieImage();
	this.EyeImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.EYE);
	this.PupilImages = new GenieImage();
	this.PupilImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PUPIL);
	this.NoseImage = new GenieImage();
	this.NoseImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.NOSE);
	this.MouthImage = new GenieImage();
	this.MouthImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.MOUTH);
};
ZFLGridderInfoView.prototype.SetControls = function() {

	this.DemoteButton = new TextButton();
	this.DemoteButton.Set(this.Canvas, this.Specs.BUTTON.DEMOTE, this.TextWriter);
	this.DemoteButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.DemoteButton);

	this.CutButton = new TextButton();
	this.CutButton.Set(this.Canvas, this.Specs.BUTTON.CUT, this.TextWriter);
	this.CutButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CutButton);

	this.TradeButton = new TextButton();
	this.TradeButton.Set(this.Canvas, this.Specs.BUTTON.TRADE, this.TextWriter);
	this.TradeButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.TradeButton);

	this.CancelButton = new TextButton();
	this.CancelButton.Set(this.Canvas, this.Specs.BUTTON.CANCEL, this.TextWriter);
	this.CancelButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CancelButton);

	this.TradeRadioOptions = new GenieRadioControls();
	this.TradeRadioOptions.Set(this.Canvas, this.Specs.RADIO.TRADE, RadioOptionImage);
	this.TradeRadioOptions.SetLinks(null, this.TextWriter);
	this.Controls.push(this.TradeRadioOptions);
};
ZFLGridderInfoView.prototype.SetMode = function(mode) {

	this.Mode = mode;
};
ZFLGridderInfoView.prototype.ShowControls = function() {

	if (League.GamesPlayed>SEASON.STATE.END && League.GamesPlayed<=SEASON.DEADLINE) {
		this.TradeButton.Show();
		this.TradeRadioOptions.Show();
	}
	this.DemoteButton.Show();
	this.CutButton.Show();
};
ZFLGridderInfoView.prototype.SetGridder = function(grddr) {

	this.Gridder = grddr;
};
ZFLGridderInfoView.prototype.ResetGridder = function(grddr) {

	this.SetGridder(grddr);
/*
		this.InfoBox.fillStyle = NFLcOLOUR.TURQUOISE;
		this.InfoBox.fillRect(100, 10, 190, 224);
		this.DisplayGridderInfo();
*/
	this.ColourScape();
	if (this.Mode==this.Specs.MODE.ROSTER)
		this.ShowControls();
	this.Draw();
};
ZFLGridderInfoView.prototype.Update = function() {  //UNLOGGED

	if (this.Mode==this.Specs.MODE.DRAFT)
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
};
ZFLGridderInfoView.prototype.Draw = function() {

	//Box frame
	this.Context.lineWidth = 1;
	this.Context.strokeStyle = GREY.MEDIUM;
	this.Context.strokeRect(95.5, 5.5, 200-1, 230-1);
	this.Context.strokeStyle = "white";
	this.Context.strokeRect(95.5+1, 5.5+1, 200-1, 230-1);

	if (this.Gridder)
		this.DisplayGridderInfo();
};
ZFLGridderInfoView.prototype.TradeForPick = function() {
	var val;
	var tIndx;
	var round;

	//Get draft value
	val = this.Gridder.GetTradeValue();
	if (val==-1)
		return;

	//Determine trading team
	if (val==18)
		tIndx = this.Randomizer.GetInRange(0, 31);
	else {
		switch (val % 3) {
			case 0:
				tIndx = this.Randomizer.GetInRange(0, 10);
				break;
			case 1:
				tIndx = this.Randomizer.GetInRange(11, 20);
				break;
			case 2:
				tIndx = this.Randomizer.GetInRange(21, 31);
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

	RosterNestedView.SelectedSlot = RosterNestedView.RosterSlots[0];
	RosterNestedView.Open();
};
ZFLGridderInfoView.prototype.UpdateClick = function() {
		//-at the moment an empty dummy function, but could find a use for it
};
ZFLGridderInfoView.prototype.DisableControls = function() {		//TODO: DemoteButton has to be squeezed in

	TradeButton.Disable();
	TradeRadioOptions.Disable();
//		ViewsIconPanel.Disable();
};
ZFLGridderInfoView.prototype.EnableControls = function() {

	TradeButton.Enable();
	TradeRadioOptions.Enable();
	ViewsIconPanel.Enable();
};
ZFLGridderInfoView.prototype.DisplayGridderInfo = function() {
	var games;
	var info;

	//TODO: scale gridder name if it doesn't fit (keep scaling down in a loop until it does)

	this.TextWriter.SetContext(this.Context);

	//Mugshot
	if (this.Gridder.Appearance!=null)	//TODO: this safety check will be removed once all saved teams have this field filled
		this.DrawMugshot();

	this.TextWriter.SetFont( "bold 18px Arial" );

	//Name and vitals
	this.TextWriter.Write(this.Gridder.Name.GetFullName(), 105, 25);
	this.TextWriter.Write(Positions[this.Gridder.Position], 185, 50);
	info = Utils.NumberToGrade(this.Gridder.Quality);
	info[0] = info.toUpperCase()[0];
	this.TextWriter.Write(info, 225, 50);
	if (this.Gridder.Potential>0)
		this.TextWriter.Write("+"+this.Gridder.Potential, 260, 50);
	else
		this.TextWriter.Write(this.Gridder.Potential, 260, 50);
	this.TextWriter.Write(SubPositions[this.Gridder.Position][this.Gridder.SubPosition], 185, 75, { FONT: "bold 14px Arial" } );
	this.TextWriter.Write(this.Gridder.Experience, 265, 75);
	this.TextWriter.Write("Stats: None", 185, 100);

	this.TextWriter.ResetFont();
	this.TextWriter.SetFont( "12px Arial" );

	//Draft info
	this.TextWriter.Write("Round:", 105, 140, { STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Pick:", 180, 140, { STYLE: FONT.STYLE.UNDERLINED } );
	if (this.Gridder.Drafted==-1) {
		this.TextWriter.Write("N/A", 155, 140);
		this.TextWriter.Write("Unknown", 230, 140);
	} else if (this.Gridder.Drafted==0) {
		this.TextWriter.Write("N/A", 155, 140);
		this.TextWriter.Write("Undrafted", 230, 140);
	} else {
		info = Math.ceil(this.Gridder.Drafted/LEAGUE.TEAMS);
		this.TextWriter.Write(info, 155, 140);
		info = (this.Gridder.Drafted % LEAGUE.TEAMS);
		this.TextWriter.Write(info, 230, 140);
	}

	this.TextWriter.ResetFont();

	this.TextWriter.Write("Injury Status:", 105, 122);
	if (League.CheckInSeason()) {
		if (this.Gridder.CheckInjured()) {
			games = this.Gridder.GetLayoff();
			this.TextWriter.Write(games + " games", 190, 120);
		}
	} else
		this.TextWriter.Write("Clear", 190, 122);

	this.TextWriter.Write("Salary:", 105, 200);

//	this.TextWriter.Write("Strengths", 105, 135, { FONT: "10px Arial", STYLE: FONT.STYLE.UNDERLINED } );
//	this.TextWriter.Write("Weaknesses", 170, 135, { FONT: "10px Arial", STYLE: FONT.STYLE.UNDERLINED } );

	//Trade value . . . TODO: all this can move to a ::GetTradeValueFormatted function in Gridder (or could break this method into sub-routines)
	this.TradeValue = this.Gridder.GetTradeValue(League.GamesPlayed);
	if (this.Mode==this.Specs.MODE.ROSTER) {
	if (this.TradeValue!=-1) {
			if (this.TradeValue==18) info = "	";						//a seventh round pick
			else if ((this.TradeValue % 3)==0) info = "High ";
			else if ((this.TradeValue % 3)==1) info = "Mid ";
			else if ((this.TradeValue % 3)==2) info = "Low ";
			info += Math.floor(this.TradeValue/3) + 1;
			this.TextWriter.Write("Trade value: "+info, 105, 228);
		} else {
			this.TextWriter.Write("Trade value: None", 105, 228);
			if (this.TradeButton.CheckVisible())
				this.TradeButton.Disable();
		}
	} else
		this.TextWriter.Write("Trade value: Irrelevant", 105, 228);

	this.TextWriter.ResetContext();
};
ZFLGridderInfoView.prototype.DrawMugshot = function() {
	var num;
	var colour;

	//TODO: would like to draw background for top half teams, but this wouldn't look so good for bottom half ones

	this.Context.clearRect(105, 35, 72, 72);

	this.GraphicsTool.SetContext(this.Context);

	//Jersey
	if (this.Gridder.Team) {
		if (this.Gridder.Team.Index<(LEAGUE.TEAMS/2))
			colour = TeamColours[0][this.Gridder.Team.Index];
		else
			colour = TeamColours[1][this.Gridder.Team.Index-(LEAGUE.TEAMS/2)];
	} else
		colour = GREY.MEDIUM;
	this.GraphicsTool.DrawPolygon(0, 0, this.JerseyPolygon, colour, 0)

	//Face and hair
	num = (this.Gridder.Appearance & 0b111000000)/64;
	colour = ZFLHairColours[num];
	this.GraphicsTool.DrawCircle(141.5, 67, 24, colour, 0);			//hair
	num = (this.Gridder.Appearance & 0b000111000)/8;
	colour = ZFLComplexions[num];
	this.GraphicsTool.DrawCircle(141.5, 75, 21, colour, 0);			//skin
	//TODO: eyebrows - may need colour2

	//Features
	this.EyeImages.DrawPatchNumber(0, 127, 67);							//left eye
	num = this.Gridder.Appearance & 0b000000111;
	this.PupilImages.DrawPatchNumber(num, 130, 68);						//left pupil
	this.EyeImages.DrawPatchNumber(0, 143, 67);							//right eye
	this.PupilImages.DrawPatchNumber(num, 146, 68);						//right pupil
	this.NoseImage.Draw(138, 73);												//nose
	this.MouthImage.Draw(135, 86);											//mouth

	//Frame
	this.GraphicsTool.DrawRectangle(105, 35, 72, 72, "black", 5);
	this.GraphicsTool.RestoreContext();
};
