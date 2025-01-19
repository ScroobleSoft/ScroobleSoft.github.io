/*
	** up to 8 fleets can be built? Tomcat may want to have 16?
	** process starts by picking a carrier, selecting jets to place on it, then adding cohort ships
*/
//----------------------------------------------------
//---------- FLEET SELECTION VIEW --------------------
var FleetSelectionView = function() {
};
FleetSelectionView.prototype = new GenieView();
FleetSelectionView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
