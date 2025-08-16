
//---------------------------------------------
//---------- DOMINION NAVY --------------------
var DominionNavy = function() {
	var Nation;
   var PatrolBoats;
   var GunBoats;
   var MissileBoats;
   var Frigates;
   var Cruisers;
   var Destroyers;
   var Battleships;
   var Submarines;		//should move to ministry of information (for espionage)
   //NOTE: no separate arrays for weapons such as poseidrents, blazebolts, helicopters - will keep stock of these in ports
   //NOTE: no separate plane array - will be property of aircraft carrier
};
DominionNavy.prototype = {
   Set(nation) {
		this.Nation = nation;
		this.SetUnits();
/* REDUNDANT
      //NOTE: at the moment the plan is to have individual units only if they have participated in combat
      this.Transports = new Array();
      this.GunBoats = new Array();
      this.MissileBoats = new Array();
      this.Frigates = new Array();
      this.Cruisers = new Array();
      this.Destroyers = new Array();
      this.Battleships = new Array();
      this.Carriers = new Array();
      this.Submarines = new Array();

      this.PatrolBoats = Math.round(0.5*cities);
      this.GunBoats = Math.round(0.5*cities);
      this.MissileBoats = Math.round(0.5*cities);
      this.Frigates = Math.round(0.5*cities);
      this.Cruisers = Math.round(0.5*cities);
      this.Destroyers = Math.round(0.5*cities);
      this.Battleships = Math.round(0.5*cities);
      this.SmallCarriers = Math.round(0.5*cities);
      this.Carriers = Math.round((0.5*cities)/2);
      this.SuperCarriers = Math.round((0.5*cities)/4);
      this.Submarines = Math.round(0.5*cities);
*/
	},
	SetUnits() {

		switch (this.Nation.Type) {
			case NATION.POWER:
				this.SetPowerShips();
				break;
			case NATION.ALLIED:
				this.SetAlliedShips();
				break;
		}
	},
	SetPowerShips() {

		this.PatrolBoats  = (this.Nation.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;

		this.GunBoats		 = 3 * POWER.CITIES * ArmsDistribution[this.Nation.Index][0];
		this.MissileBoats	 = 3 * POWER.CITIES * ArmsDistribution[this.Nation.Index][0];
		this.Frigates		 = 2 * POWER.CITIES * ArmsDistribution[this.Nation.Index][1];
		this.Cruisers		 = 2 * POWER.CITIES * ArmsDistribution[this.Nation.Index][1];
		this.Destroyers	 = 1 * POWER.CITIES * ArmsDistribution[this.Nation.Index][2];
		this.Battleships	 = 1 * POWER.CITIES * ArmsDistribution[this.Nation.Index][2];
		/* this is the old approach, and currently REDUNDANT
		this.PatrolBoats  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.GunBoats	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.MissileBoats = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Frigates	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Cruisers	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Destroyers	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Battleships  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Submarines	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		*/

		this.Submarines	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;		//might move since used for espionage missions
	},
	SetAlliedShips() {

		this.PatrolBoats	 = 1 * ALLIED.CITIES;

		this.GunBoats		 = 2 * ALLIED.CITIES;
		this.MissileBoats	 = 2 * ALLIED.CITIES;
		this.Frigates		 = 1 * ALLIED.CITIES;
		this.Cruisers		 = 1 * ALLIED.CITIES;
		this.Destroyers	 = 0;
		this.Battleships	 = 0;

		this.Submarines	 = 1 * ALLIED.CITIES;
	}
};
