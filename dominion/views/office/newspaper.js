
//--------------------------------------------------
//---------- OFFICE PAPER STASH --------------------
var OfficePaperStash = function() {
};
OfficePaperStash.prototype = new OfficeItem();
OfficePaperStash.prototype.Set = function(cnvs, specs) {
	OfficeItem.prototype.Set.call(this, cnvs, specs);

};
