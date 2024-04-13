
//-----------------------------------------------
//---------- GENIE LEXI VIEW --------------------
var GenieLexiView = function() {
};
GenieLexiView.prototype = new GenieView();
/* REDUNDANT
GenieLexiView.prototype.Quit = function() {
	GenieView.prototype.Close.call(this);

	//UNLOGGED

	this.ColourScape();
	this.TextWriter.Write("Thanks for playing.", 40, 200, { COLOUR: "blue", FONT: "24px Arial" } );

	//Cancel full screen and any possible expansion
	document.documentElement.exitFullscreen();
	document.getElementsByTagName('body')[0].style.zoom = "100%";
//	document.documentElement.requestFullscreen();
};
*/
GenieLexiView.prototype.UpdateIcons = function() {

	//LOGGED in Crackle View

	if (ExpandIcon.CheckClicked()) {
		if (ExpandIcon.CheckPressed())
			LexiScape.Expand();
		else
			LexiScape.Contract();
	}

	if (FullScreenIcon.CheckClicked()) {
		if (FullScreenIcon.CheckPressed())
			LexiScape.SetFullScreen();
		else
			LexiScape.SetBrowserSize();
	}
};
GenieLexiView.prototype.OpenMainView = function() {

	//UNLOGGED

	MainView.Open();
};
