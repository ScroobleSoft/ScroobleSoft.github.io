
GenieCrackleView.prototype.SetData = function() {

	this.Attempts = 0;
	this.Words = [ [ Words5a, Words5b, Words5c, Words5d, Words5e, Words5f, Words5g, Words5h, Words5i, Words5j, Words5k, Words5l, Words5m,
						  Words5n, Words5o, Words5p, Words5q, Words5r, Words5s, Words5t, Words5u, Words5v, Words5w, Words5y, Words5z ],
						[ Words6a, Words6b, Words6c, Words6d, Words6e, Words6f, Words6g, Words6h, Words6i, Words6j, Words6k, Words6l, Words6m,
						  Words6n, Words6o, Words6p, Words6q, Words6r, Words6s, Words6t, Words6u, Words6v, Words6w, Words6y, Words6z ],
						[ Words7a, Words7b, Words7c, Words7d, Words7e, Words7f, Words7g, Words7h, Words7i, Words7j, Words7k, Words7l, Words7m,
						  Words7n, Words7o, Words7p, Words7q, Words7r, Words7s, Words7t, Words7u, Words7v, Words7w, Words7y, Words7z ]  ];
};
GenieCrackleView.prototype.SetControls = function() {

	this.SetOptions();
	this.SetIcons();
	this.SetButtons();
};
GenieCrackleView.prototype.SetOptions = function() {

	this.RadioControlImage = new GenieImage();
	this.RadioControlImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RADIoCONTROlIMAGE);
	this.TypeRadioOptions = new GenieRadioControls();
	this.TypeRadioOptions.Set(this.Canvas, this.Specs.TYPES, this.RadioControlImage);
	this.TypeRadioOptions.SetLinks(null, this.TextWriter);
	this.Controls.push(this.TypeRadioOptions);
};
GenieCrackleView.prototype.SetIcons = function() {

	this.Controls.push(ExpandIcon);
	this.Controls.push(FullScreenIcon);
};
GenieCrackleView.prototype.ResetIcons = function() {

	ExpandIcon.Specs.L = this.Specs.ICON.EXPAND.L;
	ExpandIcon.Specs.T = this.Specs.ICON.EXPAND.T;
	ExpandIcon.Specs.BACKGROUND = this.Specs.COLOUR;
	FullScreenIcon.Specs.L = this.Specs.ICON.FULlSCREEN.L;
	FullScreenIcon.Specs.T = this.Specs.ICON.FULlSCREEN.T;
	FullScreenIcon.Specs.BACKGROUND = this.Specs.COLOUR;
};
GenieCrackleView.prototype.SetButtons = function() {

	this.OkButton = new TextButton();
	this.OkButton.Set(this.Canvas, this.Specs.BUTTON.OK, this.TextWriter);
	this.OkButton.SetCornersPic(ShallowCornerImages);
	this.Controls.push(this.OkButton);
	this.InstructOkButton = new TextButton();
	this.InstructOkButton.Set(this.Canvas, this.Specs.BUTTON.INSTRUCtOK, this.TextWriter);
	this.InstructOkButton.SetCornersPic(ShallowCornerImages);
	this.Controls.push(this.InstructOkButton);

	this.EraseButton = new TextButton();
	this.EraseButton.Set(this.Canvas, this.Specs.BUTTON.ERASE, this.TextWriter);
	this.EraseButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.EraseButton);
	this.SubmitButton = new TextButton();
	this.SubmitButton.Set(this.Canvas, this.Specs.BUTTON.SUBMIT, this.TextWriter);
	this.SubmitButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.SubmitButton);

	this.Controls.push(InstructionsButton);
	this.Controls.push(HintButton);
	this.Controls.push(SolveButton);
	this.Controls.push(RestartButton);
	this.Controls.push(QuitButton);
};
GenieCrackleView.prototype.ResetButtons = function() {

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
GenieCrackleView.prototype.SetImages = function() {

	//Bitmaps
	this.LetterImages = new GenieImage();
	this.LetterImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LETTERS);
	this.SectionImage = new GenieImage();
	this.SectionImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SECTION);
	this.KeyButtonImages = new GenieImage();
	this.KeyButtonImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.KEY.BUTTONS);
	this.KeyLetterImages = new GenieImage();
	this.KeyLetterImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.KEY.LETTERS);

	//Controls
	this.RadioControlImage = new GenieImage();
	this.RadioControlImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RADIoCONTROlIMAGE);
	this.InstructionImages = new GenieImage();
	this.InstructionImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.INSTRUCTIONS);
	this.TileImages = new GenieImage();
	this.TileImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TILES);
};
GenieCrackleView.prototype.SetComponents = function() {

	this.Ledger = new CrackleWordLedger();
	this.Ledger.Set(this.Context, this.Specs.LEDGER);
	this.Ledger.SetSectionSpecs(this.Specs.SECTION);
	this.Ledger.SetImages(this.SectionImage, this.LetterImages);

	this.SubmissionEntry = new CrackleSubmissionField();
	this.SubmissionEntry.Set(this.Context, this.Randomizer, this.Specs.SUBMISSION);
	this.SubmissionEntry.SetSectionSpecs(this.Specs.SECTION);
	this.SubmissionEntry.SetImages(this.SectionImage, this.LetterImages);

	this.Keyboard = new CrackleInputKeyboard();
	this.Keyboard.Set(this.Context, this.Specs.KEYBOARD);
	this.Keyboard.SetLinks(this.SubmissionEntry);
	this.Keyboard.SetImages(this.KeyButtonImages, this.KeyLetterImages);
};
GenieCrackleView.prototype.SetWord = function() {
	var i, j;

	i = this.Randomizer.GetIndex(this.Words[this.WordLength-5].length);
	j = this.Randomizer.GetIndex(this.Words[this.WordLength-5][i].length);
	this.Ledger.SetWord(this.Words[this.WordLength-5][i][j]);
	this.SubmissionEntry.SetWord(this.Words[this.WordLength-5][i][j]);
};
