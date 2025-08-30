
//-----------------------------------------------------
//---------- OFFICE REMOTE CONTROL --------------------  TODO: switching monitors b/w ministers/powers
var OfficeRemoteControl = function() {
};
OfficeRemoteControl.prototype = new OfficeItem();
OfficeRemoteControl.prototype.Set = function(cnvs, specs) {
	OfficeItem.prototype.Set.call(this, cnvs, specs);

};
OfficeRemoteControl.prototype.Clicked = function() {  //UNLOGGED

	//-a small window opens up showing a channel list, choosing an item switching to that content
};
