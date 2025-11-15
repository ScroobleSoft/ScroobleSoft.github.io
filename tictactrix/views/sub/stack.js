
//--------------------------------------------------
//---------- STACK CONSOLE VIEW --------------------
var StackConsoleView = function() {
	var Stack;
};
StackConsoleView.prototype = new GenieSubView();
StackConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
StackConsoleView.prototype.SetStack = function(stack) {  //UNLOGGED

	this.Stack = stack;
};
StackConsoleView.prototype.Draw = function() {  //UNLOGGED

	//-name?
	//-clan
	//-icons at bottom to switch to different info display
	//-not enough space for 4x2 tiles and icon, so will pick 2x4, unless 3x3 looks Ok with the centre tile having some function
};
