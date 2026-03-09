/*
		** this won't have dates, but will just be numbered, like Crossle
		** algorithm will be milliseconds based
*/
//-----------------------------------------------
//---------- DAILY GAME VIEW --------------------
var DailyGameView = function() {
};
DailyGameView.prototype = new GenieView();
DailyGameView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
