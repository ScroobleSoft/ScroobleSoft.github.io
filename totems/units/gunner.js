
//-------------------------------------------
//---------- TOLL GUNNER --------------------
var TollGunner = function() {
};
TollGunner.prototype = new TollUnit();
TollGunner.prototype.Set = function(specs, sprite, drctn) {
   TollUnit.prototype.Set.call(this, specs, sprite, drctn);

   this.Type = UNIT.GUNNER;
};
