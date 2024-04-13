
//-----------------------------------------------------
//----------- GENIE SHUFFLE VIEW ----------------------
var GenieShuffleView = function() {
	var Board, InfoPanel;
	var FirstTile, SecondTile;
	var FourWords;																	//solution (array)
	var ShuffleWords, WordList, WordDistribution;
	var ShuffleButtonOutlineImages, ShuffleButton;
	var InstructionImages, TileImages, InstructOkButton;				//instructions
	var ControlFlag;

	var x, y, letter;		//scratch variables
};
GenieShuffleView.prototype = new GenieView();
GenieShuffleView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(gTool, tWriter, rGenerator);
	this.SetShuffleData();
};
GenieShuffleView.prototype.Open = function() {

	this.Canvas.View = this;

	this.ResetButtons();
	this.ResetIcons();

	//Select words
	this.SelectShuffleWords();
	this.Board.SetWords(this.FourWords);

	this.ColourScape();
	this.Board.Draw(true);
	this.InfoPanel.Display();
	this.ShowControls();
	this.Canvas.ResumeInput();

	this.ControlFlag = false;
};
GenieShuffleView.prototype.Update = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

//try {
	this.UpdateControls();
   if (this.ControlFlag)
		this.ControlFlag = false;
	else
		this.UpdateInterface();
//} catch {
//	cancelAnimationFrame(this.AnimationFrameHandle);
//	alert("Shuffle has crashed - sorry!");
//}
};
GenieShuffleView.prototype.ShowControls = function() {

	//Buttons
	InstructionsButton.Show();
	HintButton.Show();
	SolveButton.Show();
	RestartButton.Show();
	QuitButton.Show();

	this.ShuffleButton.Show();

	//Icons
	ExpandIcon.Show();
	FullScreenIcon.Show();
};
