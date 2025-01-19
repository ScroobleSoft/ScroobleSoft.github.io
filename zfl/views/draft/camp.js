/*
 *  TODO: Normal-Cautious-Intense
 *			 Normal is what is in place now
 *			 For Cautious and Intense results, the training routine is repeated until outcome averages Disappointing or Encouraging for the former,
 *				bust or brilliant for the latter
 */
//------------------------------------------------------------
//----------- TRAINING CAMP DIALOG VIEW ----------------------
var TrainingCampDialogView = function() {
	var IntenseButton, BalancedButton, CautiousButton, TrainingButtons;
	var OutcomeImage, MarkerImages;
	var TrainingType;

	var i;
};
TrainingCampDialogView.prototype = new GenieDialogView();
TrainingCampDialogView.prototype.Set = function(cnvs, specs, pView) {
	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);

	this.State = 0;
};
TrainingCampDialogView.prototype.SetControls = function() {
	GenieDialogView.prototype.SetControls.call(this);

	this.CautiousButton = new TextButton();
	this.CautiousButton.Set(this.Canvas, this.Specs.BUTTON.CAUTIOUS, this.TextWriter);
	this.CautiousButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.CautiousButton);

	this.BalancedButton = new TextButton();
	this.BalancedButton.Set(this.Canvas, this.Specs.BUTTON.BALANCED, this.TextWriter);
	this.BalancedButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.BalancedButton);
	
	this.IntenseButton = new TextButton();
	this.IntenseButton.Set(this.Canvas, this.Specs.BUTTON.INTENSE, this.TextWriter);
	this.IntenseButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.IntenseButton);

	this.TrainingButtons = new Array();
	this.TrainingButtons.push(this.CautiousButton, this.BalancedButton, this.IntenseButton);
};
TrainingCampDialogView.prototype.SetImages = function() {

	this.OutcomeImage = new GenieImage();
	this.OutcomeImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.OUTCOME);
	this.MarkerImages = new GenieImage();
	this.MarkerImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.MARKER);
};
TrainingCampDialogView.prototype.ShowControls = function() {

	this.TrainingButtons.forEach(function(btn) {btn.Show();});
	this.CautiousButton.Disable();		//TEMP
	this.IntenseButton.Disable();			//TEMP - different training options require implementation
};
TrainingCampDialogView.prototype.Open = function() {
	GenieDialogView.prototype.Open.call(this);

	this.Update();
};
TrainingCampDialogView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	switch (this.State) {
		case 0:
			for (this.i=0;this.i<this.TrainingButtons.length;++this.i)
				if (this.TrainingButtons[this.i].CheckClicked()) {
					this.TrainingType = this.i;
					setTimeout(this.RunCamp.bind(this), 100);
					++this.State;
					break;
				}
			break;
		case 1:
			if (this.OkButton.CheckClicked()) {
				League.GamesPlayed = SEASON.STATE.GAME;
				League.Dump();
				this.Close();
			}
	}
};
TrainingCampDialogView.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "white", 3);
	this.TextWriter.Write("Pick one:", 120, 140, { FONT: "bold 14pt Arial" } );
};
TrainingCampDialogView.prototype.RunCamp = function() {
	var i;
	var num;

	this.TrainingButtons.forEach(function(btn) {btn.Hide();});

	for (i=0;i<LEAGUE.TEAMS;++i)
		if (Teams[i]===PlayerTeam)
			PlayerTeam.Roster.RunTrainingCamp(this.TrainingType);
		else {
			num = this.Randomizer.GetIndex(TRAINING.METHODS);
			Teams[i].Roster.RunTrainingCamp(num);
		}

	this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, this.Specs.COLOUR, 0);
	this.GraphicsTool.DrawVerticalLine( { X: 200, Y: 40 }, 520, "white", 1);
	this.GraphicsTool.DrawVerticalLine( { X: 201, Y: 40 }, 520, GREY.MEDIUM, 1);
	this.GraphicsTool.DrawVerticalLine( { X: 400, Y: 40 }, 520, "white", 1);
	this.GraphicsTool.DrawVerticalLine( { X: 401, Y: 40 }, 520, GREY.MEDIUM, 1);

	this.DisplayQuitters();
	this.DisplayDraftees();
	this.DisplayImprovers();
	this.DisplayOutcome();

	this.OkButton.Show();
};
TrainingCampDialogView.prototype.DisplayQuitters = function() {
	var i;
	var info;

	this.TextWriter.Write("Football quitters:", 5, 20, { FONT: "bold 14pt Arial" } );
	for (i=0;i<PlayerTeam.Roster.Quitters.length;++i) {
		this.TextWriter.Write(Positions[PlayerTeam.Roster.Quitters[i].Position], 10, 50+(15*i));
		info = PlayerTeam.Roster.Quitters[i].Name.First[0] + " ";
		info += PlayerTeam.Roster.Quitters[i].Name.Last;
		this.TextWriter.Write(info, 40, 50+(15*i));
	}
	if (i==0)
		this.TextWriter.Write("None.", 10, 50);
};
TrainingCampDialogView.prototype.DisplayDraftees = function() {
	var i;
	var info;
	var nGrddr;

	this.TextWriter.Write("Drafted players:", 205, 20, { FONT: "bold 14pt Arial" } );
	nGrddr = 0;
	for (i=0;i<Draft.Picks.length;++i)
		if (Draft.Picks[i].Quality<=GRADE.Jminus) {

			//First row
			info = (Math.floor(Draft.PickNumbers[i]/LEAGUE.TEAMS)+1) + "." + ((Draft.PickNumbers[i] % LEAGUE.TEAMS)+1);
			this.TextWriter.Write(info, 205, 50+(30*nGrddr));																								//pick number
			this.TextWriter.Write(Positions[Draft.Picks[i].Position], 240, 50+(30*nGrddr));										//position
			info = Draft.Picks[i].Name.GetFullName();
			if (StringUtils.GetTextWidth(info, null, this.Context)>125) {
				info = Draft.Picks[i].Name.First[0] + " ";
				info += Draft.Picks[i].Name.Last;
			}
			this.TextWriter.Write(info, 270, 50+(30*nGrddr));																				//name

			//Second row
			this.TextWriter.SetFont("12px Arial");
			this.TextWriter.Write(Utils.NumberToGrade(Draft.Picks[i].Quality), 240, 65+(30*nGrddr));							//quality
			this.TextWriter.Write("+"+Draft.Picks[i].Potential, 258, 65+(30*nGrddr));												//training result
			this.TextWriter.Write("(+"+Draft.Picks[i].History1+")", 285, 65+(30*nGrddr));											//original potential
			this.TextWriter.Write(TrainingOutcomes[Draft.Picks[i].Status], 320, 65+(30*nGrddr));								//outcome
			this.TextWriter.ResetFont();
			++nGrddr;
		}
};
TrainingCampDialogView.prototype.DisplayImprovers = function() {  //TODO: show history, just like Draftees
	var i;
	var info;

	this.TextWriter.Write("Improvers:", 405, 20, { FONT: "bold 14pt Arial" } );
	nGrddr = 0;
	for (i=0;i<PlayerTeam.Roster.PlayerList.length;++i)
		if (PlayerTeam.Roster.PlayerList[i].Experience>0 && PlayerTeam.Roster.PlayerList[i].Experience<GRIDDER.YEARS.IMPROVER) {
			this.TextWriter.Write(Positions[PlayerTeam.Roster.PlayerList[i].Position], 410, 50+(15*nGrddr));
			info = PlayerTeam.Roster.PlayerList[i].Name.First[0] + " ";
			info += PlayerTeam.Roster.PlayerList[i].Name.Last;
			this.TextWriter.Write(info, 440, 50+(15*nGrddr));
			this.TextWriter.Write("+"+PlayerTeam.Roster.PlayerList[i].Potential, 570, 50+(15*nGrddr));
			++nGrddr;
		}
};
TrainingCampDialogView.prototype.OpenParentView = function() {

	DraftView.Close();
	Teams.forEach(function(team) {team.Roster.Trim();});
	TeamView.NestedView = RosterNestedView;
	TeamView.Open();
};
TrainingCampDialogView.prototype.DisplayOutcome = function() {
	var i;
	var y;
	var outcm;

	outcm = 0;
	for (i=0;i<Draft.Picks.length;++i)
		outcm += Draft.Picks[i].Status;
	outcm /= Draft.Picks.length;
	this.TextWriter.Write("Draft training outcome -", 10, 310);
	this.OutcomeImage.Draw();
	y = 523 - (28*Math.round(outcm/0.405));
	this.MarkerImages.DrawPatchNumber(0, 32, y);
	this.MarkerImages.DrawPatchNumber(1, 32+126, y);
};
