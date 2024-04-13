
//-----------------------------------------------
//---------- GENIE LASER TIP --------------------
var GenieLaserTip = function() {
};
GenieLaserTip.prototype = new GenieProjectile();
GenieLaserTip.prototype.Set = function(specs, sprite, sSprite, sRect) {
   GenieProjectile.prototype.Set.call(this, specs, sprite, sSprite, null, sRect);

};
GenieLaserTip.prototype.Draw = function() {
   GenieProjectile.prototype.Draw.call(this);

   //UNLOGGED - rotate

};
