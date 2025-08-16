
//---------------------------------------------
//---------- DOMINION ARMY --------------------
var DominionArmy = function() {
	var Nation;
	var LARTs, MARTs, HARTs;
	var Jeeps, Howitzers, APCs;			//can have anti-tank guns/missiles
	var AVs, Artilleries, IFVs;
	var MobileGuns, Trucks, Tanks;
	var AAGuns, ATWs, LCGs;					//.AAGuns fire flak
	var Helicopters;
};
DominionArmy.prototype = {
	Set(nation) {
		this.Nation = nation;
		this.SetUnits();
	},
	SetUnits() {

		switch (this.Nation.Type) {
			case NATION.POWER:
				this.SetPowerUnits();
				break;
			case NATION.ALLIED:
				this.SetAlliedUnits();
				break;
		}
	},
	SetPowerUnits() {
		var scale;

		scale = 1.0;
		if (this.Nation.Index==POWER.TOMCAT)
			scale *= 2;

		this.LARTs =			8 * POWER.CITIES * (ArmsDistribution[this.Nation.Index][0]+scale);
		this.MARTs =			6 * POWER.CITIES * (ArmsDistribution[this.Nation.Index][1]+scale);
		this.HARTs =			4 * POWER.CITIES * (ArmsDistribution[this.Nation.Index][2]+scale);
		this.Jeeps =			8 * POWER.CITIES * ArmsDistribution[this.Nation.Index][0];
		this.Howitzers =		8 * POWER.CITIES * ArmsDistribution[this.Nation.Index][0];
		this.APCs =				8 * POWER.CITIES * ArmsDistribution[this.Nation.Index][0];
		this.AVs =				6 * POWER.CITIES * ArmsDistribution[this.Nation.Index][1];
		this.Artilleries =	6 * POWER.CITIES * ArmsDistribution[this.Nation.Index][1];
		this.IFVs =				6 * POWER.CITIES * ArmsDistribution[this.Nation.Index][1];
		this.MobileGuns =		4 * POWER.CITIES * ArmsDistribution[this.Nation.Index][2];
		this.Trucks =			4 * POWER.CITIES * ArmsDistribution[this.Nation.Index][2];
		this.Tanks =			4 * POWER.CITIES * ArmsDistribution[this.Nation.Index][2];
		this.AAGuns =			2 * POWER.CITIES * scale;
		this.ATWs =				2 * POWER.CITIES * scale;
		this.LCGs =				2 * POWER.CITIES * scale;
		this.Helicopters =	2 * POWER.CITIES * scale;
/* this is the old approach, and currently REDUNDANT
		this.LARTs =			(this.Index==POWER.TOMCAT) ? 16*POWER.CITIES : 8*POWER.CITIES;
		this.MARTs =			(this.Index==POWER.TOMCAT) ? 16*POWER.CITIES : 8*POWER.CITIES;
		this.HARTs =			(this.Index==POWER.TOMCAT) ? 16*POWER.CITIES : 8*POWER.CITIES;
		this.Jeeps =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Howitzers =	(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.AVs =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.MobileGuns =	(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Artillery =	(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Tanks =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.AAGuns =		(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.ATWs =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.LCGs =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Helicopters =	(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
*/
	},
	SetAlliedUnits() {

		this.LARTs		  = 4 * ALLIED.CITIES;
		this.MARTs		  = 3 * ALLIED.CITIES;
		this.HARTs		  = 2 * ALLIED.CITIES;
		this.Jeeps		  = 4 * ALLIED.CITIES;
		this.Howitzers	  = 4 * ALLIED.CITIES;
		this.APCs		  = 4 * ALLIED.CITIES;
		this.AVs			  = 3 * ALLIED.CITIES;
		this.Artilleries = 3 * ALLIED.CITIES;
		this.IFVs		  = 3 * ALLIED.CITIES;
		this.MobileGuns  = 2 * ALLIED.CITIES;
		this.Trunks		  = 2 * ALLIED.CITIES;
		this.Tanks		  = 2 * ALLIED.CITIES;
		this.AAGuns		  = 1 * ALLIED.CITIES;
		this.ATWs		  = 1 * ALLIED.CITIES;
		this.LCGs		  = 1 * ALLIED.CITIES;
		this.Helicopters = 1 * ALLIED.CITIES;
	}
};
