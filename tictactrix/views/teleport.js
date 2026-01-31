/*
		** derived from Play View - would make sense
*/
//--------------------------------------------------
//---------- UNIT TELEPORT VIEW --------------------
var UnitTeleportView = function() {
	var Clan;
	var Stack, TargetCity;
};
UnitTeleportView.prototype = new GenieView();
UnitTeleportView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

//	this.SetData();
};
/*
UnitTeleportView.prototype.SetData = function() {
};
*/
UnitTeleportView.prototype.SetClan = function(clan) {  //UNLOGGED

	this.Clan = clan;
};
UnitTeleportView.prototype.SetStack = function(stack) {  //UNLOGGED

	this.Stack = stack;
};
UnitTeleportView.prototype.SetTargetCity = function(city) {  //UNLOGGED

	this.TargetCity = city;
};
UnitTeleportView.prototype.Update = function() {  //UNLOGGED

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
UnitTeleportView.prototype.Draw = function() {  //UNLOGGED
	//-best thing to do is have the same main and info screens as Play View, and in console show the city and surrounding tiles (showing garrison)
	//-once a city is selected, by clicking on 'teleport' button in console view, which brings up the unit teleport view
	//-teleport screen will show stack selected on left, city and neighbouring tiles on right, clicking on any garrison transferring 1 unit to it
};
