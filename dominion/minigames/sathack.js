
//-grid (9x9)
//-2x9 triangles (top row, left column)
//-use rect boxes to pick up triangle clicks (even though it is not accurate)
//-need lighter colours for beams so locks show up
//-need graphics for locks
//-Specs = { SWITCH: { COUNT: { TOP: 9, LEFT: 9 } }, TYPE: { TOP: 0, LEFT: 1 }, LEFT: { L: , T: }, TOP: { L: , T: }, W: -1, H: -1, GAP: -1 }

//---------------------------------------------------------------
//---------- DOMINION SATELLITE HACKING VIEW --------------------
var DominionSatelliteHackingView = function() {
	var Grid;
	var TopTriangles, LeftTriangles;
//	var Locks; - will be in the grid

	var i;
};
DominionSatelliteHackingView.prototype = new GenieView();
DominionSatelliteHackingView.prototype.Set = function() {
	GenieView.prototype.Set.call(this);

};
DominionSatelliteHackingView.prototype.SetImages = function() {  //UNLOGGED
};
DominionSatelliteHackingView.prototype.SetComponents = function() {  //UNLOGGED
/*
	this.Grid = new SatelliteHackingGrid();
	this.Grid.Set(this.GraphicsTool, this.Randomizer);
	this.SetTriangles();
	//-Locks - part of grid;
*/
};
DominionSatelliteHackingView.prototype.SetTriangles = function() {  //UNLOGGED
/*
	this.TopTriangles = new GenieArray();
	this.TopTriangles.Set(this.Specs.SWITCH.COUNT.TOP, SatelliteHackingSwitch, INDEXED, this);
	this.LeftTriangles = new GenieArray(this.Specs.SWITCH.COUNT.LEFT);
	this.LeftTriangles.Set(this.Specs.SWITCH.COUNT.LEFT, SatelliteHackingSwitch, INDEXED, this);
*/
};
DominionSatelliteHackingView.prototype.Open = function() {  //UNLOGGED
};
DominionSatelliteHackingView.prototype.Update = function() {  //UNLOGGED - TODO: this may not have an internal loop

	for (this.i=0;this.i<this.Specs.SWITCH.COUNT.TOP;++this.i) {

		//Top
		if (!this.TopTriangles[this.i].CheckOn())
			if (this.TopTriangles[this.i].CheckClicked()) {
				this.Grid.ShineBeam(this.i, this.Specs.SWITCH.TYPE.TOP);
				break;
			}

		//Left
		if (!this.LeftTriangles[this.i].CheckOn())
			if (this.LeftTriangles[this.i].CheckClicked()) {
				this.Grid.ShineBeam(this.i, this.Specs.SWITCH.TYPE.LEFT);
				break;
			}
	}

	if (this.i!=this.Specs.SWITCH.COUNT.TOP) {
		//-check if max tries has been reached
	}
};
DominionSatelliteHackingView.prototype.Draw = function() {  //UNLOGGED
};
