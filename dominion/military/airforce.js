
//--------------------------------------------------
//---------- DOMINION AIR FORCE --------------------
var DominionAirForce = function() {
	var Nation;
	var Fighters;  //updated in conjunction w/ F1-F9s, used in Forces View
	var F1s, F2s, F3s, F4s, F5s, F6s, F7s, F8s, F9s;
	var Bombers;
	var Interceptors;
	var Interdictors;
	var Recons;
	var Refuellers;
	var Strafers;
	var Transports;
};
DominionAirForce.prototype = {
	Set(nation) {
		this.Nation = nation;
		this.SetUnits();

		//NOTE: at the moment the plan is to have individual units only if they have participated in combat
/*
		this.Bombers = new Array(JET.GRADES);
		this.Fighters = new Array(JET.GRADES);
		this.Interceptors = new Array(JET.GRADES);
		this.Interdictors = new Array(JET.GRADES);
		this.Recons = new Array(JET.GRADES);
		this.Refuellers = new Array(JET.GRADES);
		this.Strafers = new Array(JET.GRADES);
		this.Transports = new Array(JET.GRADES);
*/
	},
	SetUnits() {

		switch (this.Nation.Type) {
			case NATION.POWER:
				this.SetPowerJets();
				break;
			case NATION.ALLIED:
				this.SetAlliedJets();
				break;
		}
	},
	SetPowerJets() {

		this.SetPowerFighters();

		this.Bombers		= (this.Nation.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Interceptors	= (this.Nation.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Interdictors	= (this.Nation.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Recons			= (this.Nation.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Refuellers	= (this.Nation.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Strafers		= (this.Nation.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Transports	= (this.Nation.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	},
	SetPowerFighters() {

		this.F1s = 3 * POWER.CITIES * ArmsDistribution[this.Nation.Index][0];
		this.F2s = 3 * POWER.CITIES * ArmsDistribution[this.Nation.Index][0];
		this.F3s = 3 * POWER.CITIES * ArmsDistribution[this.Nation.Index][0];
		this.F4s = 2 * POWER.CITIES * ArmsDistribution[this.Nation.Index][1];
		this.F5s = 2 * POWER.CITIES * ArmsDistribution[this.Nation.Index][1];
		this.F6s = 2 * POWER.CITIES * ArmsDistribution[this.Nation.Index][1];
		this.F7s = 1 * POWER.CITIES * ArmsDistribution[this.Nation.Index][2];
		this.F8s = 1 * POWER.CITIES * ArmsDistribution[this.Nation.Index][2];
		this.F9s = 1 * POWER.CITIES * ArmsDistribution[this.Nation.Index][2];
	},
	SetAlliedJets() {

		this.Bombers		= ALLIED.CITIES;
		this.Interceptors	= 0;
		this.Interdictors	= 0;
		this.Recons			= 0;
		this.Refuellers	= 0;
		this.Strafers		= ALLIED.CITIES;
		this.Transports	= 0;
	},
	SetAlliedFighters() {

		this.F1s = 1 * ALLIED.CITIES;
		this.F2s = 1 * ALLIED.CITIES;
		this.F3s = 1 * ALLIED.CITIES;
		this.F4s = 1 * ALLIED.CITIES;
		this.F5s = 1 * ALLIED.CITIES;
		this.F6s = 1 * ALLIED.CITIES;
		this.F7s = 1 * ALLIED.CITIES;
		this.F8s = 1 * ALLIED.CITIES;
		this.F9s = 1 * ALLIED.CITIES;
	}
};
