
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
};
