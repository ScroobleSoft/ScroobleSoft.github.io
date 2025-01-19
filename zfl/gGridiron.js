
//---------------------------------------------
//---------- GRIDIRON GAME --------------------
var GridironGame = function () {
   var CalcPad;
   var ScreenRect;
};
GridironGame.prototype = new GenieGame();
GridironGame.prototype.Set = function(intrfc, gTool, cPad, tWriter, rGenerator) {
   GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

   this.CalcPad = cPad;
   this.ScreenRect = new GenieRect();
   this.Components = new GridironComponents();
};
GridironGame.prototype.SetComponents = function() {

   this.Components.Set(this.Interface, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer, this.ScreenRect);
};
GridironGame.prototype.Start = function() {

	this.DetermineIndices();
   Intro.Start();
};
GridironGame.prototype.DetermineIndices = function() {
	//UNLOGGED
	var date, ms;

//	FeaturedIndex = (probably hard-coded)
/*
	date = new Date();
	ms = date.getTime();
	DailyIndex = Math.floor((ms-Milliseconds)/(24*60*60*1000));
	WeeklyIndex = Math.floor((ms-Milliseconds)/(7*24*60*60*1000));
*/
};
