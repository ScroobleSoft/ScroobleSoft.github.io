
//---------------------------------------------------------
//------------ TACTICAL BATTLESHIP ------------------------  UNLOGGED
var TacticalBattleship = function() {
};
TacticalBattleship.prototype = new TacticalShip();
TacticalBattleship.prototype.Set = function(specs, sprite, wSprite) {
	TacticalShip.prototype.Set.call(this, specs, sprite, wSprite);

};
