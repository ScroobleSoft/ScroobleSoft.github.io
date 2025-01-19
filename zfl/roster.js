
//-----------------------------------------------
//---------- GRIDIRON ROSTER --------------------
var GridironRoster = function() {
	var Randomizer;

	var Team;
	var Gridders;							//array of arrays by postion
	var PositionDistribution;			//used in roster generation
	var GridderCount;						//used in roster trimming
	var PlayerList;						//1-D array regardless of position, used in assigning injuries, listing projects . . . generate before use
	var RetiredPlayers, Quitters;
	var CumulativeInjuries;
};
GridironRoster.prototype = {
	Set(rGenerator, team) {
		this.Randomizer = rGenerator;
		this.Team = team;

		this.CumulativeInjuries = 0;
		this.SetLists();
	},
	SetLists() {
		var i;
		var aGrddrs;

		this.Gridders = new Array(POSITION.COUNT);
		for (i=0;i<POSITION.COUNT;++i) {
			aGrddrs = new Array();
			this.Gridders[i] = aGrddrs;
		}
		this.PlayerList = new Array();
		this.RetiredPlayers = new Array();
		this.Quitters = new Array();
	},
	CreateGridder(pos) {
		var gridder;

		switch (pos) {
	 case POSITION.QB:
		 gridder = new Quarterback();
		 break;
	 case POSITION.RB:
		 gridder = new RunningBack();
		 break;
	 case POSITION.WR:
		 gridder = new WideReceiver();
		 break;
	 case POSITION.TE:
		 gridder = new TightEnd();
		 break;
	 case POSITION.OL:
		 gridder = new OffensiveLineman();
		 break;
	 case POSITION.DE:
		 gridder = new DefensiveEnd();
		 break;
	 case POSITION.DT:
		 gridder = new DefensiveTackle();
		 break;
	 case POSITION.LB:
		 gridder = new Linebacker();
		 break;
	 case POSITION.S:
		 gridder = new Safety();
		 break;
	 case POSITION.CB:
		 gridder = new Cornerback();
		 break;
		}

		gridder.Set(this.Randomizer, this.Team);
		gridder.Generate();

		return (gridder);
	},
	GenerateImprovers() {  //REDUNDANT?
		var i, j;
		var position;
		var batch;
		var gridder;

		//Generate prospects profiles from all previous drafts
		for (i=0;i<(GRIDDER.YEARS.IMPROVER*DRAFT.ROUNDS);++i) {			//ASSUMPTION: average of 7 picks for each team
			position = this.Randomizer.GetSlot(PositionDistribution);
			gridder = this.CreateGridder(position);
			batch = this.Randomizer.GetSlot(DraftBatchDistribution);
			switch (batch) {
				case 0:		//Normal prospects
					gridder.Type = GRIDDER.TYPE.NORMAL;
					gridder.Value = this.Randomizer.GetSlot(DraftValueDistribution);
					gridder.Quality = this.Randomizer.GetInRange(15, gridder.Value+15);
					gridder.Potential = gridder.Quality - gridder.Value;
					break;
				case 1:		//Fringe prospects
					gridder.Type = GRIDDER.TYPE.NORMAL;
					gridder.Value = this.Randomizer.GetInRange(15, 20);
					gridder.Quality = this.Randomizer.GetInRange(gridder.Value+1, 29);
					gridder.Potential = gridder.Quality - gridder.Value;
					break;
				case 2:		//Alternates
					gridder.SetAlternate();
					break;
				case 3:		//Dimensionals
					position = this.Randomizer.GetIndex(GRIDDER.DIMENSIONALS);
					gridder = this.CreateGridder(DimensionalMapping[position]);		//create gridder again, this time as Dimensional
					gridder.SetDimensional();
					gridder.Value = this.Randomizer.GetInRange(21, 28);			//these gridders project from H+ to J
					gridder.Quality = this.Randomizer.GetInRange(gridder.Value+1, 29);
					gridder.Potential = gridder.Quality - gridder.Value;
					gridder.Value -= 6;							//increase value setting because of one-dimensional strength
					break;
			}
			gridder.Experience = this.Randomizer.GetIndex(GRIDDER.YEARS.IMPROVER);
			for (j=0;j<=gridder.Experience;++j)
				gridder.Train();
			this.AddGridder(gridder);
		}
	},
	GenerateDecline(gridder) {  //NOTE: this method also adjusts quality
		var i;

		gridder.Potential = 0;
		for (i=0;i<(gridder.Experience-7);++i) {
	 if (gridder.Potential)
		 gridder.Potential = this.Randomizer.GetInRange(-gridder.Potential, -2*gridder.Potential);
	 else
		 gridder.Potential = this.Randomizer.GetInRange(0, 1);
	 if (gridder.Potential)
		 gridder.Potential = -gridder.Potential;
	 gridder.Quality -= gridder.Potential;
		}
	},
	GeneratePlayerList() {
		var i, j;

		this.PlayerList.length = 0;
		for (i=0;i<this.Gridders.length;++i)
			for (j=0;j<this.Gridders[i].length;++j)
				this.PlayerList.push(this.Gridders[i][j]);
	},
	AddGridder(grddr) {  //NOTE: .PlayerList is not updated - has to be generated whenever used

		grddr.SetTeam(this.Team);
		this.Gridders[grddr.Position].push(grddr);
		this.Gridders[grddr.Position].sort(function(a, b) {return (a.Quality-b.Quality);});
	},
	RemoveGridder(grddr) {
		var i;

		for (i=0;i<this.Gridders[grddr.Position].length;++i)
			if (grddr===this.Gridders[grddr.Position][i])
				return (this.Gridders[grddr.Position].splice(i, 1)[0]);
	},
	AddEconomically(player) {  //i.e. maintain roster limit by subtracting worst player - to practice squad if good enough
		var gridder;

		gridder = this.RemoveGridder(this.GetWorstPlayer());
		this.AddGridder(player);
		if (gridder.Experience<=1)
	 this.Team.PracticeSquad.AddIfUpgrade(gridder);
		else
	 FreeAgency.AddGridder(gridder);
	},
	GetWorstPlayer() {  //ISSUE: can actually utilize .PlayerList by creating and sorting it
		var i, j;
		var wGridder, wQuality;  //w- worst

		//UNLOGGED

		wQuality = 0;
		for (i=0;i<this.Gridders.length;++i)
	 for (j=0;j<this.Gridders[i].length;++j)
		 if (wQuality<this.Gridders[i][j].Quality) {
			 wGridder = this.Gridders[i][j];
			 wQuality = wGridder.Quality;
		 }
		return(wGridder);
	},
	DisplayBasic(aSlots) {  //REDUNDANT - transferred to NFLDraftSubView
		var nSlots;

		nSlots = this.ShowPositions(0, 4, 0, aSlots, 0);	//OFF
		this.ShowPositions(5, 9, 200, aSlots, nSlots);	//DEF
	},
	ShowPositions(start, end, x, aSlots, nSlots) {  //REDUNDANT - transferred to NFLDraftSubView
		var i, j;
		var y;
		var font;
		var qlty, grade;
		var iSlot;

		this.Screen.fillStyle = ROSTER.COLOUR;
		this.Screen.fillRect(x, 0, 200, SCREEN.HEIGHT);

		y = 16;
		if (aSlots)
	 iSlot = 0;
		for (i=start;i<=end;++i) {
	 for (j=0;j<this.Gridders[i].length;++j) {
		 qlty = Math.floor(this.Gridders[i][j].Quality/3);
		 if (qlty>5)
			 qlty = 5;
		 font = { FONT: "bold 12px Arial", COLOUR: RosterColours[qlty] };
		 this.TextWriter.Write(Positions[this.Gridders[i][j].Position], x+5, y, font);
		 this.TextWriter.Write(this.Gridders[i][j].Name.First[0], x+30, y, font);
		 this.TextWriter.Write(this.Gridders[i][j].Name.Last, x+45, y, font);
		 this.TextWriter.Write(this.Gridders[i][j].Experience, x+130, y, font);
		 grade = Utilities.NumberToGrade(this.Gridders[i][j].Quality);
		 this.TextWriter.Write(grade, x+150, y, font);
		 if (this.Gridders[i][j].Potential>0)
			 this.TextWriter.Write("+" + this.Gridders[i][j].Potential, x+170, y, font);
		 else
			 this.TextWriter.Write(this.Gridders[i][j].Potential, x+170, y, font);
		 if (aSlots) {
//			 aSlots[iSlot].Position = i;
			 aSlots[nSlots+iSlot].X = x;
//			 aSlots[nSlots+iSlot].Y = y-16;
			 aSlots[nSlots+iSlot].Y = y-12;
			 aSlots[nSlots+iSlot].Player = this.Gridders[i][j];
			 ++iSlot;
		 }
		 y += 16;
	 }
	 y += 4;
	 this.GraphicsTool.DrawRectangle(x+5, y-16, 195, 2, "white", 1);
	 y += 4;
		}
		return (iSlot);
	},
	GetCumulativeQuality() {
		var i, j;
		var quality;

		quality = 0;
		for (i=0;i<this.Gridders.length;++i)
			for (j=0;j<this.Gridders[i].length;++j)
				quality += this.Gridders[i][j].GetQuality();

		return (quality);
	},
	GetStarterQuality() {
		var i;
		var rtng;

		rtng = 0;
		for (i=0;i<OFFENSE.PLAYERS;++i) {
			if (this.Gridders[OffPairs[this.Team.OffSystem][i][0]][OffPairs[this.Team.OffSystem][i][1]])
				rtng += this.Gridders[OffPairs[this.Team.OffSystem][i][0]][OffPairs[this.Team.OffSystem][i][1]].GetQuality();
			else
				rtng += GRADE.Fplus;
			if (this.Gridders[DefPairs[this.Team.DefSystem][i][0]][DefPairs[this.Team.DefSystem][i][1]])
				rtng += this.Gridders[DefPairs[this.Team.DefSystem][i][0]][DefPairs[this.Team.DefSystem][i][1]].GetQuality();
			else
				rtng += GRADE.Fplus;
		}

		return (rtng/(OFFENSE.PLAYERS+DEFENSE.PLAYERS));
	},
	GetOffStarterQuality() {
		var i;
		var rtng;

		rtng = 0;
		for (i=0;i<OFFENSE.PLAYERS;++i)
			if (this.Gridders[OffPairs[this.Team.OffSystem][i][0]][OffPairs[this.Team.OffSystem][i][1]])
				rtng += this.Gridders[OffPairs[this.Team.OffSystem][i][0]][OffPairs[this.Team.OffSystem][i][1]].GetQuality();
			else
				rtng += GRADE.Fplus;

		return (rtng/OFFENSE.PLAYERS);
	},
	GetDefStarterQuality() {
		var i;
		var rtng;

		rtng = 0;
		for (i=0;i<DEFENSE.PLAYERS;++i)
			if (this.Gridders[DefPairs[this.Team.DefSystem][i][0]][DefPairs[this.Team.DefSystem][i][1]])
				rtng += this.Gridders[DefPairs[this.Team.DefSystem][i][0]][DefPairs[this.Team.DefSystem][i][1]].GetQuality();
			else
				rtng += GRADE.Fplus;

		return (rtng/DEFENSE.PLAYERS);
	},
	GetTotalQuality() {
		var i, j;
		var rtng;
		var nGrddrs;

		nGrddrs = 0;
		rtng = 0;

		//Off
		for (i=0;i<5;++i)
			for (j=0;j<this.Gridders[i].length;++j) {
				rtng += this.Gridders[i][j].GetQuality();
				++nGrddrs;
			}

		//Def
		for (i=5;i<10;++i)
			for (j=0;j<this.Gridders[i].length;++j) {
				 rtng += this.Gridders[i][j].GetQuality();
				 ++nGrddrs;
			 }

		return (rtng/nGrddrs);
	},
	GetOffTotalQuality() {
		var i, j;
		var rtng;
		var nGrddrs;

		nGrddrs = 0;
		rtng = 0;
		for (i=0;i<5;++i)
			for (j=0;j<this.Gridders[i].length;++j) {
				rtng += this.Gridders[i][j].GetQuality();
				++nGrddrs;
			}

		return (rtng/nGrddrs);
	},
	GetDefTotalQuality() {
		var i, j;
		var rtng;
		var nGrddrs;

		nGrddrs = 0;
		rtng = 0;
		for (i=5;i<10;++i)
			for (j=0;j<this.Gridders[i].length;++j) {
				 rtng += this.Gridders[i][j].GetQuality();
				 ++nGrddrs;
			 }

		return (rtng/nGrddrs);
	},
	GetCumulativeValue() {
		var i, j;
		var value;

		value = 0;
		for (i=0;i<this.Gridders.length;++i)
			for (j=0;j<this.Gridders[i].length;++j)
				value += this.Gridders[i][j].Value;

		return (value);
	},
	RunTrainingCamp(iTrnng) {  //TODO: should be in GridironTeam object, or maybe a dedicated training camp object
		var i, j;

		//Train each player
		this.Quitters.length = 0;
		this.Team.Transactions.length = 0;
		for (i=0;i<this.Gridders.length;++i)
			for (j=0;j<this.Gridders[i].length;++j) {
				this.Gridders[i][j].Train();
				if (this.Gridders[i][j].Quality>GRADE.Jminus) {  //NOTE: check is for Decliners and failed Volatiles (retire if worse than J-)
					this.Quitters.push(this.Gridders[i][j]);
					this.Gridders[i].splice(j, 1);
					--j;					//CAUTION: a HACK
				}
			}

		//Re-sort players at every position by value
		for (i=0;i<this.Gridders.length;++i)
			this.Gridders[i].sort(function(a, b) {return a.Value-b.Value;});

		//Get total number of players
		this.GridderCount = 0;
		for (i=0;i<this.Gridders.length;++i)
			this.GridderCount += this.Gridders[i].length;
	},
	Trim() { //UNLOGGED

		this.DemoteProjects();			//TODO: this and . . . 
		this.TrimSurplusPlayers();		//		  this will be replaced by a 'cuts' phase
		this.SortPlayers();
		this.GenerateInjuries();

		//Make sure practice squad is topped off
//		this.Team.PracticeSquad.TopOff(rtng+1);
	},
	GenerateInjuries() {
		var i, j, k;
		var nInjuries;
		var iGame;

		for (i=0;i<this.Gridders.length;++i)
			for (j=0;j<this.Gridders[i].length;++j) {
				nInjuries = this.Randomizer.GetInRange(GRIDDER.INJURY.MIN,GRIDDER.INJURY.MAX);
				iGame = this.Randomizer.GetInRange(1,16);
				for (k=0;k<nInjuries;++k)
					if (iGame+k>16)
						k = nInjuries;		//HACK to end this loop
					 else
						this.Gridders[i][j].Injury += Math.pow(2,(iGame-1)+k);
			}
	},
	DetermineGridderCount() {

		this.GridderCount = 0;
		for (i=0;i<this.Gridders.length;++i)
			this.GridderCount += this.Gridders[i].length;
	},
	DemoteProjects() {  //NOTE: there won't be space for more than 8 projects on squad - those will be lost
		var i, j;

		for (i=0;i<this.Gridders.length;++i)
			for (j=0;j<this.Gridders[i].length;++j)
				if (this.Gridders[i][j].Type==GRIDDER.TYPE.PROJECT) {
					if (this.Team.PracticeSquad.Gridders.length<PRACTICeSQUAD.SIZE)
						this.Team.PracticeSquad.AddGridder(this.RemoveGridder(this.Gridders[i][j]));
					else
						this.RemoveGridder(this.Gridders[i][j]);						//delete projects that can't fit on squad
					--j;											//HACK!
				}
	},
	TrimSurplusPlayers() {  //either cut players or transfer eligible ones to practice squad
		var i, j;
		var val;

		//Remove lowest value players from roster . . . NOTE: this removes QB's, RB's, WR's first, etc.
		val = 29;
		this.DetermineGridderCount();
		while (this.GridderCount>ROSTER.SLOTS) {
			for (i=0;i<this.Gridders.length;++i)
				for (j=0;j<this.Gridders[i].length;++j)
					if (this.Gridders[i][j].Value>=val) {
						if (this.Gridders[i][j].Experience<=1) {
							if (this.Team.PracticeSquad.Gridders.length<PRACTICeSQUAD.SIZE) {
								this.Team.PracticeSquad.AddGridder(this.RemoveGridder(this.Gridders[i][j]));
								--this.GridderCount;
								--j;										//HACK!
							}
						} else {
							FreeAgency.AddGridder(this.RemoveGridder(this.Gridders[i][j]));
							--this.GridderCount;
							--j;										//HACK!
						}
						if (this.GridderCount==ROSTER.SLOTS)	//NOTE: have to exit here since there are 2 loops, so can't use 'break'
							return;
					}
			 --val;
		}
	},
	SortPlayers() {  //by Quality
		var i;

		for (i=0;i<this.Gridders.length;++i)
			this.Gridders[i].sort(function(a, b) {return a.Quality-b.Quality;});
	},
	StartNewSeason() {
		var i, j, k;
		var nGridders;
		var grddr;
		var val;

		//Age all players by 1 year, clear their .Status (used below for Versatiles)
		for (i=0;i<this.Gridders.length;++i) {
			this.Gridders[i].forEach(function(grddr) {grddr.Age();});
			this.Gridders[i].forEach(function(grddr) {grddr.Status=0;});
		}

		//Retire players of 12 year's experience
		this.RetiredPlayers.length = 0;								//clear gridders from previous seasons
		for (i=0;i<this.Gridders.length;++i) {
			nGridders = 0;
			while (nGridders<this.Gridders[i].length)
				if (this.Gridders[i][nGridders].Experience==12)
					this.RetiredPlayers.push(this.RemoveGridder(this.Gridders[i][nGridders]));
				else
					++nGridders;
		}

		//For versatiles, check if they are never likely to make roster, flip them if they are improvers
		for (i=0;i<this.Gridders.length;++i)
			for (j=0;j<this.Gridders[i].length;++j)
				if (this.Gridders[i][j].Experience<GRIDDER.YEARS.IMPROVER)
					if (this.Gridders[i][j].Type==GRIDDER.TYPE.VERSATILE) {

						//Check if position has already been switched
						if (this.Gridders[i][j].Status) {
							this.Gridders[i][j].Status = false;
							continue;
						}

						//Calculate value
						val = this.Gridders[i][j].Potential/2;
						for (k=this.Gridders[i][j].Experience;k<(GRIDDER.YEARS.IMPROVER-1);++k)
							val += val/2;
						val = Math.round(this.Gridders[i][j].Quality-val);

						//Switch position if won't make the roster
						if (val>GRADE.Eminus) {
							grddr = this.RemoveGridder(this.Gridders[i][j]);
							grddr.SwitchPosition();
							this.AddGridder(grddr);
							--j;									//HACK!
						}
					}
	},
	UpdateInjuries() {  //TODO: could move this to GridironTeam due to overcrowding here
		var i, j;
		var nInjuries, nGames;
		var gridder;
		var aInjuredPlayers;
		var iPlayer;

		//NOTE: injured reserve for placing gridder for 4 games

		//Get total number of injuries (between 0 and 20, or (120-cumulative injuries))
		if (this.CumulativeInjuries==INJURY.CUMULATIVE)
	 nInjuries = 0;
		else if ((INJURY.CUMULATIVE-this.CumulativeInjuries)<INJURY.MAX)
	 nInjuries = this.Randomizer.GetInRange(0, INJURY.CUMULATIVE-this.CumulativeInjuries);
		else
	 nInjuries = this.Randomizer.GetInRange(0, INJURY.MAX);

		//Distribute injuries randomly amongst uninjured, up to 4 games
		this.GeneratePlayerList();
		aInjuredPlayers = new Array();
		while (nInjuries) {
	 nGames = this.Randomizer.GetInRange(1, 4);
	 if (nGames>nInjuries)
		 nGames = nInjuries;
	 do {									//get uninjured player
		 iPlayer = this.Randomizer.GetInRange(0, ROSTER.SLOTS-1);	//TODO: ROSTER.SLOTS may need to be replaced with .PlayerList.length
		 gridder = this.PlayerList[iPlayer];
	 } while (gridder.Injury);
	 gridder.Injury = nGames;
	 nInjuries -= nGames;
	 aInjuredPlayers.push(iPlayer);
		}

		//Update injury status of rest of players - NOTE: this step is last since don't want recovered players to get immediately re-injured
		for (i=0;i<ROSTER.SLOTS;++i)
	 if (!aInjuredPlayers.includes(i))
		 if (this.PlayerList[i].Injury)
			 --this.PlayerList[i].Injury;
	},
	EraseInjuries() {
		var i, j;

		for (i=0;i<this.Gridders.length;++i)
	 for (j=0;j<this.Gridders[i].length;++j)
		 this.Gridders[i][j].Injury = 0;
	},
	GetSize() {
		var i;
		var size;

		size = 0;
		for (i=0;i<POSITION.COUNT;++i)
	size += this.Gridders[i].length;
		return (size);
	},
	SortPositions(bValue) {
		var i;

		if (bValue)
	 for (i=0;i<POSITION.COUNT;++i)
		 this.Gridders[i].sort(function(a, b) {return a.Value-b.Value;});	//ASSUMPTION: value is always generated
		else
	 for (i=0;i<POSITION.COUNT;++i)
		 this.Gridders[i].sort(function(a, b) {return a.Quality-b.Quality;});
	},
	Organize() {  //TODO: this looks REDUNDANT
		var i;
		var nGridders;

		this.GeneratePlayerList();
		this.PlayerList.sort(function(a, b) {return a.Quality-b.Quality;});
		nGridders = this.PlayerList.length;
		while (nGridders!=ROSTER.SLOTS) {
	 this.Team.PracticeSquad.AddGridder(this.RemoveGridder(this.PlayerList[nGridders-1]));
	 --nGridders;
		}
	}
};
