/*
 ** SCROLLBAR = { STATE: { INACTIVE: 0, CLICKEdUP: 1, SCROLLED: 2, CLICKEdDOWN: 3 },
									THUMB: { STATIONARY: 0, DOWNED: 1, DRAGGED: 2, UPPED: 3 } }, CLICKED: { UP: 4, BAR: 5, DOWN: 6 } };
 */
//-------------------------------------------------
//----------- GENIE SCROLL BAR --------------------
var GenieScrollBar = function() {
   var UpArrow, DownArrow;
   var Index;
	var State;
};
GenieScrollBar.prototype = new GenieControl();
GenieScrollBar.prototype.Set = function(canvas, specs, img) {
   GenieControl.prototype.Set = function(canvas, specs, img);
};
GenieScrollBar.prototype.Draw = function() {
   //-have divided up the thumb image into 3, top-middle-bottom, with middle drawn multiple times depending on size of thumb
};
GenieScrollBar.prototype.Update = function() {

	//UNLOGGED

	if (!this.UpdateButtons())
		this.UpdateBar();
};
GenieScrollBar.prototype.ClickedOn = function() {

	//UNLOGGED

};
GenieScrollBar.prototype.CheckUpPressed = function() {

	//UNLOGGED


   //-will use .Frames timer to re-set image, something that will work because of repeated calls to .Update
};
GenieScrollBar.prototype.CheckDownPressed = function() {

	//UNLOGGED

};
GenieScrollBar.prototype.UpdateButtons = function() {

	//UNLOGGED

};
GenieScrollBar.prototype.UpdateBar = function() {

	//UNLOGGED

};
