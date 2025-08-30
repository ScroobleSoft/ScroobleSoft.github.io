
//----------------------------------------------------------
//---------- DOMINION ADVISER INFO VIEW --------------------
var DominionAdviserInfoView = function() {
	var MoreButton, CloseButton;
	var CurrentView;
};
DominionAdviserInfoView.prototype = new GenieSubView();
DominionAdviserInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
DominionAdviserInfoView.prototype.SetControls = function() {  //UNLOGGED

};
DominionAdviserInfoView.prototype.DrawParagraph = function(para, x, y, colour) {  //UNLOGGED

	this.TextWriter.SetContext(this.Context);
	if (colour)
		this.TextWriter.SetColour(colour);

	this.TextWriter.WriteMulti(para, x, y);

	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext(this.Context);
};
DominionAdviserInfoView.prototype.DrawParagraphs = function(paras, x, y, colour) {  //UNLOGGED

	this.TextWriter.SetContext(this.Context);
	if (colour)
		this.TextWriter.SetColour(colour);

	this.TextWriter.WriteParagraphs(paras, x, y);

	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext(this.Context);
};
DominionAdviserInfoView.prototype.WritePages = function(pages, x, y, colour) {  //UNLOGGED

};
