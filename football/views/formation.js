/*
 *  the auto select button fills in the rest of the slots, but does not alter already selected positions, (ignores if all slots are already filled)
 *
 *  ** opponent could be shown overlaid in 0.5 opacity; also a near full-screen pop-up - optionally - that shows the two formations side by side on
 *		 adjacent pitches
 *  ** arrows should be multi-coloured
 *  ** "'" and "-" need a representation
 */
//-----------------------------------------------------------
//---------- FOOTBALL FORMATION SUB VIEW --------------------
var FootballFormationSubView = function() {
	var Team, Opponent;
	var FormationIconPanel;
	var Indent;
	var HomeSlots, AwaySlots, SubSlots, PositionSelected;

	var info;				//scratch variable
};
FootballFormationSubView.prototype = new GenieNestedView();
FootballFormationSubView.prototype.Set = function(cnvs, specs, pView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, pView);

	if (Game.CheckMobile())
		this.Indent = 0;
	else
		this.Indent = 400;
	this.PositionSelected = 0;
	this.SetSlots();
};
FootballFormationSubView.prototype.SetControls = function() {

	if (!Game.CheckMobile())
		this.FormationIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.FORMATION, this.Specs.ICOnPANEL.FORMATION.IMAGE, IconCornerImages,
																			this.GraphicsTool);
};
FootballFormationSubView.prototype.ShowControls = function() {

	if (!Game.CheckMobile()) {
		OpponentCheckBox.Show();
		if (OpponentCheckBox.Checked)
			this.DisplayOpponent();
		SubsCheckBox.Show();
		if (SubsCheckBox.Checked)
			this.DisplaySubs();
		else {
			this.FormationIconPanel.Show();
			AutoSelectButton.Show();
			ClearSelectionsButton.Show();
		}
	}
};
FootballFormationSubView.prototype.SetSlots = function() {  //TODO: no room for subs, so they'll be in Control Panel (pop-up window for mobile)
	var i;

	this.HomeSlots = ArrayUtils.Create(MATCH.PLAYERS, GenieRect);
	this.HomeSlots.forEach(function(slot){slot.W = FrontFootballerSprite.Specs.W; slot.H = FrontFootballerSprite.Specs.H;})
	this.AwaySlots = ArrayUtils.Create(MATCH.PLAYERS, GenieRect);
	this.AwaySlots.forEach(function(slot){slot.W = FrontFootballerSprite.Specs.W; slot.H = FrontFootballerSprite.Specs.H;})
	this.SubSlots = ArrayUtils.Create(MATCH.SUBS, GenieRect);
	for (i=0;i<MATCH.SUBS;++i) {
		this.SubSlots[i].L = this.Indent + 5 + (200*Math.floor(i/4));
		this.SubSlots[i].T = 75 + (30*(i % 4));
		this.SubSlots[i].W = 190;
		this.SubSlots[i].H = 25;
	}
};
FootballFormationSubView.prototype.Open = function() {

	this.Team.Squad.SyncArrays();		//maybe REDUNDANT
	this.RecolourSprite();

	GenieNestedView.prototype.Open.call(this);

	if (Game.CheckMobile()) {
		this.InfoView.Open();
		this.ConsoleView.Open();
	}

	this.Update();
};
FootballFormationSubView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdateClick();

	//Check if formation has changed
	if (!Game.CheckMobile())
		if (this.FormationIconPanel.CheckMouseDown()) {
			 this.SetFormation(this.FormationIconPanel.DepressedIcon);
			 this.Draw();
		}

	//Checkboxes

	//Update buttons
	if (!Game.CheckMobile()) {
		if (AutoSelectButton.CheckClicked())
			this.AutoSelect();
		if (ClearSelectionsButton.CheckClicked()) {
		}
	}

	this.InfoView.Update();  //REDUNDANT? if so, clear zoom canvas clicks
	this.ConsoleView.Update();
};
FootballFormationSubView.prototype.Close = function() {
	GenieNestedView.prototype.Close.call(this);

	if (Game.CheckMobile()) {
		this.InfoView.Close();
		this.ConsoleView.Close();
	}
};
FootballFormationSubView.prototype.Draw = function() {

	this.DrawPitch();
	this.DisplayPlayers();
	this.DisplayDecals();
	this.DisplayNames();
	this.DisplayGrades();
};
FootballFormationSubView.prototype.SetTeam = function(team) {

	this.Team = team;
	this.SetSlotPositions();
	if (Game.CheckMobile())
		this.ConsoleView.FormationIconPanel.DepressedIcon = this.Team.Formation;
	else
		this.FormationIconPanel.DepressedIcon = this.Team.Formation;
};
FootballFormationSubView.prototype.SetOpponent = function(team) {

	//UNLOGGED

	this.Opponent = team;
	//-eventually, sprite will have to be re-coloured to display it
};
FootballFormationSubView.prototype.SetFormation = function(frmtn) {

	this.Team.SetFormation(frmtn);
	this.SetSlotPositions();
};
FootballFormationSubView.prototype.SetSlotPositions = function() {
	var i;

	//Starter positions
	this.HomeSlots[0].L = this.Indent + 190;
	if (Game.CheckMobile())
		this.HomeSlots[0].T = 380;
	else
		this.HomeSlots[0].T = 430;
	for (i=1;i<MATCH.PLAYERS;++i) {
		this.HomeSlots[i].L = this.Indent + 10 + 16 + (41*(1+FormationZones[this.Team.Formation][i][1]));
		this.HomeSlots[i].T = 438 - (41*(3+FormationZones[this.Team.Formation][i][0]));
	}
};
FootballFormationSubView.prototype.AutoSelect = function() {

		//UNLOGGED

};
FootballFormationSubView.prototype.DrawPitch = function() {

	if (Game.CheckMobile())
		PitchImage.DrawPatch(0, 0, 0, 200, 400, 400);	//HARD-CODED
	else
		PitchImage.DrawPatch(405, 30, 5, 190, 390, 410);	//HARD-CODED
};
FootballFormationSubView.prototype.DisplayPlayers = function() {
	var i;

	for (i=0;i<MATCH.PLAYERS;++i) {
		this.RecolourSpriteComplexion(i);
		FrontFootballerSprite.Draw(this.HomeSlots[i].L, this.HomeSlots[i].T, 0);
		FrontHairSprite.Draw(this.HomeSlots[i].L+SIDeVIEwFOOTBALLER.HAIR.FRONT.X, this.HomeSlots[i].T+SIDeVIEwFOOTBALLER.HAIR.FRONT.Y,
									this.Team.Starters[i].GetHairColour());
		if (!this.Team.Starters[i].CheckMale())
			HairBunSprite.Draw(this.HomeSlots[i].L+SIDeVIEwFOOTBALLER.BUN.X, this.HomeSlots[i].T+SIDeVIEwFOOTBALLER.BUN.Y,
									 this.Team.Starters[i].GetHairColour());
	}
//	 HomeTopDownPlayers[i].Draw();
/*
	 if (HomeSideViewPlayers[i].Unit) {
//		 HomeSideViewPlayers[i].ReColour();
		 HomeSideViewPlayers[i].ExecuteDraw();
	 } else
		 FrontFootballerSprite.DrawWireframe(HomeSideViewPlayers[i].ScreenCoords.X, HomeSideViewPlayers[i].ScreenCoords.Y, 2);
*/
};
FootballFormationSubView.prototype.RecolourSprite = function(iPlyr) {
	var i;

	for (i=0;i<FrontFootballerSprite.Specs.GS[0].length;++i)
		switch (FrontRecolouring[i]) {
			case 0:
				FrontFootballerSprite.MultiShapes[0][i].Colour = TeamColours[this.Team.Index][0];
				break;
			case 1:
				FrontFootballerSprite.MultiShapes[0][i].Colour = TeamColours[this.Team.Index][1];
				break;
			case 2:
				FrontFootballerSprite.MultiShapes[0][i].Colour = TeamColours[this.Team.Index][2];
				break;
		}
};
FootballFormationSubView.prototype.RecolourSpriteComplexion = function(iPlyr) {
	var i;

	for (i=0;i<FrontFootballerSprite.Specs.GS[0].length;++i)
		if (FrontRecolouring[i]==3)
//			FrontFootballerSprite.Specs.GS[0][i].COLOUR = Complexions[this.Team.Starters[iPlyr].GetComplexion()];
			FrontFootballerSprite.MultiShapes[0][i].Colour = Complexions[this.Team.Starters[iPlyr].GetComplexion()];
};
FootballFormationSubView.prototype.DisplayDecals = function() {
	var i;

	for (i=0;i<MATCH.PLAYERS;++i) {
		this.GraphicsTool.DrawCircle(this.HomeSlots[i].L-17, this.HomeSlots[i].T-18, 15, "rgb(255,255,000)", 0);
		AcronymImages.DrawPatchNumber(Formations[this.Team.Formation][i], this.HomeSlots[i].L-29, this.HomeSlots[i].T-22);
		if (i==this.PositionSelected)
			this.GraphicsTool.DrawCircle(this.HomeSlots[i].L-17, this.HomeSlots[i].T-18, 16, "red", 3);
	}
};
FootballFormationSubView.prototype.DisplayNames = function() {
	var i, j;
	var num;
	var info;

	for (i=0;i<MATCH.PLAYERS;++i)
		if (this.Team.Starters[i]) {
	/*
			 this.info = Utils.NumberToGrade(this.Team.Starters[i].Quality) + " " + this.Team.Starters[i].Name.Last;
			 this.TextWriter.Write(this.info, this.HomeSlots[i].L-35, this.HomeSlots[i].T+15, null, { FONT: "10px Arial" } );
	*/
			for (j=0;j<this.Team.Starters[i].Name.Last.length;++j) {
				info = this.Team.Starters[i].Name.Last.toLowerCase();
				num = info.charCodeAt(j) - 97;
//				SmallLetterImages.DrawPatchNumber(num, this.HomeSlots[i].L+(6*j)-32, this.HomeSlots[i].T+1);
				MediumLetterImages.DrawPatchNumber(num, this.HomeSlots[i].L+(6*j)-32, this.HomeSlots[i].T+2);
			}
	}
};
FootballFormationSubView.prototype.DisplayGrades = function() {
	var i;
	var num;

	for (i=0;i<MATCH.PLAYERS;++i)
		if (this.Team.Starters[i]) {
			num = Math.floor(this.Team.Starters[i].Quality/3);
			MediumLetterImages.DrawPatchNumber(num, this.HomeSlots[i].L+25, this.HomeSlots[i].T-30);
			num = this.Team.Starters[i].Quality % 3;
			switch (num) {
				case 0:
					PlusImage.Draw(this.HomeSlots[i].L+32, this.HomeSlots[i].T-29);
					break;
				case 2:
					MinusImage.Draw(this.HomeSlots[i].L+32, this.HomeSlots[i].T-27);
					break;
			}
	}
};
FootballFormationSubView.prototype.DisplaySubs = function() {  //TODO: these will now be in the Control Panel
	var i;

	this.TextWriter.Write("Substitutes:", this.Indent + 5, 460, { FONT: "14px Arial bold" } );		//title

	for (i=0;i<MATCH.SUBS;++i) {
		this.GraphicsTool.DrawRectangle(this.SubSlots[i].L, this.SubSlots[i].T, this.SubSlots[i].W, 25, "rgb(080,240,097)", 0);
		if (this.Subs[i]) {
			//-draw round push-pin head (images of these have to be created cloche style) . . . for now a circle is being drawn as a substitute
			this.GraphicsTool.DrawCircle(this.SubSlots[i].L+15, this.SubSlots[i].T+15, 10, TeamColours[this.Team.Index][0], 0);
			this.TextWriter.Write(Positions[this.SubSlots[i].Unit.Position], this.SubSlots[i].L+30, this.SubSlots[i].T+20);
			this.TextWriter.Write(this.SubSlots[i].Unit.Name.Last, this.SubSlots[i].L+60, this.SubSlots[i].T+20);
			this.TextWriter.Write(Utils.NumberToGrade(this.SubSlots[i].Unit.Quality), this.SubSlots[i].L+170, this.SubSlots[i].T+20);
		}
	}
};
FootballFormationSubView.prototype.UpdateClick = function() {
	var i;

	//Check if a starting position was clicked on
	for (i=0;i<MATCH.PLAYERS;++i) {
		if (SpaceUtils.CheckPointInCircle(Mouse.Click, { X: this.HomeSlots[i].L-17, Y: this.HomeSlots[i].T-18 }, 15))
			break;
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.HomeSlots[i]))
			break;
	}
	if (i==MATCH.PLAYERS)
		return;

	//Select the new position
	if (i!=this.PositionSelected)
		this.PositionSelected = i;
	else
		return;

	//TODO: from here on it forks for mobile/tablet
