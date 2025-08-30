
//---------------------------------------------
//---------- OFFICE LAPTOP --------------------  screen might pop up, or still display things if not - this is how monitor bank is cycled through
var OfficeLaptop = function() {
};
OfficeLaptop.prototype = new OfficeItem();
OfficeLaptop.prototype.Set = function(cnvs, specs) {
	OfficeItem.prototype.Set.call(this, cnvs, specs);

};
