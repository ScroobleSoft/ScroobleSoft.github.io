/*
 *  UNLOGGED
 */
//-------------------------------------------------
//---------- GENIE BUNDLE VIEW --------------------
var GenieBundleView = function() {
	var VerticalWord, HorizontalWords;
	var Board;
};
GenieBundleView.prototype = new GenieView();
GenieBundleView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(gTool, tWriter, rGenerator);
	this.HorizontalWords = new Array(6);
	this.Board = new BundleWaveboard();
	this.Board.Set(this.Specs.BOARD);
};
