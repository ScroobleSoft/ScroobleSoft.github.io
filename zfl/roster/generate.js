
GridironRoster.prototype.Generate = function() {

	switch (League.Options & 0x3) {
		case ROSTER.DISTRIBUTION.FIXED:
	 this.GenerateFixed();
	 break;
		case ROSTER.DISTRIBUTION.MINIMUM:
	 this.GenerateMinimum();
	 break;
		case ROSTER.DISTRIBUTION.RANDOM:
	 this.GenerateRandom();
	 break;
	}
};
GridironRoster.prototype.GenerateFixed = function() {	//based on schemes, all but 7 slots are fixed (22 starters plus their backups)

	this.GenerateAllPositions();
	this.GenerateGridders();
	this.TrimToSlots(2);
	this.SortPlayers();
	this.Team.PracticeSquad.TopOff();
};
GridironRoster.prototype.GenerateMinimum = function() {	//-based on schemes, vital starter slots are fixed

	this.GenerateAllPositions();
	this.GenerateGridders();
	this.TrimToSlots(1);
	this.SortPlayers();
	this.Team.PracticeSquad.TopOff();
};
GridironRoster.prototype.GenerateRandom = function() {

	this.GenerateGridders();
	this.TrimRandom();
	this.SortPlayers();
	this.Team.PracticeSquad.TopOff();
};
GridironRoster.prototype.GenerateAllPositions = function() {  //create an array with desired position distribution
	var i, j, k;
	var iSlot;

	this.PositionDistribution = new Array(DRAFT.ROUNDS*GRIDDER.YEARS.CAREER);

	//Fill up some 66 of the 84 slots
	iSlot = 0;
	for (i=0;i<3;++i)
		for (j=0;j<5;++j) {
			for (k=0;k<StarterDistributions[0][this.Team.OffSystem][j];++k) {
				this.PositionDistribution[iSlot] = j;
				++iSlot;
			}
			for (k=0;k<StarterDistributions[1][this.Team.DefSystem][j];++k) {
				this.PositionDistribution[iSlot] = j + 5;
				++iSlot;
			}
		}

	//Top off the remaining ones semi-randomly
	for (i=iSlot;i<this.PositionDistribution.length;++i)
		this.PositionDistribution[i] = this.GetDistributedPosition();

	this.Randomizer.Shuffle(this.PositionDistribution);
};
GridironRoster.prototype.GenerateGridders = function() {
	var i, j;

	//Create extended roster
	for (i=0;i<GRIDDER.YEARS.CAREER;++i) {
		this.DraftNormals(i);
		this.DraftOthers(i);
		this.Train();
	}

	//Decrement all ages
	for (i=0;i<POSITION.COUNT;++i)
		for (j=0;j<this.Gridders[i].length;++j)
			--this.Gridders[i][j].Experience;

	//Correct Veterans' properties
	this.GeneratePlayerList();
	this.PlayerList.forEach(function(grddr) {if (grddr.CheckVeteran()) grddr.Potential=0;});
};
GridironRoster.prototype.DraftNormals = function(exprnc) {
	var i;
	var pick;
	var position;
	var prospect;

	for (i=0;i<4;++i) {
		if ((League.Options & 0x3)==ROSTER.DISTRIBUTION.RANDOM)
			position = this.GetDistributedPosition();
		else
			position = this.PositionDistribution[(DRAFT.ROUNDS*exprnc)+i];
		prospect = GridironUtils.CreateGridder(position);
		prospect.SetTeam(this.Team);
		Draft.SetNormal(prospect);
		prospect.Drafted = i + 1;
		pick = (prospect.Drafted*LEAGUE.TEAMS) + this.Randomizer.GetIndex(LEAGUE.TEAMS);
		prospect.Salary = Math.round(64000/pick);							//NOTE: 'pick' is actually pick + 32
		this.AddGridder(prospect);
	}
};
GridironRoster.prototype.DraftOthers = function(exprnc) {
	var i;
	var pick;
	var position;
	var prospect;

	for (i=0;i<3;++i) {
		if ((League.Options & 0x3)==ROSTER.DISTRIBUTION.RANDOM)
	 position = this.GetDistributedPosition();
		else
	 position = this.PositionDistribution[(DRAFT.ROUNDS*exprnc)+i+4];
		prospect = GridironUtils.CreateGridder(position);
		prospect.SetTeam(this.Team);
		switch (this.Randomizer.GetIndex(8)) {
	 case 0:
	 case 1:
	 case 2:
		 Draft.SetFringe(prospect);
		 break;
	 case 3:
	 case 4:
	 case 5:
	 case 6:
		 prospect.SetAlternate();
		 break;
	 case 7:
		 Draft.SetDimensional(prospect);
		 break;
		}
		prospect.Drafted = i + 5;
		pick = (prospect.Drafted*LEAGUE.TEAMS) + this.Randomizer.GetIndex(LEAGUE.TEAMS);
		prospect.Salary = Math.round(64000/pick);							//NOTE: 'pick' is actually pick + 32
		this.AddGridder(prospect);
	}
};
GridironRoster.prototype.GetDistributedPosition = function() {

	if (this.Randomizer.CheckBoolean())								//offensive position
		return (this.Randomizer.GetSlot(OffDefDistributions[0][this.Team.OffSystem]));
	 else											//defensive position
		return (this.Randomizer.GetSlot(OffDefDistributions[1][this.Team.DefSystem])+5);
};
GridironRoster.prototype.Train = function() {
	var i, j;
	var gridder;

	for (i=0;i<this.Gridders.length;++i)
		for (j=0;j<this.Gridders[i].length;++j) {
			gridder = this.Gridders[i][j];
			if (gridder.Experience<6)
				gridder.History1 = BitUtils.AddAtBits(gridder.History1, gridder.Quality, 5*gridder.Experience);
			else
				gridder.History2 = BitUtils.AddAtBits(gridder.History2, gridder.Quality, 5*(gridder.Experience-6));
			this.Gridders[i][j].Train();
			++this.Gridders[i][j].Experience;
			if (this.Gridders[i][j].Experience==5)
				this.Gridders[i][j].Salary = Math.round(15000/(this.Gridders[i][j].Quality+3));
			this.Gridders[i][j].SetValue();
		}
};
GridironRoster.prototype.TrimToSlots = function(scale) {
	var iGridder;
	var position;
	var gridder;

	this.GeneratePlayerList();
	this.PlayerList.sort(function(a, b) {return (b.Value-a.Value);});		//NOTE: least valuable to most valuable
	iGridder = 0;
	while (this.PlayerList.length>ROSTER.SLOTS) {

		if (!this.PlayerList[iGridder])	//NOTE: possibility of 'countr overflow' error exists, so list is reset to beginning, and process re-started
	 iGridder = 0;

		position = this.PlayerList[iGridder].Position;
		if (this.PlayerList[iGridder].Position<5) {
	 if ( this.Gridders[position].length > (scale*StarterDistributions[0][this.Team.OffSystem][position]) ) {
		 gridder = ArrayUtils.Extract(this.PlayerList, iGridder);
		 this.TrimGridder(gridder);
	 } else
		 ++iGridder;
		} else {
	 if ( this.Gridders[position].length > (scale*StarterDistributions[1][this.Team.DefSystem][position-5]) ) {
		 gridder = ArrayUtils.Extract(this.PlayerList, iGridder);
		 this.TrimGridder(gridder);
	 } else
		 ++iGridder;
		}
	}
};
GridironRoster.prototype.TrimRandom = function() {
	var i, j;
	var val;
	var nGridders;

	//Count the number of gridders on the roster
	nGridders = 0;
	for (i=0;i<this.Gridders.length;++i)
		for (j=0;j<this.Gridders[i].length;++j)
	 ++nGridders;

	//Remove lowest value players from roster
	val = 29;
	while (nGridders>ROSTER.SLOTS) {
		for (i=0;i<this.Gridders.length;++i)
	 for (j=0;j<this.Gridders[i].length;++j)
		 if (this.Gridders[i][j].Value>=val) {
			 this.TrimGridder(this.Gridders[i][j]);
			 --nGridders;
			 --j;							//HACK!
			 if (nGridders==ROSTER.SLOTS)				//NOTE: have to exit here since there are 2 loops, so can't use 'break'
		  return;
		 }
		--val;
	}
};
GridironRoster.prototype.TrimGridder = function(grddr) {

	if (grddr.Experience>1) {
		if (grddr.Quality<=GRADE.Jminus)
			FreeAgency.AddGridder(this.RemoveGridder(grddr));
		else
			this.RemoveGridder(grddr);			//all gridders worse that J- are retired
	} else
		this.Team.PracticeSquad.Queue(this.RemoveGridder(grddr));
};
