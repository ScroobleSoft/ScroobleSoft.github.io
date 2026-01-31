
//--------------------------------------------------------
//------------ TACTICAL LAND UNIT ------------------------
var TacticalLandUnit = function() {
	var UndercarriageSpecs, UndercarriageSprite;
};
TacticalLandUnit.prototype = new TacticalUnit();
TacticalLandUnit.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

};
TacticalLandUnit.prototype.Draw = function() {

	this.DrawOrdnance();

	TacticalUnit.prototype.Draw.call(this);

	this.DrawUndercarriage();
};
TacticalLandUnit.prototype.DrawUndercarriage = function() {

	//Set offsets
	if (this.Direction==DIRECTION.E) {
		this.x = this.ScreenCoords.X + this.UndercarriageSpecs.E.X;
		this.y = this.ScreenCoords.Y + this.UndercarriageSpecs.E.Y;
	} else {
		this.x = this.ScreenCoords.X + this.UndercarriageSpecs.W.X;
		this.y = this.ScreenCoords.Y + this.UndercarriageSpecs.W.Y;
	}

	this.UndercarriageSprite.Draw(this.x, this.y, (this.Clan.Index*this.Specs.S));
};
TacticalLandUnit.prototype.DrawOrdnance = function() {  //UNLOGGED - TEMP, remove when implemented in all derived classes
};
