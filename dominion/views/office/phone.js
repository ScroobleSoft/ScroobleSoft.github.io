
//--------------------------------------------
//---------- OFFICE PHONE --------------------
var OfficePhone = function() {
};
OfficePhone.prototype = new OfficeItem();
OfficePhone.prototype.Set = function(cnvs, specs) {
	OfficeItem.prototype.Set.call(this, cnvs, specs);

};
