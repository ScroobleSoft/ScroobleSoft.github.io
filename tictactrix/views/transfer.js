
//--------------------------------------------------
//---------- UNIT TRANSFER VIEW --------------------
var UnitTransferView = function() {
	var OkButton, CancelButton;		//TODO: will have to store moves in temp arrays in case 'CANCEL' is clicked
	var Clan;
	var SourceStack, DestinationStack;
	var SourceStackUnits, DestinationStackUnits;
};
UnitTransferView.prototype = new GenieView();
UnitTransferView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLists();
};
UnitTransferView.prototype.SetControls = function() {  //UNLOGGED

	this.OkButton = this.SetTextButton(this.Specs.BUTTON.OK, RaisedCornerImages, Text);
	this.CancelButton = this.SetTextButton(this.Specs.BUTTON.CANCEL, RaisedCornerImages, Text);
};
UnitTransferView.prototype.SetLists = function() {  //UNLOGGED - don't think this is REDUNDANT

	this.SourceStackUnits = new Array(STACK.UNITS.MAX);
	this.SourceStackUnits.fill(-1);
	this.DestinationStackUnits = new Array(STACK.UNITS.MAX);
	this.DestinationStackUnits.fill(-1);
};
UnitTransferView.prototype.SetClan = function(clan) {  //UNLOGGED - REDUNDANT?

	this.Clan = clan;
};
UnitTransferView.prototype.SetStacks = function(sStack, dStack) {

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

	if (this.OkButton.CheckClicked()) {
		//-eventually, enforce changes made (right now it's a simple merge, irrespective of overflows)
		ArrayUtils.Combine(this.SourceStack.Units, this.DestinationStack.Units);
		if (this.SourceStack.Units.length==0)
			this.DestinationStack.Clan.DeleteStack(this.SourceStack);
		PlayView.SelectedStack = this.DestinationStack;
		this.Close(this.OpenPlayView.bind(this), 100);
	}

	if (this.CancelButton.CheckClicked()) {
		//-nothing for now
	}
};
UnitTransferView.prototype.Draw = function() {  //UNLOGGED

	//TEMP
	Text.Write("Will just transfer everything over for now,", 5, 20);
	Text.Write("even if it triggers overflows.", 5, 35);
};
UnitTransferView.prototype.OpenPlayView = function() {  //UNLOGGED

	PlayView.Open();
	PlayView.Update();
};
