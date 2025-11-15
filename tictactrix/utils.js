
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
				return (TACTICAlUNIT.VARIETIES.LAND);
			case unit<=TACTICAlUNIT.BATTLESHIP:
				return (TACTICAlUNIT.VARIETIES.SEA);
			default:
				return (TACTICAlUNIT.VARIETIES.AIR);
		}
	},
	GetNeighbouringTile(tile) {
		var iTle;
		var tle;

		iTle = Randomizer.GetIndex(NeighbouringTiles.length);
		tle = new GenieTile();
		tle.Set(tile.C+NeighbouringTiles[iTle][0], tile.R+NeighbouringTiles[iTle][1]);

		return (tle);
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
