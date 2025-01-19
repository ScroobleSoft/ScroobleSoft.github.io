/*
 *  UNLOGGED
 *
 */
//-----------------------------------------------
//---------- DOMINION BOMBER --------------------
var DominionBomber = function() {
   var Bombs;
   var Flares;
   var Chaffs;

   var LongCannonList;	//ISSUE: can't be one-shot
   var FlareList;
   var ChaffList;
   var BombList;
};
DominionBomber.prototype = new DominionJet();
DominionBomber.prototype.Set = function(specs, sprite) {
   DominionJet.prototype.Set.call(this, specs, sprite);

   this.WeaponSelected = AIrWEAPON.BOMB;
};
DominionBomber.prototype.SetWeaponLinks = function(lgList, fList, cList) {
   this.LongCannonList = lgList;
   this.FlareList = fList;
   this.ChaffList = cList;
};
DominionBomber.prototype.SetBonusWeaponLinks = function(bList) {
   this.BombList = bList;
};
