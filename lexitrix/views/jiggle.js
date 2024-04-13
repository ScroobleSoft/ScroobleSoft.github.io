/*
 *  UNLOGGED
 */
//----------------------------------------------------
//----------- GENIE JIGGLE VIEW ----------------------
var GenieJiggleView = function() {
	var Grid;
	var SixWords;												//solution (array)
	var TopRow, MiddleRow, BottomRow;
	var LeftColumn, MiddleColumn, RightColumn;
	var Moves;

	var letter;		//scratch variables
};
GenieJiggleView.prototype = new GenieView();
GenieJiggleView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(gTool, tWriter, rGenerator);
//	this.SetData();
//	this.SetGrid();
};
