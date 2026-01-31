
//-------------------------------------------------
//---------- TACTICAL HOWITZER --------------------
var TacticalHowitzer = function() {
};
TacticalHowitzer.prototype = new TacticalLandUnit();
TacticalHowitzer.prototype.Set = function(specs, sprite, wSprite) {
	TacticalLandUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.HOWITZER;
	this.UndercarriageSpecs = this.Specs.TREAD;
	this.UndercarriageSprite = SmallTreadSprite;
};
/*
TacticalHowitzer.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E)
		SmallTreadSprite.Draw(this.ScreenCoords.X+this.Specs.TREAD.E.X, this.ScreenCoords.Y+this.Specs.TREAD.E.Y, (this.Clan.Index*this.Specs.S)+this.state);
	else
		SmallTreadSprite.Draw(this.ScreenCoords.X+this.Specs.TREAD.W.X, this.ScreenCoords.Y+this.Specs.TREAD.W.Y, (this.Clan.Index*this.Specs.S)+this.state);
};
*/
