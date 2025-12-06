
//--------------------------------------------------
//---------- TACTICAL UTILITIES --------------------
var TacticalUtilities = function() {
};
TacticalUtilities.prototype = {
	Set() {  //REDUNDANT?
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
		stck.ListIndex = Stacks.Slot(stck);
		Map.Tiles[tile.C][tile.R].SetStack(stck);
	}
};
