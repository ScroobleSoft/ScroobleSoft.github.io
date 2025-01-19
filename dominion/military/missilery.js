
//--------------------------------------------------
//---------- DOMINION MISSILERY --------------------
var DominionMissilery = function() {
   var SSMs;		//TODO: rename to Vagabonds, Venoms, Vaporizers?
   var SAMs;
   var ANMs;
   var ABMs;		//anti-ballistic missiles (REDUNDANT?)
   var TBMs;		//Tactical/Theatre ballistic missiles (REDUNDANT)
   var ICBMs;
};
DominionMissilery.prototype = {
   Set(cities) {
/*
      this.SSMs = new Array();
      this.SAMs = new Array();
      this.ANMs = new Array();
      this.ABMs = new Array();
      this.ICBMs = new Array();
*/
      this.SSMs = Math.round(2*cities);
      this.SAMs = Math.round(2*cities);
      this.ANMs = Math.round(2*cities);
      this.ABMs = Math.round(2*cities);
      this.TBMs = Math.round(2*cities);
      this.ICBMs = Math.round(2*cities);
   }
};
