
//--------------------------------------------------
//---------- SOLAR DOCKING VIEW --------------------
var SolarDockingView = function() {
	var ShipPosition;
	var TrafficShips;
	var Dock;

	var i;
};
SolarDockingView.prototype = new GenieView();
SolarDockingView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetShips();
	this.SetDock();
};
SolarDockingView.prototype.SetShips = function() {  //UNLOGGED

	this.ShipPosition = new Coordinate2D();
	this.TrafficShips = ArrayUtils.Create2D(this.Specs.SHIPS, function() {var X, Y, Type, Direction;} );
};
SolarDockingView.prototype.SetDock = function() {  //UNLOGGED

	//-this will set up the 'teeth' that will advance and retract rhythmically, like a Mexican Wave
};
