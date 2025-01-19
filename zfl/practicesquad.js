/*
 *  not sure if will allow signing of players from other teams' squads, but could have a 'protective rule' that anyone
 *  with a grade lower than E- is safe (or maybe F- or even G-)
 *  NOTE: this could go away completely and just be an array, unless there are methods here that could be useful
 */
//-------------------------------------------------------
//---------- GRIDIRON PRACTICE SQUAD --------------------
var GridironPracticeSquad = function() {
	var Randomizer;
	var Team;
	var Gridders;
};
GridironPracticeSquad.prototype = {
	Set(rGenerator, iTeam) {
		this.Randomizer = rGenerator;
		this.Team = Teams[iTeam];
		this.Gridders = new GenieArray();
	},
	Generate() {
		var i;
		var pos;
		var grddr;

		//TODO: some will be Volatile/Versatile/Special or other Alternate

		for (i=0;i<PRACTICeSQUAD.SIZE;++i) {
	 pos = this.Randomizer.GetSlot(PositionDistribution);
	 grddr = GridironUtils.CreateGridder(pos);
	 grddr.Experience = this.Randomizer.GetInRange(0, 1);
	 grddr.Quality = this.Randomizer.GetInRange(15, 29);
	 grddr.Potential = this.Randomizer.GetInRange(1, 15);
	 grddr.Value = grddr.Quality - grddr.Potential;
	 if (grddr.Value<15)								//NOTE: anyone projected to reach the roster should be a project
		 grddr.Type = GRIDDER.TYPE.PROJECT;
	 else if ((grddr.Quality-((3-grddr.Experience)*grddr.Potential))>=15)		//check if has no chance of making roster
		 grddr.Potential = Math.ceil((grddr.Quality-14)/(3-grddr.Experience));	//give just enough potential to make roster in best case
	 this.AddGridder(grddr);
		}
	},
	AddGridder(player) {

		this.Gridders.push(player);
	},
	Queue(grddr) {  //NOTE: added according to first in first out principle

		//UNLOGGED

		if (this.Gridders.length==PRACTICeSQUAD.SIZE)
	 FreeAgency.AddGridder(this.Gridders.shift());
		this.AddGridder(grddr);
	},
	RemovePlayer(player) {
		var i;

		for (i=0;i<this.Gridders.length;++i)
	 if (player===this.Gridders[i])
		 return (this.Gridders.splice(i, 1)[0]);
	},
	Promote(nGridder) {  //UNTESTED
		var prspct;

		prspct = this.Gridders.splice(nGridder, 1)[0];
		this.Team.Roster.AddGridder(prspct);
	},
	DemoteTo() {
	},
	AddIfUpgrade(grddr) {  //NOTE: if not an upgrade, waive the player; also, measuring by .Value, not .Quality
		var i;
		var iWorst, val;

		//LOGGED - UNTESTED

		//Check if squad is has space
		if (this.Gridders.length<PRACTICeSQUAD.SIZE) {
	 this.Gridders.push(grddr);
	 return;
		}

		//Find worst player, if any are worse
		iWorst = -1;
		val = grddr.Value;
		for (i=0;i<this.Gridders.length;++i)
	 if (this.Gridders[i].Value>val) {
		 iWorst = i;
		 val = this.Gridders[i].Value;
	 }
		if (i!=this.Gridders.length) {		//check if any worse player was found
	 this.Gridders.Remove(i);
	 this.Gridders.push(grddr);
		} else
	 return;
	},
	PromoteAll() {
		var iGrddr;

		iGrddr = 0;
		while (iGrddr<this.Gridders.length)
	 if (this.Gridders[iGrddr].Experience>=0)
		 this.Team.Roster.AddGridder(this.Gridders.splice(iGrddr, 1)[0]);
	 else
		 ++iGrddr;
	},
	StartNewSeason() {
		var i;
		var nGridders;

		//Age all players by 1 year and clear injuries
		this.Gridders.forEach(function(grddr){++grddr.Experience;});
		this.Gridders.forEach(function(grddr){grddr.Injury = 0;});

		//Retire projects who have lost their eligibility, promote all non-projects if space on 51-man roster
		nGridders = 0
		while (nGridders<this.Gridders.length)
	 if (this.Gridders[nGridders].Experience==2 && this.Gridders[nGridders].Status==GRIDDER.PROJECT)		//ineligible projects
		 this.RemovePlayer(this.Gridders[nGridders]);
	 else
		 ++nGridders;

		//For versatiles, check if they are never likely to make roster, flip them
		for (i=0;i<this.Gridders.length;++i)
		 if (this.Gridders[i].Status==GRIDDER.VERSATILE)
			 if (this.Gridders[i].Quality-this.Gridders[i].Potential>=15)	//NOTE: a fairly rough calculation given only 3/2 years remaining
		  this.Gridders[i].SwitchPosition();
	},
	TopOff(rtng) {
		var nGridders;
		var gridder;

		nGridders = this.Gridders.length;
		while (nGridders<PRACTICeSQUAD.SIZE) {
	 gridder = GridironUtils.CreateGridder(this.Randomizer.GetSlot(PositionDistribution));
	 Draft.SetNormal(gridder);
	 if (this.Randomizer.CheckBoolean())
		 ++gridder.Experience;
	 gridder.Target = 0;
	 gridder.Drafted = -1;
	 gridder.Type = GRIDDER.TYPE.PROJECT;
	 this.Gridders.push(gridder);
	 ++nGridders;
		}
	}
};
