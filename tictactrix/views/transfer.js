
//--------------------------------------------------
//---------- UNIT TRANSFER VIEW --------------------
var UnitTransferView = function() {
	var Clan;
	var SourceStack, DestinationStack;
};
UnitTransferView.prototype = new GenieView();
UnitTransferView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
UnitTransferView.prototype.SetClan = function(clan) {  //UNLOGGED

	this.Clan = clan;
};
UnitTransferView.prototype.SetStacks = function(sStack, tStack) {  //UNLOGGED

	this.SourceStack = sStack;
	this.DestinationStack = dStack;
};
UnitTransferView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {  //TODO: call ::Close, as is usual, especially when this has sub-views
/*
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.AlignRects();
		PlayView.Open();
		PlayView.Update();
*/
	}
};
UnitTransferView.prototype.Draw = function() {  //UNLOGGED
};
