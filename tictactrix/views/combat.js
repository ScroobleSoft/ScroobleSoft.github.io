/*
		** units fire at each other a round, or turn, at a time
		** combat has each unit picking up a random target and firing at it, round per round
		** it is ensured that there is as much target distribution as possible
		** for a tactical angle, the player can choose the target for each unit, the firing happening per round
*/
//----------------------------------------------------
//---------- TACTICAL COMBAT VIEW --------------------
var TacticalCombatView = function() {
	var Round;
	var LeftStack, RightStack;  //-need a new struct that contains .Target field, as won't use agents here (stacks will be arrays of these)
};
TacticalCombatView.prototype = new GenieView();
TacticalCombatView.prototype.Set = function(specs, sprite) {
	GenieView.prototype.Set.call(this, specs, sprite);

	this.Round = 0;
};
TacticalCombatView.prototype.SetStacks = function(lStack, rStack) {  //UNLOGGED

	//-the actual step of determine stack composition for multiple stacks won't be done here, but will already be taken care of
};
TacticalCombatView.prototype.Update = function() {  //UNLOGGED
	//-right now there will be an instant calculation
};
TacticalCombatView.prototype.DetermineTargets = function(lStack, rStack) {  //UNLOGGED
};
TacticalCombatView.prototype.Draw = function() {  //UNLOGGED

	this.DrawBackground();
	this.DrawUnits();
};
TacticalCombatView.prototype.DrawBackground = function() {
	var i;

	//Combat surface
	switch(this.LeftStack.Type) {
		case TACTICAlUNIT.VARIETIES.LAND:
			Graphics.DrawRectangle(40, 40, 120, 320, MAP.COLOUR.LAND, 0);
			Graphics.DrawRectangle(240, 40, 120, 320, MAP.COLOUR.LAND, 0);
			break;
		case TACTICAlUNIT.VARIETIES.SEA:
			Graphics.DrawRectangle(40, 40, 120, 320, MAP.COLOUR.SEA, 0);
			Graphics.DrawRectangle(240, 40, 120, 320, MAP.COLOUR.SEA, 0);
			break;
		case TACTICAlUNIT.VARIETIES.AIR:
			Graphics.DrawRectangle(40, 40, 120, 320, MAP.COLOUR.SKY, 0);
			Graphics.DrawRectangle(240, 40, 120, 320, MAP.COLOUR.SKY, 0);
			break;
	}

	//Frames
	Graphics.DrawRectangle(40, 40, 120, 320, "black", 2);
	Graphics.DrawRectangle(240, 40, 120, 320, "black", 2);

	//Slot dividers
	for (i=1;i<=STACK.UNITS.MAX;++i) {
		Graphics.DrawHorizontalLine( { X: 40, Y: 40}, 120+(40*i), "black", 1);
		Graphics.DrawHorizontalLine( { X: 240, Y: 40}, 120+(40*i), "black", 1);
	}
};
TacticalCombatView.prototype.DrawUnits = function() {  //UNLOGGED
	var i;
	//-set ScreenCoords
	//-ExecuteDraw
	//-projectiles+plumes/explosions/trails etc.
};
