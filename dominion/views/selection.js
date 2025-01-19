/*
	** simply picking a side (power), or else picking one and then choosing colour/location/government
*/
//-----------------------------------------------------
//---------- NATION SELECTION VIEW --------------------
var NationSelectionView = function() {
};
NationSelectionView.prototype = new GenieView();
NationSelectionView.prototype.Set = function(canvas, specs) {
	GenieView.prototype.Set.call(this, canvas, specs);

};