/* NOTE: this logic is for Tablet
	//Check if player is available for selection
	if (this.Team.Squad.Players[SquadView.SelectedSlot].Injury || this.CheckPlayerSelected(this.Team.Squad.Players[SquadView.SelectedSlot])) {
		//TODO: activate no entry sign OR launch an alert declaring player already selected
		return;
	}

	HomeSideViewPlayers[i].Unit = this.Team.Squad.Players[SquadView.SelectedSlot];
	this.Team.FormationStarters[this.Team.Formation][i] = this.Team.Squad.Players[SquadView.SelectedSlot];
	this.Draw();

	//Check if a substitute slot was clicked
	for (i=0;i<MATCH.SUBS;++i) {
	}
*/
	this.Draw();
	this.InfoView.ColourScape();
	this.InfoView.Draw();
};
FootballFormationSubView.prototype.CheckPlayerSelected = function(plyr) {
		var i;

		for (i=0;i<MATCH.PLAYERS;++i)
			if (this.Team.Starters[i]==plyr)
				return (true);
		if (!Game.CheckMobile())
			for (i=0;i<MATCH.SUBS;++i)
				if (this.Subs[this.Team.Formation][i]==plyr)
					return (true);

		return (false);
};
FootballFormationSubView.prototype.DisplayOpponent = function() {

};
