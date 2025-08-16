
//-- BATTLE ARRAY --
var BattleArray = function() {
	var LARTs, MARTs, HARTs;
	var Jeeps, Howitzers, APCs;
	var AVs, Artilleries, IFVs;
	var MobileGuns, Trucks, Tanks;
	var AAGuns, ATWs, LCGs;
	var Helicopters;
	var GunBoats, MissileBoats;
	var Frigates, Cruisers;
	var Destroyers, Battleships;
	var EscortCarriers, LightCarriers, FleetCarriers, SuperCarriers;
	var F1s, F2s, F3s, F4s, F5s, F6s, F7s, F8s, F9s;
	var Bombers, Interceptors, Interdictors, Strafers;
//	var PatrolBoats, Submarines, Recons, Refuellers, Transports;	not likely to participate in battle
};
BattleArray.prototype = {  //REDUNDANT?
	Set() {
	}
};

//-- DOMINION ALLIANCE --
var DominionAlliance = function() {
	var Type;
	var Power, Ally;
};
DominionAlliance.prototype = {
	Set(pwr, ally, type) {
		this.Power = pwr;
		this.Ally = ally;
		this.Power.Alliances.push(this);
		this.Ally.Alliance = this;
	}
};
