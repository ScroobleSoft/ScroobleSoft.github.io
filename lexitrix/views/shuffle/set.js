
GenieShuffleView.prototype.SetComponents = function() {

	this.SetShuffleBoard();
	this.SetInfoPanel();
};
GenieShuffleView.prototype.SetControls = function() {

	this.SetIcons();
	this.SetButtons();
};
GenieShuffleView.prototype.SetIcons = function() {

	this.Controls.push(ExpandIcon);
	this.Controls.push(FullScreenIcon);
};
GenieShuffleView.prototype.ResetIcons = function() {

	ExpandIcon.Specs.L = this.Specs.ICON.EXPAND.L;
	ExpandIcon.Specs.T = this.Specs.ICON.EXPAND.T;
	ExpandIcon.Specs.BACKGROUND = this.Specs.COLOUR;
	FullScreenIcon.Specs.L = this.Specs.ICON.FULlSCREEN.L;
	FullScreenIcon.Specs.T = this.Specs.ICON.FULlSCREEN.T;
	FullScreenIcon.Specs.BACKGROUND = this.Specs.COLOUR;
};
GenieShuffleView.prototype.SetButtons = function() {

	//Shuffle button
	this.ShuffleButtonOutlineImages = new GenieImage();
	this.ShuffleButtonOutlineImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], SHUFFLE.BUTTON.SHUFFLE.OUTLINE);
	this.ShuffleButton = new ImageButton();
	this.ShuffleButton.Set(this.Canvas, SHUFFLE.BUTTON.SHUFFLE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.ShuffleButton.SetCornersPic(this.ShuffleButtonOutlineImages);
	this.Controls.push(this.ShuffleButton);

	this.InstructOkButton = new TextButton();
	this.InstructOkButton.Set(this.Canvas, this.Specs.BUTTON.INSTRUCtOK, this.TextWriter);
	this.InstructOkButton.SetCornersPic(ShallowCornerImages);
	this.Controls.push(this.InstructOkButton);

	this.Controls.push(InstructionsButton);
	this.Controls.push(HintButton);
	this.Controls.push(SolveButton);
	this.Controls.push(RestartButton);
	this.Controls.push(QuitButton);
};
GenieShuffleView.prototype.ResetButtons = function() {

	InstructionsButton.Specs.L = this.Specs.BUTTON.INSTRUCTIONS.L;
	InstructionsButton.Specs.T = this.Specs.BUTTON.INSTRUCTIONS.T;
	InstructionsButton.Specs.BACKGROUND = this.Specs.COLOUR;
	HintButton.Specs.L = this.Specs.BUTTON.HINT.L;
	HintButton.Specs.T = this.Specs.BUTTON.HINT.T;
	HintButton.Specs.BACKGROUND = this.Specs.COLOUR;
	SolveButton.Specs.L = this.Specs.BUTTON.SOLVE.L;
	SolveButton.Specs.T = this.Specs.BUTTON.SOLVE.T;
	SolveButton.Specs.BACKGROUND = this.Specs.COLOUR;
	RestartButton.Specs.L = this.Specs.BUTTON.RESTART.L;
	RestartButton.Specs.T = this.Specs.BUTTON.RESTART.T;
	RestartButton.Specs.BACKGROUND = this.Specs.COLOUR;
	QuitButton.Specs.L = this.Specs.BUTTON.QUIT.L;
	QuitButton.Specs.T = this.Specs.BUTTON.QUIT.T;
	QuitButton.Specs.BACKGROUND = this.Specs.COLOUR;
};
GenieShuffleView.prototype.SetImages = function() {

	this.InstructionImages = new GenieImage();
	this.InstructionImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.INSTRUCTIONS);
	this.TileImages = new GenieImage();
	this.TileImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TILES);
};
GenieShuffleView.prototype.SetShuffleBoard = function() {

	this.Board = new ShuffleBoard();
	this.Board.Set(this.Specs.BOARD, this.Context, this.Randomizer);
};
GenieShuffleView.prototype.SetInfoPanel = function() {

	this.InfoPanel = new ShuffleInfoPanel();
	this.InfoPanel.Set(this.Specs.PANEL, this.Context, this.GraphicsTool, this.TextWriter);
};
GenieShuffleView.prototype.SetShuffleData = function() {
	var i;

	this.FourWords = new Array(4);
	this.State = SHUFFLE.STATE.STATIC;
	this.ShuffleWords = [ Words7a, Words7b, Words7c, Words7d, Words7e, Words7f, Words7g, Words7h, Words7i, Words7j, Words7k, Words7l, Words7m,
								 Words7n, Words7o, Words7p, Words7q, Words7r, Words7s, Words7t, Words7u, Words7v, Words7w ];
	this.WordDistribution = new Array(this.ShuffleWords.length);
	for (i=0;i<this.ShuffleWords.length;++i)
		this.WordDistribution[i] = this.ShuffleWords[i].length;

//	this.ControllerOffsets = [ [-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1] ];
};
GenieShuffleView.prototype.SelectShuffleWords = function() {  //TODO: duplicate 3rd and 4th words can exist
	var iSlot, iLttr;
	var aWords;

	//Get first 3 words
	do {

		//Pick top-left letter, get list of words starting with it
		iSlot = this.Randomizer.GetSlot(this.WordDistribution);
		this.GetTruncatedList(this.ShuffleWords[iSlot]);

		//Randomly pick top and left words from the list
		aWords = new Array(2);
		this.Randomizer.GetUniqueIndices(aWords, 2, this.WordList.length);
		this.FourWords[0] = this.WordList[aWords[0]];
		this.FourWords[3] = this.WordList[aWords[1]];

		//Randomly pick right word from top word's final letter
		iLttr = Alphabet.indexOf(this.FourWords[0][6]);
		this.GetTruncatedList(this.ShuffleWords[iLttr]);
		iSlot = this.Randomizer.GetIndex(this.WordList.length);
		this.FourWords[1] = this.WordList[iSlot];

		//For bottom word, get a list of words starting with left word's final letter, and ending with right word's final letter
		iLttr = Alphabet.indexOf(this.FourWords[3][6]);
		this.GetTruncatedList(this.ShuffleWords[iLttr], this.FourWords[1][6]);

	} while (this.WordList.length==0);		//Safety check to verify that bottom word list is not empty (if it is, start loop again)

	//Pick final word
	iSlot = this.Randomizer.GetIndex(this.WordList.length);
	this.FourWords[2] = this.WordList[iSlot];
};
GenieShuffleView.prototype.GetTruncatedList = function(aWords, eLttr) {  //e- end . . . NOTE: this eliminates words that won't fit in a quartet
	var i;

	this.WordList = new Array();
	for (i=0;i<aWords.length;++i)
		if (aWords[i][6]!="x" && aWords[i][6]!="y" && aWords[i][6]!="z") {
			if (eLttr) {
				if (aWords[i][6]==eLttr)
					this.WordList.push(aWords[i]);
			} else
				this.WordList.push(aWords[i]);
		}
};
