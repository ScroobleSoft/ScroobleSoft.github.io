
//-------------------------------------------
//---------- GENIE LASER --------------------
var GenieLaser = function() {	//Specs = { COLOUR: "", LW: -1, OPACITY: -1, DECREMENT: 1 }
	var GraphicsTool;
	var ScreenRect;
	var LineWidth, Opacity, Decrement;
	var Destination, ScreenDestination, Gradient;

	var i, rct;
};
GenieLaser.prototype = new GenieFX();
GenieLaser.prototype.Set = function(specs, sprite, gTool, cPad, sRect) {  //TODO: passing last 3 arguments seems REDUNDANT
	GenieFX.prototype.Set.call(this, specs, sprite, gTool, cPad, sRect);

	if (this.Specs) {
		this.LineWidth = this.Specs.LW;
		this.Opacity = this.Specs.OPACITY;
		this.Decrement = this.Specs.DECREMENT;
	} else {
		this.LineWidth = LASER.LW;
		this.Opacity = LASER.OPACITY;
		this.Decrement = LASER.DECREMENT;
	}
	this.Destination = new Coordinate2D();
	this.ScreenDestination = new Coordinate2D();
	this.rct = new GenieRect();
};
GenieLaser.prototype.SetLinks = function(gTool, sRect) {

	this.GraphicsTool = gTool;
	this.ScreenRect = sRect;
};
GenieLaser.prototype.Activate = function(pos, dstn, grdnt, colour, lw, opcty) {
	GenieFX.prototype.Activate.call(this, pos);

	this.Gradient = grdnt;
	this.Colour = this.Colour || colour;
	this.Colour = this.Colour || LASER.COLOUR;
	this.LineWidth = this.LineWidth || lw;
	this.LineWidth = this.LineWidth || LASER.LW;
	this.Opacity = opcty || 1.0;
	this.Opacity = opcty || LASER.OPACITY;
	this.Destination.Set(dstn.X, dstn.Y);
	this.Charge = 0;
};
GenieLaser.prototype.DetermineScreenCoords = function() {
	GenieFX.prototype.DetermineScreenCoords.call(this);

	this.ScreenDestination.Set(this.Destination.X, this.Destination.Y);
	if (this.ScreenRect) {
		this.ScreenDestination.X -= this.ScreenRect.L;
		this.ScreenDestination.Y -= this.ScreenRect.T;
	}

	if (this.Specs.PERSPECTIVE)
		GeoUtils.PerspectiveAdjust(this.ScreenDestination, this.Specs.PERSPECTIVE);
};
GenieLaser.prototype.CheckOnScreen = function() {  //TODO: .ScreenQuad will be checked in some cases

	this.rct.L = this.Position.X;
	this.rct.T = this.Position.Y;
	this.rct.W = this.Destination.X - this.Position.X;
	this.rct.H = this.Destination.Y - this.Position.Y;
	return (SpaceUtils.CheckBoxBoxIntersection(this.rct, this.ScreenRect));
};
GenieLaser.prototype.Draw = function() {

	this.DetermineScreenCoords();
	this.GraphicsTool.DrawLine(this.ScreenPosition, this.ScreenDestination, this.Colour, this.LineWidth, this.Opacity);
};
GenieLaser.prototype.Update = function() {
	GenieFX.prototype.Update.call(this);

	this.Opacity -= this.Decrement;
	if (this.Opacity<=0) {
		this.Opacity = 1.0;
		this.Extant = false;
	}
/*
	if (this.Opacity==1.0) {
		if (this.CheckCollision())
	 this.Opacity -= 0.01;		//NOTE: picking an arbitrary number here
	} else
		if (this.Extant)  //NOTE: in here to protect from divide by zero - may be REDUNDANT
	 this.Opacity = this.Extant/this.Frames;
*/
};
GenieLaser.prototype.CheckCollision = function() {  //l-list . . . format { Type: comrade/foe/building, Agent: Object };? . . . REDUNDANT

	//UNLOGGED - probably will re-write this, or maybe it will be in GenieSpace only
	return;

	line.Set(this.Position.X, this.Position.Y, this.Destination.X, this.Destination.Y);
	for (this.i=0;this.i<this.ScreenManager.VisibleObjects.Length;++this.i)
//		if (this.ScreenManager.VisibleObjects[this.i].Type==ENTITY.FOE) {
		if (this.Agent.CheckFoe)
	 if (this.Agent.CheckFoe(this.ScreenManager.VisibleObjects[this.i])) {
		 this.ScreenManager.VisibleObjects[this.i].DetermineFootprint();
		 if (this.CalcPad.CheckLineBoxIntersection(line, this.ScreenManager.VisibleObjects[this.i].Footprint)) {

			 //TODO: change .Destination to collision coordinates

			 this.ScreenManager.VisibleObjects[this.i].Hit();
			 return (true);
		 }
		} else {  //another check for neutral (pertains to terrain features) where will still fire, the terrain reacting whether it is destructible or not
	 //-deactivate laser and draw 'no entry icon' either on comrade/neutral or at the collision coords
	 //-also, if an obstacle is hit, like a non-foe building or terrain feature, then destination should be reset and opacity decremented
		}
/*
	 rect.Set(this.Position.X, this.Position.Y, this.Destination.X-this.Position.X, this.Destination.Y-this.Position.Y);  //WARNING: topsy-turvy?
	 if (GeoUtils.CheckBoxBoxIntersection(rect, lObjects[this.i].Footprint)) {
		 //-get line-box intersection point
		 //-inform object that it has been hit
	 }
*/
};
