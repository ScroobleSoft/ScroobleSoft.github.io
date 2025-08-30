
//-------------------------------------------------
//---------- OFFICE CALCULATOR --------------------
var OfficeCalculator = function() {
};
OfficeCalculator.prototype = new OfficeItem();
OfficeCalculator.prototype.Set = function(cnvs, specs) {
	OfficeItem.prototype.Set.call(this, cnvs, specs);

};
