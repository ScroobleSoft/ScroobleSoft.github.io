
TacticalComponents.prototype.SetIslands = function() {
	var i;

	TinyIslands = new GenieArray();
	TinyIslands.Set(MAP.ISLANDS.TINY, TacticalIsland);
	TinyIslands.forEach(function(islnd) {islnd.SetType(ISLAND.TINY);} );
	SmallIslands = new GenieArray();
	SmallIslands.Set(MAP.ISLANDS.SMALL, TacticalIsland);
	SmallIslands.forEach(function(islnd) {islnd.SetType(ISLAND.SMALL);} );
	MediumIslands = new GenieArray();
	MediumIslands.Set(MAP.ISLANDS.MEDIUM, TacticalIsland);
	MediumIslands.forEach(function(islnd) {islnd.SetType(ISLAND.MEDIUM);} );
	LargeIslands = new GenieArray();
	LargeIslands.Set(MAP.ISLANDS.LARGE, TacticalIsland);
	LargeIslands.forEach(function(islnd) {islnd.SetType(ISLAND.LARGE);} );
	HugeIslands = new GenieArray();
	HugeIslands.Set(MAP.ISLANDS.HUGE, TacticalIsland);
	HugeIslands.forEach(function(islnd) {islnd.SetType(ISLAND.HUGE);} );

	CapitalIslands = new Array(MAP.ISLANDS.CAPITAL);

	Islands = [ TinyIslands, SmallIslands, MediumIslands, LargeIslands, HugeIslands ];
};
