
//----------------------------------------------
//---------- FOOTBALL SQUAD --------------------
var FootballSquad = function() {
	var Randomizer;
	var Team;
	var Players;
	var Goalkeepers, Defenders, Midfielders, Attackers;	//.Attackers include wingers and strikers
	var PositionGroups;
	var Needs;
};
FootballSquad.prototype = {
	Set(rGenerator, team) {
		this.Randomizer = rGenerator;

		this.Team = team;
		this.Players = new Array();
		this.Goalkeepers = new Array();
		this.Defenders = new Array();
		this.Midfielders = new Array();
		this.Attackers = new Array();
		this.PositionGroups = [ this.Goalkeepers, this.Defenders, this.Midfielders, this.Attackers ];
	},
	Generate() {

		this.Players = ArrayUtils.Create(SQUAD.SIZE, FootballPlayer);
		for (i=0;i<SQUAD.SIZE;++i)
			this.Players[i].Set(this.Randomizer, this.Team);
	},
	SetIdentities() {
		var i;
		var nSize;

		//Set player ages
		nSize = Math.round((2/3)*SQUAD.SIZE);
		for (i=0;i<nSize;++i)
			this.Players[i].Age = this.Randomizer.GetInRange(FOOTBALLER.AGE.MIN, FOOTBALLER.AGE.VETERAN);
		for (i=nSize;i<SQUAD.SIZE;++i)
			this.Players[i].Age = this.Randomizer.GetInRange(FOOTBALLER.AGE.MIN, FOOTBALLER.AGE.WArHORSE);

		this.Players.forEach(function(player){player.SetCharacteristics();});
		this.Players.forEach(function(player){player.SetIdentity();});
	},
	Organize() {  //REDUNDANT
		var i;

		for (i=0;i<SQUAD.SIZE;++i) {
	 if (this.Players[i].Type==POSITION.GK)
		 this.Goalkeepers.push(this.Players[i]);
	 if (this.Players[i].Type-(this.Players[i].Type%10)==POSITION.DEFENDER)
		 this.Defenders.push(this.Players[i]);
	 if (this.Players[i].Type-(this.Players[i].Type%10)==POSITION.MIDFIELDER)
		 this.Midfielders.push(this.Players[i]);
	 if (this.Players[i].Type-(this.Players[i].Type%10)==POSITION.ATTACKER)
		 this.Attackers.push(this.Players[i]);
		}
	},
	Evaluate() {

		//UNLOGGED  (since in a very basic form right now)

		this.Needs[Math.round(POSITION.GOALKEEPER/10)] = this.Goalkeepers.length - SLOT.GK;
		this.Needs[Math.round(POSITION.DEFENDER/10)] = this.Defenders.length - SLOT.D;
		this.Needs[Math.round(POSITION.MIDFIELDER/10)] = this.Midfielders.length - SLOT.M;
		this.Needs[Math.round(POSITION.ATTACKER/10)] = this.Attackers.length - SLOT.A;
	},
	AddPlayer(player) {

		this.Players.push(player);
		if (player.Position==POSITION.GK)
			this.Goalkeepers.push(player);
		else if (player.Position<POSITION.RM)
			this.Defenders.push(player);
		else if (player.Position<POSITION.RW)
			this.Midfielders.push(player);
		else
			this.Attackers.push(player);
	},
	SubtractPlayer(player) {
		var i;
		var grp;

		//Remove from main list
		for (i=0;i<this.Players.length;++i)
			if (this.Players[i]===player)
				break;
		ArrayUtils.Remove(this.Players, i);

		//Remove from position list
		grp = player.GetGroup();
		this.PositionGroups[grp].sort(function(a, b) {return a.Quality-b.Quality;});
	},
	AssignBalancedPositions() {

		//UNLOGGED

		//TEMP
		this.AssignPrecisePositions();
	},
	AssignRandomPositions() {
		var i;
		var iSlot;

		for (i=0;i<SQUAD.SIZE;++i) {
	 iSlot = this.Randomizer.GetSlot(SquadDistribution);
	 this.Players[i].Position = this.Randomizer.GetSlot(SquadDistribution);
	 switch (true) {
		 case (this.Players[i].Position<POSITION.RB):
			 this.Goalkeepers.push(this.Players[i]);
			 break;
		 case (this.Players[i].Position<POSITION.RM):
			 this.Defenders.push(this.Players[i]);
			 break;
		 case (this.Players[i].Position<POSITION.RW):
			 this.Midfielders.push(this.Players[i]);
			 break;
		 default:
			 this.Attackers.push(this.Players[i]);
			 break;
	 }
		}
	},
	AssignPrecisePositions() {
		var i;

		//Goalkeepers
		for (i=0;i<3;++i) {
	 this.Players[i].Position = 0;
	 this.Goalkeepers.push(this.Players[i]);
		}

		//Outfield players
		for (i=3;i<SQUAD.SIZE;++i) {
			this.Players[i].Position = i - 2;
			if (i-2<POSITION.RM)
				this.Defenders.push(this.Players[i]);
			else if (i-2<POSITION.RW)
				this.Midfielders.push(this.Players[i]);
			else
				this.Attackers.push(this.Players[i]);
		}

		//Sort players (NOTE: only GKs needed here)
		this.Goalkeepers.sort(function(a, b) {return b.Y-a.Y;});
	},
	GenerateRandomRatings() {  //NOTE: generates both Quality and Potential
		var i;

		for (i=0;i<SQUAD.SIZE;++i)
			if (this.Players[i].Age<=FOOTBALLER.AGE.YOUTH) {			//HARD-CODED
				this.Players[i].Quality = this.Randomizer.GetInRange(GRADE.Dplus,GRADE.Eminus);
				this.Players[i].Potential = this.Randomizer.GetInRange(FOOTBALLER.POTENTIAL.MIN,FOOTBALLER.POTENTIAL.MAX);
			} else {
				this.Players[i].Quality = (3*this.Randomizer.GetSlot( [1,2,3,4] )) + this.Randomizer.GetInRange(0, 2);
				if (this.Players[i].Age<=FOOTBALLER.AGE.EXPERIENCED) {
					this.Players[i].Potential = this.Randomizer.GetInRange(FOOTBALLER.POTENTIAL.MIN,FOOTBALLER.POTENTIAL.MAX);
					this.Players[i].Potential *= ((this.Players[i].Age-FOOTBALLER.AGE.YOUTH)+1);
				} else if (this.Players[i].Age>FOOTBALLER.AGE.SEASONED) {
					if (this.Players[i].Age>FOOTBALLER.AGE.VETERAN)
						this.Players[i].Potential = 10;
					else {
						this.Players[i].Potential = this.Players[i].Age - FOOTBALLER.AGE.SEASONED;
						if (this.Randomizer.CheckBoolean())
							--this.Players[i].Potential;
					}
				}
			}

		this.Sort();
	},
	GenerateWeightedRatings() {

		//UNLOGGED

		//TEMP
		this.GenerateRandomRatings();
	},
	Sort() {  //NOTE: by descending quality . . . TODO: remove, use QualitySort instead
		var i;

		//UNLOGGED - will balance out ::Organize

		//Sort all players by position (for OpponentView)
		this.Players.sort(function(a, b) {return (a.Quality-b.Quality);});

		//Sort positions by quality
		for (i=0;i<SQUAD.GROUPS;++i)
	 this.PositionGroups[i].sort(function(a, b) {return a.Quality-b.Quality;});
	},
	SortByPosition() {

		this.Players.sort(function(a, b) {return a.Position-b.Position;});
	},
	SortByQuality() {
		var i;

		//UNLOGGED

		//Sort all players by position (for OpponentView)
		this.Players.sort(function(a, b) {return (a.Quality-b.Quality);});

		//Sort positions by quality
		for (i=0;i<SQUAD.GROUPS;++i)
			this.PositionGroups[i].sort(function(a, b) {return a.Quality-b.Quality;});
	},
	ValueSort() {
	},
	SyncArrays() {	//NOTE: coordinate .Players array with position arrays
		var i, j;
		var iPlayer;

		iPlayer = 0;
		for (i=0;i<SQUAD.GROUPS;++i)
			for (j=0;j<this.PositionGroups[i].length;++j) {
				this.Players[iPlayer] = this.PositionGroups[i][j];
				++iPlayer;
			}
	},
	GetWageBill() {
		var bill;

		bill = 0;
		this.Players.forEach(function(player){bill += player.GetWages();});

		return (bill);
	},
	GetRating() {  //NOTE: not rounded
		var i;
		var qlty;

		qlty = 0;
		for (i=0;i<this.Players.length;++i)
			qlty += this.Players[i].Quality;

		return (qlty/this.Players.length);
	}
};
