
//---------------------------------------------
//---------- DOMINION NAVY --------------------
var DominionNavy = function() {
   var PatrolBoats;
   var GunBoats;
   var MissileBoats;
   var Frigates;
   var Cruisers;
   var Destroyers;
   var Battleships;
   var EscortCarriers, FleetCarriers, SuperCarriers;
   var Submarines;
   //NOTE: no separate arrays for weapons such as poseidrents, blazebolts, helicopters - will keep stock of these in ports
   //NOTE: no separate plane array - will be property of aircraft carrier
};
DominionNavy.prototype = {
   Set() {
/*
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
   }
};
