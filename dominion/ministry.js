
//-------------------------------------------------
//---------- DOMINION MINISTRY --------------------
var DominionMinistry = function() {
   var Nation;
   var Minister;
   var Level;
   var Inventory;   //e.g. energy (untapped resources), food (granary equivalent)
};
DominionMinistry.prototype = {
   Set(nation) {
      this.Nation = nation;
      this.Level = 1;
      this.Inventory = 0;
   }
};
