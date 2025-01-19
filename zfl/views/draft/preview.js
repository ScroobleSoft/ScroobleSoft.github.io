
//------------------------------------------------------
//---------- GRIDIRON DRAFT PREVIEW --------------------  UNLOGGED
var GridironDraftPreview = function() {
	var Draft;
	var NextButton, PreviousButton;
	var Slot, ProspectIndex;
	var MarkedProspects;
};
GridironDraftPreview.prototype = new GenieView();
GridironDraftPreview.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.MarkedProspects = new Array();
};
GridironDraftPreview.prototype.Update = function() {

	//-clicking marks a prospect, re-clicking it 'unmarks' it
};
