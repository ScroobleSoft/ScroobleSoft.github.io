
//------------------------------------------------------------
//---------- FOOTBALL FORMATION INFO VIEW --------------------
var FootballFormationInfoView = function() {
	var Candidates;

	var slot, indx;
};
FootballFormationInfoView.prototype = new GenieSubView();
FootballFormationInfoView.prototype.Set = function(cnvs, specs, pView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, pView);

	if (Game.CheckMobile())
		this.Candidates = ArrayUtils.Create(SQUAD.SIZE+YOUTH.PLAYERS-SQUAD.SLOTS.GK, function() {var Footballer, Quality, SelectedFlag;} );
};
FootballFormationInfoView.prototype.SetControls = function() {  //UNLOGGED - REDUNDANT?

//	if (Game.CheckMobile())
//		this.SymbolIconPanel = this.SetIconPanel(this.Specs.ICOnPANEL.SYMBOLS, this.Specs.ICOnPANEL.SYMBOLS.IMAGE, this.Specs.ICOnPANEL.SYMBOLS.BEVEL);
};
FootballFormationInfoView.prototype.Update = function() {

	if (Mouse.CheckLeftClicked(CANVAS.INFO)) {

		//Make sure a slot is clicked on
		if ( Mouse.Click.X<5 || Mouse.Click.Y<5 || Mouse.Click.X>235 || Mouse.Click.Y>235 )
			return;
		if (this.MainView.PositionSelected==POSITION.GK)
			if (Mouse.Click.X>115)
				return;
		if (Mouse.Click.X>115 && Mouse.Click.X>125)
			return;

		//Select player
		this.slot = Math.floor((Mouse.Click.Y-5)/15);
		if (Mouse.Click.X>125)
			this.slot += 15;
//		if (this.Candidates[this.slot].SelectedFlag)
		this.indx = this.MainView.Team.Starters.indexOf(this.Candidates[this.slot].Footballer);
		if (this.indx!=-1)
			this.MainView.Team.Starters[this.indx] = null;
		this.MainView.Team.Starters[this.MainView.PositionSelected] = this.Candidates[this.slot].Footballer;
//		this.MainView.Team.FormationStarters[this.MainView.Team.Formation][this.MainView.PositionSelected] = this.Candidates[this.slot].Player;
		this.MainView.Draw();
		this.Candidates[this.slot].Selected = true;
		this.ColourScape();
		this.Draw();
	}
};
FootballFormationInfoView.prototype.Draw = function() {  //position, last name, projected grade
	var i;

	this.GraphicsTool.SetContext(this.Context);
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("10px Arial");
	this.TextWriter.SetColour("white");

	//Table grid
	this.GraphicsTool.DrawGrid(15, 5, { W: 100, H: 230, R: 15, LW: { FRAME: 4, PARTITION: 2 }, COLOUR: "blue" } );

	if (this.MainView.PositionSelected==POSITION.GK) {
		for (i=0;i<this.MainView.Team.Squad.Goalkeepers.length;++i) {
			this.TextWriter.Write(Positions[this.MainView.Team.Squad.Goalkeepers[i].Position], 20, 17+(15*i));
			this.TextWriter.Write(this.MainView.Team.Squad.Goalkeepers[i].Name.Last, 47, 17+(15*i));
			this.TextWriter.Write(Utils.NumberToGrade(this.MainView.Team.Squad.Goalkeepers[i].Quality), 97, 17+(15*i));
		}
		//TODO: youth team keepers
	} else {
		this.RankCandidates();
		this.GraphicsTool.DrawGrid(135, 5, { W: 100, H: 230, R: 15, LW: { FRAME: 4, PARTITION: 2 }, COLOUR: "blue" } );		//2nd column
		for (i=0;i<this.Candidates.length;++i) {
			if (i==30)
				break;
			if (this.Candidates[i].Footballer) {
				if (i<15) {
					if (this.Candidates[i].SelectedFlag)
						this.GraphicsTool.DrawCircle(8, 13+(15*i), 5, "blue", 0);
					this.TextWriter.Write(Positions[this.Candidates[i].Footballer.Position], 20, 17+(15*i));
					this.TextWriter.Write(this.Candidates[i].Footballer.Name.Last, 47, 17+(15*i));
					this.TextWriter.Write(Utils.NumberToGrade(this.Candidates[i].Quality), 97, 17+(15*i));
				} else {
					if (this.Candidates[i].SelectedFlag)
						this.GraphicsTool.DrawCircle(133, 13+(15*i), 5, "blue", 0);
					this.TextWriter.Write(Positions[this.Candidates[i].Footballer.Position], 140, 17+(15*(i-15)));
					this.TextWriter.Write(this.Candidates[i].Footballer.Name.Last, 167, 17+(15*(i-15)));
					this.TextWriter.Write(Utils.NumberToGrade(this.Candidates[i].Quality), 217, 17+(15*(i-15)));
				}
			}
		}
	}

	this.TextWriter.ResetFont();
	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();
	this.GraphicsTool.ResetContext();
};
FootballFormationInfoView.prototype.RankCandidates = function() {
	var i;
	var nFtblr;
	var pos;

	//TODO: use internal function

	//Select every outfield player
	nFtblr = 0;
	for (i=0;i<this.Candidates.length;++i)
		if (i<SQUAD.SIZE) {
			if (!this.MainView.Team.Squad.Players[i])		//SAFETY CHECK: squad sizes can be less than max
				continue;
			if (this.MainView.Team.Squad.Players[i].Position!=POSITION.GK) {
				this.Candidates[nFtblr].Footballer = this.MainView.Team.Squad.Players[i];
				pos = this.Candidates[nFtblr].Footballer.Position;
				distance = Math.abs(PositionZones[pos][0][0]-PositionZones[Formations[this.MainView.Team.Formation][this.MainView.PositionSelected]][0][0]);
				distance += Math.abs(PositionZones[pos][0][1]-PositionZones[Formations[this.MainView.Team.Formation][this.MainView.PositionSelected]][0][1]);
				this.Candidates[nFtblr].Quality = this.Candidates[nFtblr].Footballer.Quality + distance;
				if (this.MainView.Team.Starters.includes(this.Candidates[nFtblr].Footballer))
					this.Candidates[nFtblr].SelectedFlag = false;
				++nFtblr;
			}
		} else {
			if (!this.MainView.Team.YouthTeam.Players[i-YOUTH.PLAYERS])		//SAFETY CHECK: youth team can be less than max
				continue;
			if (this.MainView.Team.YouthTeam.Players[i-YOUTH.PLAYERS].Position!=POSITION.GK) {
				this.Candidates[nFtblr].Footballer = this.MainView.Team.YouthTeam.Players[i-YOUTH.PLAYERS];
				pos = this.Candidates[nFtblr].Footballer.Position;
				distance = Math.abs(PositionZones[pos][0][0]-PositionZones[Formations[this.MainView.Team.Formation][this.MainView.PositionSelected]][0][0]);
				distance += Math.abs(PositionZones[pos][0][1]-PositionZones[Formations[this.MainView.Team.Formation][this.MainView.PositionSelected]][0][1]);
				this.Candidates[nFtblr].Quality = this.Candidates[nFtblr].Footballer.Quality + distance;
				if (this.MainView.Team.Starters.includes(this.Candidates[nFtblr].Footballer))
					this.Candidates[nFtblr].SelectedFlag = false;
				++nFtblr;
			}
		}

	//Fill empty cells
	for (i=nFtblr;i<(SQUAD.SIZE+YOUTH.PLAYERS-SQUAD.SLOTS.GK);++i)
		this.Candidates[i].Footballer = null;

	this.Candidates.sort(function(a, b) {return a.Quality-b.Quality;});
};
