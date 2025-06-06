
//-----------------------------------------
//---------- TOLL CLAN --------------------
var TollClan = function() {
   var Presidios;
   var Agents;
   var Commandants;
   var Army, Navy, AirForce;			//exist to facilitate easy transfer of units between stacks (maybe REDUNDANT)
   var LandStacks, SeaStacks, AirStacks;
   var LightMap;
   var Markers, Vaults;				//indicates ones discovered
   //-tiles in FOV
};
TollClan.prototype = {
   Set() {
      this.Presidios = new Array();
      this.LightMap = Utilities.Create2DArray(MAP.TILE.C, MAP.TILE.R);
      this.Agents = new Array();
      this.Commandants = new Array();
      this.Army = new Array();
      this.Navy = new Array();
      this.Air = new Array();
      this.LandStacks = new Array();
      this.SeaStacks = new Array();
      this.AirStacks = new Array();

      this.GenerateUnits();
   },
   GenerateUnits() {
      var cmndnt;

      //UNLOGGED

      cmndnt = new TollCommandant();
      cmndnt.Set(this);
   }
/*
   AssignPresidio(prsdio) {

      //UNLOGGED

      prsdio.Clan = this;
      this.Presidios.push(prsdio);
      //TODO: take care of garrison
   }
*/
};
