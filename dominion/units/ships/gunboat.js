
//-------------------------------------------------
//---------- DOMINION GUN BOAT --------------------
var DominionGunBoat = function() {
};
DominionGunBoat.prototype = new DominionShip();
DominionGunBoat.prototype.Set = function(specs, sprite) {
   DominionShip.prototype.Set.call(this, specs, sprite);

   this.Type = SHIP.GUnBOAT;
};
