
//--------------------------------------------------
//---------- TACTICAL UTILITIES --------------------
var TacticalUtilities = function() {
	var Context;
};
TacticalUtilities.prototype = {
	Set(context) {
		this.Context = context;
	},
	GetUnitType(unit) {

		switch (true) {
			case unit<=TACTICAlUNIT.MEGaTANK:
				return (TACTICAlUNIT.TYPE.LAND);
			case unit<=TACTICAlUNIT.BATTLESHIP:
				return (TACTICAlUNIT.TYPE.SEA);
			default:
				return (TACTICAlUNIT.TYPE.AIR);
		}
	},
	CreateStack(type, clan, tile, unit) {
		var stck;

		stck = new TacticalStack();
		stck.Set(type, clan, tile);
		stck.AddUnit(unit);
		clan.AddStack(stck);
		Map.Tiles[tile.C][tile.R].SetStack(stck);
	},
	DisplayUnit(context, x, y, unit, direction, clan) {  //NOTE: unit is index
		var l, t;

		//Adjust Screen Rect
		l = ScreenRect.L;
		t = ScreenRect.T;
		ScreenRect.L = 0;
		ScreenRect.T = 0;

		TacticalUnits[unit].SwitchContext(context);
		TacticalUnits[unit].SetDirection(direction);
		TacticalUnits[unit].SetClan(clan);
		TacticalUnits[unit].SetPosition( { X: x, Y: y } );
		TacticalUnits[unit].Draw(true);
		TacticalUnits[unit].SwitchContext(this.Context);

		//Restore Screen Rect to previous values
		ScreenRect.L = l;
		ScreenRect.T = t;
	}
};
