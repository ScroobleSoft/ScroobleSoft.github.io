/*
 *  trading up formula: x*y/(x+y)
 *  trading down: solicit offers (for much later)
 *  evaluating needs - quality (picks 1-3), quantity (4-7); everything below C- in 22 starting slots needs quality
 *  for all 22 starting slots, check how far below C-, sort in array, then pick serially
 *  can have element of uncertainty where team picks BPA rather than by need (different draft profiles)
 *  should have a column of team names, clicking on each lists their needs in InfoBox/ControlPanel
 */
//----------------------------------------------
//---------- GRIDIRON DRAFT --------------------
var GridironDraft = function() {
	var Randomizer;
	var SelectionOrder;
	var Round;											//NOTE: enumeration starts from 1
	var Picks, PickNumbers, CurrentPick;		//.PickNumbers and .CurrentPick enumerate from 0 since aren't per round
	var Prospect;

	//Arrays
	var ValueList, PositionLists;
	var AlternatesList, AlternateLists;
	var Projects;
	var FilteredList;
	var ProspectDistribution;
	var TargetSpread;

	var i;
};
GridironDraft.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.SelectionOrder = new Array(LEAGUE.TEAMS*DRAFT.ROUNDS);
		this.SetLists();
		this.Round = 1;
		this.CurrentPick = 0;
	},
	SetLists() {
		var i;
		var aPos;

		//All prospects
		this.PositionLists = new Array(POSITION.COUNT);
		for (i=0;i<POSITION.COUNT;++i) {
			aPos = new GenieArray();
			aPos.Set();
			this.PositionLists[i] = aPos;
		}
		this.ValueList = new GenieArray();

		//Alternates
		this.AlternatesList = new GenieArray();
		this.AlternatesList.Set(GRIDDER.DRAFT.ANORMALS);
		this.AlternateLists = new Array(GRIDDER.ANORMALS);
		for (i=0;i<GRIDDER.ANORMALS;++i) {
			aPos = new Array();
			this.AlternateLists[i] = aPos;
		}

		this.Projects = new GenieArray();

		this.FilteredList = new GenieList();
		this.FilteredList.Set(DRAFT.PROSPECTS);

		this.Picks = new Array();
		this.PickNumbers = new Array();

		this.TargetSpread = new Array(30);
		this.ProspectDistribution = new Array(24);		//NOTE: Prospects range from A+ to H- in Value
	},
	GenerateTargetSpread(qlty, ptntl) {
		var i;
		var start, end;

		this.TargetSpread.fill(0);
		start = qlty - ptntl;
		end = start;

		//Create a triangular chart
		while (start>0 || end<qlty) {
			for (i=start;i<=end;++i)
				++this.TargetSpread[i];
			if (start>0)
				--start;
			if (end<qlty)
				++end;
		}

		//Give it a bell shape
		for (i=0;i<this.TargetSpread.length;++i)
			this.TargetSpread[i] *= this.TargetSpread[i];
	},
	SetSelectionOrder() {  //NOTE: currently unused, but will be at season's end
		var i, j;
		var aRecords;
/*
		//Determine and sort team win totals
		aRecords = new GenieArray();
		aRecords.Set(LEAGUE.TEAMS, function() { var Wins, Index; } );
		for (i=0;i<LEAGUE.TEAMS;++i) {
			aRecords[i].Wins = (2*Teams[i].PreviousRecord.W) + Teams[i].PreviousRecord.T;
			aRecords[i].Index = i;
		}
		aRecords.sort(function(a, b) {return a.Wins-b.Wins;});
*/
		for (i=0;i<DRAFT.ROUNDS;++i)
			for (j=0;j<LEAGUE.TEAMS;++j) {
//				this.SelectionOrder[(LEAGUE.TEAMS*i)+j] = aRecords[j].Index;
//				Teams[aRecords[j].Index].Picks[i].Pick = (LEAGUE.TEAMS*i) + j;
				this.SelectionOrder[(LEAGUE.TEAMS*i)+Teams[j].DraftPosition] = j;
			}
	},
	Generate() {
		var i;
		var batch, position, prospect;
		var aAnrmls;

		//Pick position
		aAnrmls = 0;
		for (i=0;i<DRAFT.PROSPECTS;++i) {
			if (this.Randomizer.CheckBoolean())										//NOTE: half the prospects will be distributed evenly across all positions, the
				position = this.Randomizer.GetIndex(POSITION.COUNT);			//		  other half weighted according to number	of slots per position
			else
				position = this.Randomizer.GetSlot(PositionDistribution);

			//Create and set according to type
			prospect = GridironUtils.CreateGridder(position);
			prospect.Experience = 0;
			prospect.Target = 0;
			batch = this.Randomizer.GetSlot(DraftBatchDistribution);
			switch (batch) {
				case DRAFT.BATCH.NORMAL:
					this.SetNormal(prospect);
					break;
				case DRAFT.BATCH.FRINGE:
					this.SetFringe(prospect);
					break;
				case DRAFT.BATCH.ALTERNATE:
					prospect.SetAlternate();
					if (prospect.Type==GRIDDER.TYPE.INJURED || prospect.Type==GRIDDER.TYPE.SPECIAL) {
						this.GenerateTargetSpread(prospect.Quality, prospect.Potential);
						prospect.Target = this.Randomizer.GetSlot(this.TargetSpread);
					}
					this.AlternateLists[prospect.Type-1].push(prospect);
					this.AlternatesList[aAnrmls] = prospect;
					++aAnrmls;
					break;
				case DRAFT.BATCH.DIMENSIONAL:
					this.SetDimensional(prospect);
					this.AlternateLists[prospect.Type-1].push(prospect);
					this.AlternatesList[aAnrmls] = prospect;
					++aAnrmls;
					break;
			}

			//Attach to lists
			prospect.History1 = prospect.Potential;
			this.ValueList.push(prospect);
			this.PositionLists[prospect.Position].push(prospect);
		}

		//Sort arrays by value
		this.ValueList.sort(function(a,b) {return a.Value-b.Value;});
		for (i=0;i<POSITION.COUNT;++i)
			this.PositionLists[i].sort(function(a, b) {return a.Value-b.Value;});
		this.AlternatesList.sort(function(a,b) {return a.Value-b.Value;});
		for (i=0;i<GRIDDER.ALTERNATES;++i)
			this.AlternateLists[i].sort(function(a, b) {return a.Value-b.Value;});

		this.GenerateProjects();
	},
	GenerateProjects() {
		var i;
		var positions;
		var prospect;

		for (i=0;i<DRAFT.PROJECTS;++i) {
			if (this.Randomizer.CheckBoolean())
				position = this.Randomizer.GetIndex(POSITION.COUNT);
			else
				position = this.Randomizer.GetSlot(PositionDistribution);
			prospect = GridironUtils.CreateGridder(position);
			prospect.Experience = 0;
			prospect.Quality = this.Randomizer.GetInRange(GRADE.Fplus, GRADE.Jminus);
			prospect.Potential = this.Randomizer.GetInRange(GRIDDER.POTENTIAL.MEDIAN, GRIDDER.POTENTIAL.MAX);
			prospect.Value = prospect.Quality - prospect.Potential;
			prospect.Target = 0;
			prospect.Type = GRIDDER.TYPE.PROJECT;
			this.Projects.push(prospect);
		}
		this.Projects.sort(function(a,b) {return a.Value-b.Value;});
	},
	SetNormal(prospect) {

		prospect.Value = this.Randomizer.GetSlot(DraftValueDistribution);
		prospect.Quality = this.Randomizer.GetInRange(GRADE.Fplus, prospect.Value+15);
		prospect.Potential = prospect.Quality - prospect.Value;
		this.GenerateTargetSpread(prospect.Quality, prospect.Potential);
		prospect.Target = this.Randomizer.GetSlot(this.TargetSpread);
		if (prospect.Target===undefined)  //TODO: is this a TEST?
			x = 0;
	},
	SetFringe(prospect) {

		prospect.Value = this.Randomizer.GetInRange(GRADE.Fplus, GRADE.Gminus);
		prospect.Quality = this.Randomizer.GetInRange(prospect.Value+1, GRADE.Jminus);
		prospect.Potential = prospect.Quality - prospect.Value;
		this.GenerateTargetSpread(prospect.Quality, prospect.Potential);
		prospect.Target = this.Randomizer.GetSlot(this.TargetSpread);
	},
	SetDimensional(prospect) {

		prospect.Type = GRIDDER.TYPE.DIMENSIONAL;
		prospect.Quality = this.Randomizer.GetInRange(GRADE.Hplus, GRADE.Jminus);
		prospect.Potential = this.Randomizer.GetInRange(1,2);
		prospect.Value = prospect.Quality - 6;		//value setting is increased because of one-dimensional strength
		prospect.Target = 0;
	},
	EvaluateDraftClass() {
		var i;

		//UNLOGGED

		for (i=0;i<DRAFT.PROSPECTS;++i)		//NOTE: Prospects range from A+ to H- in Value
			++this.ProspectDistribution[this.ValueList[i].Value];
	},
	GetProspectList(pos, type) {  //UNLOGGED . . . TODO: future options like all Alternate, 'Normals only' not implemented
		var i;

		if (type==GRIDDER.TYPE.ALL) {
			if (pos==-1)
				return (this.ValueList);
			else
				return (this.PositionLists[pos]);
		} else {
			if (pos==-1)
				return (this.AlternateLists[type-1]);
			else {
				this.FilteredList.Reset();
				for (i=0;i<this.PositionLists[pos].length;++i)
					if (this.PositionLists[pos][i].Type==type)
						this.FilteredList.Add(this.PositionLists[pos][i]);
				return(this.FilteredList);
			}
		}
	},
	ExciseValueList(prspct) {

		for (this.i=0;this.i<this.ValueList.length;++this.i)
			if (this.ValueList[this.i]===prspct)
				break;
		this.ValueList.Remove(this.i);
	},
	ExciseProspect(prspct) {

		for (this.i=0;this.i<this.PositionLists[prspct.Position].length;++this.i)
			if (this.PositionLists[prspct.Position][this.i]===prspct)
				break;
		this.PositionLists[prspct.Position].splice(this.i, 1);
	},
	ExciseAlternate(altrnt) {

		for (this.i=0;this.i<this.AlternateLists[altrnt.Type-1].length;++this.i)
			if (this.AlternateLists[altrnt.Type-1][this.i]===altrnt)
				break;
		this.AlternateLists[altrnt.Type-1].splice(this.i, 1);

		for (this.i=0;this.i<this.AlternatesList.length;++this.i)
			if (this.AlternatesList[this.i]===altrnt)
				break;
		if (this.i!=this.AlternatesList.length)
			this.AlternatesList.Remove(this.i);
	},
	ExciseLists(prspct, excptn) {
	},
	End() {
		var i;

		Teams.forEach(function(team) {team.Roster.GeneratePlayerList();});

		//Add normal prospects to free agent list
		for (this.i=0;this.i<this.ValueList.length;++this.i)
			if (this.ValueList[this.i].Status==GRIDDER.NORMAL)
				FreeAgency.AddGridder(this.ValueList[this.i]);
/*
		//Remove these players from value and prospect lists . . . this step is likely REDUNDANT
		for (i=0;i<FreeAgency.Gridders.length;++i) {
			this.ExciseValueList(FreeAgency.Gridders[i]);
			this.ExciseProspect(FreeAgency.Gridders[i]);
		}
*/
	},
	TradeUp(trgt, pck1, pck2) {
		var iTeam;

		iTeam = this.SelectionOrder[trgt];
		this.SelectionOrder[trgt] = PlayerTeam.Index;
		this.SelectionOrder[pck1] = iTeam;
		this.SelectionOrder[pck2] = iTeam;
	},
	TradeDown(pick, pick1, pick2) {  
		var iTeam;
/*
		var pick1, pick2;
		//Determine picks commensurate with a 'down' trade
		if (this.CurrentPick<10)
			pick1 = this.CurrentPick + 5;
		else
			pick1 = Math.round(1.5*this.CurrentPick); 
		pick2 = pick1 + 32;
		while (this.SelectionOrder[pick1]==PlayerTeam.Index || this.SelectionOrder[pick2]==PlayerTeam.Index) {  //make sure own picks aren't used
			++pick1;
			++pick2;
		}
*/
		//Switch picks in global draft list
		iTeam = this.SelectionOrder[pick];
		this.SelectionOrder[pick] = this.SelectionOrder[pick1];
		this.SelectionOrder[pick1] = iTeam;
		this.SelectionOrder[pick2] = iTeam;
/*
		info = Math.ceil((this.CurrentPick+1)/LEAGUE.TEAMS) + "." + ((this.CurrentPick+1) % LEAGUE.TEAMS) + " traded for ";
		info += Math.ceil((pick1+1)/LEAGUE.TEAMS) + "." + ((pick1+1) % LEAGUE.TEAMS) + " and ";
		info += Math.ceil((pick2+1)/LEAGUE.TEAMS) + "." + ((pick2+1) % LEAGUE.TEAMS);
		alert(info);
*/
	}
};
