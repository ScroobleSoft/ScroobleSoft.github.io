
//---------------------------------------------------
//------------ TACTICAL UNIT ------------------------
var TacticalUnit = function() {
	var EastSprtie, WestSprite;
	var Clan;
	var Type;
	var Shield, Reload, Potency;
};
TacticalUnit.prototype = new GenieAgent();
TacticalUnit.prototype.Set = function(specs, sprite, wSprite) {
	GenieAgent.prototype.Set.call(this, specs, sprite);

	this.EastSprite = this.Sprite;
	this.WestSprite = wSprite;
	this.Direction = DIRECTION.E;
	this.Shield = this.Specs.SHIELD;
	this.Reload = this.Specs.RELOAD;
	this.Potency = this.Specs.POTENCY;
};
TacticalUnit.prototype.SetDirection = function(direction) {

	this.Direction = direction;
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
TacticalUnit.prototype.Draw = function(bStatic) {

	if (!bStatic)
		this.DetermineScreenCoords();

	if (this.Direction==DIRECTION.E)
		this.EastSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.Clan.Index);
	else
		this.WestSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.Clan.Index);
/*
	if (this.Direction==DIRECTION.E)
		this.Sprite = this.EastSprite;
	else
		this.Sprite = this.WestSprite;

	GenieAgent.prototype.Draw.call(this);
*/
};
/*
TacticalUnit.prototype.ExecuteDraw = function() {

	if (this.Direction==DIRECTION.E)
		this.Sprite = this.EastSprite;
	else
		this.Sprite = this.WestSprite;

	GenieAgent.prototype.ExecuteDraw.call(this);
};
*/
