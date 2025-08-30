
//------------------------------------------
//---------- OFFICE PDA --------------------  TODO: could play word games here
var OfficePDA = function() {
};
OfficePDA.prototype = new OfficeItem();
OfficePDA.prototype.Set = function(cnvs, specs) {
	OfficeItem.prototype.Set.call(this, cnvs, specs);

};
