/*
 *  DE-LOG
 */
//---------------------------------------------------
//---------- DOMINION BOARD VIEW --------------------  //TODO: to be replaced by DominionGlobalView
var DominionBoardView = function() {
	var GraphicsTool, CalcPad, TextWriter;

	var i, j;  //scratch variables
};
DominionBoardView.prototype = new GenieView();
DominionBoardView.prototype.Set = function(cnvs, gTool, cPad, tWriter) {
	GenieView.prototype.Set.call(this, cnvs);

	this.GraphicsTool = gTool;
	this.CalcPad = cPad;
	this.TextWriter = tWriter;
	this.Controls.push(TurnButton);
	this.Controls.push(AllianceButton);
};
DominionBoardView.prototype.Open = function() {

	WorldMap.Open();
	TurnButton.Specs.LABEL = TurnButton.Specs.LABEL.replace("0", "1");		//TODO: label should show correct turn number, not just '1'
	TurnButton.Show();
	AllianceButton.Show();
	this.Update();
};
DominionBoardView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (TurnButton.CheckClicked()) {
		this.Close();

		//TODO: open office

		//TEMP
		var lSqdrn = [ { Type: JET.FIGHTER, Grade: 0 } ];
		var rSqdrn = [ { Type: JET.FIGHTER, Grade: 0 } ];
		//TEMP

		AirMissionView.SetNations(Powers[POWER.TOMCAT], Powers[POWER.HORNET]);
		AirMissionView.SetSquadrons(lSqdrn, rSqdrn);
		AirMissionView.DrawFrame();
		AirMissionView.DrawInfoBox();
		AirMissionView.DrawJets();
	}

	if (AllianceButton.CheckClicked()) {
		this.Disable();
		AllianceImage.Draw();
		AllianceView.Open();
		AllianceView.Update();
	}

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
/*
		this.State = VIEW.MAP.STATE.SELECTED;
		AddVoteButton.Show();
*/
//		AllianceButton.Show();
		for (this.i=0;this.i<ALLIED.COUNT;++this.i)
			if (AlliedStates[this.i].CheckClicked()) {
				if (AlliedStates[this.i].Alliance)
					return;
				else {
					PlayerPower.AddAlliance(AlliedStates[this.i]);
					for (this.j=0;this.j<POWER.COUNT;++this.j) {
						if (this.j==POWER.TOMCAT)
							continue;
						Powers[this.j].Update();
					WorldMap.Draw();
					}
				}
				break;
			}
	} else
		Mouse.ClearClicks();

	WorldMap.Update();
};
DominionBoardView.prototype.PerformVoteAction = function() {
	var iAction;

	//DE-LOGGED

	iAction = Math.floor((Mouse.Click.Y-(VOTeACTIONsIMAGE.Y+1))/32);
	if (Mouse.Click.X>(VOTeACTIONsIMAGE.X+128))
		++iAction;

	switch (iAction) {
		case VOTE.ADD.CONQUEST:
	 var lSqdrn = [ { Type: JET.FIGHTER, Grade: 0 } ];				//TEMP
	 var rSqdrn = [ { Type: JET.FIGHTER, Grade: 0 } ];				//TEMP
	 AirMissionView.SetNations(Powers[POWER.TOMCAT], Powers[POWER.HORNET]);
	 AirMissionView.SetSquadrons(lSqdrn, rSqdrn);
	 AirMissionView.DrawFrame();
	 AirMissionView.DrawInfoBox();
	 AirMissionView.DrawJets();
	 break;
		case VOTE.ADD.MISSION:
	 break;
		case VOTE.ADD.INTERDICTION:
	 break;
		case VOTE.ADD.SABOTAGE:
	 break;
		case VOTE.ADD.PACT:
	 break;
		case VOTE.ADD.SUBVERSION:
	 break;
		case VOTE.ADD.DEAL:
	 break;
		case VOTE.ADD.PURCHASE:
	 break;
		case VOTE.ADD.METHODS:
	 break;
	}
};
