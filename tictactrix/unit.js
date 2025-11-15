
//---------------------------------------------------
//------------ TACTICAL UNIT ------------------------
var TacticalUnit = function() {
	var Clan;
	var Type;
	var Shield, Reload, Potency;
};
TacticalUnit.prototype = new GenieAgent();
TacticalUnit.prototype.Set = function(specs, sprite) {
	GenieAgent.prototype.Set.call(this, specs, sprite);

	this.Direction = DIRECTION.E;
	this.Shield = this.Specs.SHIELD;
	this.Reload = this.Specs.RELOAD;
	this.Potency = this.Specs.POTENCY;
};
TacticalUnit.prototype.SetClan = function(clan) {

	this.Clan  = clan;
};
TacticalUnit.prototype.SetTile = function(tile) {
	GenieAgent.prototype.SetTile.call(this, tile.C, tile.R);

	this.Position.X = (this.Tile.C*MAP.TILE.W) + this.Specs.OFFSET.X;
	this.Position.Y = (this.Tile.R*MAP.TILE.H) + this.Specs.OFFSET.Y;
};
TacticalUnit.prototype.Update = function() {  //UNLOGGED

	//-maybe REDUNDANT because is here only for reloading, which may not be needed
};
