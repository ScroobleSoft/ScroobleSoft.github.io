/*
		** any ship transfroms into a pad
		** destructible
		** pad strength shown in digits
		** 'split' 1 ship off from stack, convert to platform
		** no extra turn is needed to attack a platform - as soon as ship-pads are in place, stacks can be teleported and used to attack in 1 turn
*/
//--------------------------------------------
//---------- TACTICAL PAD --------------------
var TacticalPad = function() {
	var Tile;
	var Stack;
};
TacticalPad.prototype = {
	Set() {
		this.Tile = new GenieTile();
	},
	SetTile(tile) {  //UNLOGGED

		this.Tile = tile;
	},
	TeleportStack(stack) {  //UNLOGGED

		this.Stack = stack;
		//-draw if on screen?
	},
	Draw() {  //UNLOGGED
	}
};
