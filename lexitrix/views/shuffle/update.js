
GenieShuffleView.prototype.UpdateControls = function() {

	this.UpdateShuffleButton();
	this.UpdateStandardButtons();
	this.UpdateIcons();
};
GenieShuffleView.prototype.UpdateShuffleButton = function() {

	if (this.ShuffleButton.CheckClicked()) {
		this.Board.ShuffleTiles();
		++this.InfoPanel.Shuffles;
		this.InfoPanel.DisplayShufflesBox();
		this.ControlFlag = true;
	}
};
GenieShuffleView.prototype.UpdateStandardButtons = function() {

	if (HintButton.CheckClicked()) {
		this.PlaceHint();
		this.ControlFlag = true;
		return;
	}

	if (SolveButton.CheckClicked()) {
		this.Board.Solve();
		this.Board.Draw();
		HintButton.Disable();
		SolveButton.Disable();
		this.ControlFlag = true;
		return;
	}

	if (RestartButton.CheckClicked())
		this.Restart();

	if (QuitButton.CheckClicked())
		this.Close(this.OpenMainView.bind(this), 100);

   if (InstructionsButton.CheckClicked()) {
		this.Disable();
		this.DisplayInstructions();
		this.PollInstructions();
	}
};
GenieShuffleView.prototype.UpdateIcons = function() {

	//UNLOGGED - move to base class

	if (ExpandIcon.CheckClicked()) {
		if (ExpandIcon.CheckPressed())
			LexiScape.Expand();
		else
			LexiScape.Contract();
		return (true);
	}

	if (FullScreenIcon.CheckClicked()) {
		if (FullScreenIcon.CheckPressed())
			LexiScape.SetFullScreen();
		else
			LexiScape.SetBrowserSize();
	}
};
GenieShuffleView.prototype.UpdateInterface = function() {

	this.CheckTouchCancelled();
	this.CheckShuffleAccessed();

	switch (this.State) {
		case this.Specs.STATE.STATIC:
			Mouse.Upped = false;													//HACK - necessary step to clear out-of-bounds uppings
			if (Mouse.CheckDowned(CANVAS.PRIME)) {
				if (!this.Board.CheckMouseOut()) {
					this.FirstTile = this.Board.GetMouseTile(DOWNED);
					if (this.FirstTile)
						this.State = this.Specs.STATE.DOWNED;
				}
			}
			if (TouchScreen.CheckTouched(CANVAS.PRIME)) {
				if (!this.Board.CheckTouchedOut()){
					this.FirstTile = this.Board.GetHapticTile(TOUCHED);
					if (this.FirstTile)
						this.State = this.Specs.STATE.TOUCHED;
				}
			}
			if (this.FirstTile) {
				if (this.FirstTile.Letter=="")
					this.State = this.Specs.STATE.RESET;
				else {
					this.FirstTile.State = this.Specs.BOARD.TILE.STATE.DOWNED;
					this.FirstTile.Draw();
				}
			}
			break;
		case this.Specs.STATE.DOWNED:
			if (Mouse.CheckUpped(CANVAS.PRIME)) {
				this.State = this.Specs.STATE.RESET;
				return;
			}
			if (Mouse.CheckMoved(CANVAS.PRIME))
				this.State = this.Specs.STATE.MOVING;
			break;
		case this.Specs.STATE.MOVING:
			this.Board.Draw();
			this.ShuffleButton.Show();
			this.DrawDraggedTile(DOWNED);
			if (this.Board.CheckMouseOut()) {
				this.State = this.Specs.STATE.RESET;
				return;
			}
			if (Mouse.CheckUpped(CANVAS.PRIME))
				this.State = this.Specs.STATE.UPPED;
			break;
		case this.Specs.STATE.UPPED:
			this.SecondTile = this.Board.GetMouseTile();
			if (this.SecondTile) {
				this.Board.SwapTiles(this.FirstTile, this.SecondTile);
				++this.InfoPanel.Moves;
				this.InfoPanel.DisplayMovesBox();
			}
			this.State = this.Specs.STATE.RESET;
			break;
		case this.Specs.STATE.TOUCHED:
			if (TouchScreen.CheckLifted(CANVAS.PRIME)) {
				this.State = this.Specs.STATE.RESET;
				return;
			}
			if (TouchScreen.CheckMoved(CANVAS.PRIME))
				this.State = this.Specs.STATE.DRAGGING;
			break;
		case this.Specs.STATE.DRAGGING:
			this.Board.Draw();
			this.ShuffleButton.Show();
			this.DrawDraggedTile();
			if (this.Board.CheckTouchedOut()) {
				this.State = this.Specs.STATE.ENGAGED;
				return;
			}
			if (TouchScreen.CheckLifted(CANVAS.PRIME))
				this.State = this.Specs.STATE.LIFTED;
			break;
		case this.Specs.STATE.LIFTED:
			this.SecondTile = this.Board.GetHapticTile();
			if (this.SecondTile) {
				this.Board.SwapTiles(this.FirstTile, this.SecondTile);
				++this.InfoPanel.Moves;
				this.InfoPanel.DisplayMovesBox();
			}
			this.State = this.Specs.STATE.RESET;
			break;
		case this.Specs.STATE.ENGAGED:
			if (TouchScreen.CheckLifted(CANVAS.PRIME))
				this.State = this.Specs.STATE.RESET;
			break;
		case this.Specs.STATE.RESET:
			Mouse.ClearAll();
			TouchScreen.ClearAll();
			if (this.FirstTile)
				this.FirstTile.State = this.Specs.BOARD.TILE.STATE.NORMAL;
			if (this.SecondTile)
				this.SecondTile.State = this.Specs.BOARD.TILE.STATE.NORMAL;
			this.FirstTile = null;
			this.SecondTile = null;
			this.Board.Draw();
			this.ShuffleButton.Show();
			this.State = this.Specs.STATE.STATIC;
			break;
	}
};
GenieShuffleView.prototype.CheckTouchCancelled = function() {

	if (TouchScreen.CheckCancelled())
		this.State = this.Specs.STATE.RESET;
};
GenieShuffleView.prototype.CheckShuffleAccessed = function() {

	if (this.ShuffleButton.CheckMouseUp())
		this.State = this.Specs.STATE.RESET;
};
GenieShuffleView.prototype.Restart = function() {

   this.InfoPanel.Reset();
   this.InfoPanel.Display();
	this.SelectShuffleWords();
	this.Board.Clear();
	this.Board.SetWords(this.FourWords);
	this.Board.Draw();
};
GenieShuffleView.prototype.DrawDraggedTile = function(bDowned) {

	this.Context.globalAlpha = 0.5;
	if (this.FirstTile.C==0 || this.FirstTile.C==(this.Specs.BOARD.TILE.C-1) || this.FirstTile.R==0 || this.FirstTile.R==(this.Specs.BOARD.TILE.R-1))
		this.Context.fillStyle = this.Specs.BOARD.TILE.COLOUR.OUTER;
	else
		this.Context.fillStyle = this.Specs.BOARD.TILE.COLOUR.INNER;
   this.letter = this.Board.Alphabet.indexOf(this.FirstTile.Letter);
	if (bDowned) {
		if ( Mouse.X < this.Specs.BOARD.BORDER.L+(this.Specs.BOARD.TILE.W/2) || Mouse.X >= (this.Specs.BOARD.BORDER.L+this.Specs.BOARD.BORDER.W-(this.Specs.BOARD.TILE.W/2)) ) {
			this.Context.globalAlpha = 1.0;
			return;
		}
		if ( Mouse.Y < this.Specs.BOARD.BORDER.T+(this.Specs.BOARD.TILE.H/2) || Mouse.Y >= (this.Specs.BOARD.BORDER.T+this.Specs.BOARD.BORDER.H-(this.Specs.BOARD.TILE.H/2)) ) {
			this.Context.globalAlpha = 1.0;
			return;
		}
		this.x = Mouse.X - (this.Specs.BOARD.TILE.W/2);
		this.y = Mouse.Y - (this.Specs.BOARD.TILE.H/2);
		this.Context.fillRect(this.x, this.y, this.Specs.BOARD.TILE.W, this.Specs.BOARD.TILE.H);
		ShuffleLetterImages.DrawPatchNumber(this.letter, this.x+6, this.y+2);
	} else {
		this.x = TouchScreen.X - (this.Specs.BOARD.TILE.W/2);
		this.y = TouchScreen.Y - (1.5*this.Specs.BOARD.TILE.H);
		this.Context.fillRect(this.x, this.y, this.Specs.BOARD.TILE.W, this.Specs.BOARD.TILE.H);
		ShuffleLetterImages.DrawPatchNumber(this.letter, this.x+6, this.y+2);
	}
	this.Context.globalAlpha = 1.0;
};
GenieShuffleView.prototype.PlaceHint = function() {
	var i;
	var r, c;
	var aIndcs;
	var iTile, lttr;

	//Find empty tile on the border
	aIndcs = new Array(this.Board.BorderIndices.length);
	this.Randomizer.GetUniqueIndices(aIndcs, this.Board.BorderIndices.length, this.Board.BorderIndices.length);
	for (i=0;i<this.Board.BorderIndices.length;++i) {
		this.c = this.Board.BorderIndices[aIndcs[i]] % this.Specs.BOARD.TILE.C;
		this.r = Math.floor(this.Board.BorderIndices[aIndcs[i]]/this.Specs.BOARD.TILE.C);
		if (this.Board.TileGrid[this.r][this.c].Letter=="" || !this.Board.TileGrid[this.r][this.c].Letter) {
			iTile = (this.Specs.BOARD.TILE.C*this.r) + this.c;
			lttr = this.Board.WordsString[this.Board.BorderIndices.indexOf(iTile)];
			break;
		}
	}

	if (i==this.Board.BorderIndices.length) {  //REDUNDANT? should be with 'Hints' button disabled
		alert("No hints available");
		return;
	}

	//Find matching letter amid inner tiles
	for (r=1;r<(this.Specs.BOARD.TILE.R-1);++r)
		for (c=1;c<(this.Specs.BOARD.TILE.C-1);++c) {
			if ( c==3 && r==3 )
				continue;
			if (this.Board.TileGrid[r][c].Letter==lttr) {
				this.Board.SwapTiles(this.Board.TileGrid[this.r][this.c], this.Board.TileGrid[r][c]);
				this.Board.Draw();
				++this.InfoPanel.Hints;
				this.InfoPanel.DisplayHintsBox();
				return;
			}
		}
};
GenieShuffleView.prototype.DisplayInstructions = function() {
	var i;
	var clr;

	this.Context.fillStyle = this.Specs.INSTRUCTIONS.COLOUR.BACKGROUND;
	this.Context.fillRect(this.Specs.INSTRUCTIONS.L, this.Specs.INSTRUCTIONS.T, this.Specs.INSTRUCTIONS.W, this.Specs.INSTRUCTIONS.H);

	clr = this.Specs.INSTRUCTIONS.COLOUR.FRAME;
	this.GraphicsTool.DrawRectangle(this.Specs.INSTRUCTIONS.L, this.Specs.INSTRUCTIONS.T, this.Specs.INSTRUCTIONS.W, this.Specs.INSTRUCTIONS.H, clr, 3);
	this.TextWriter.Write("Drag letters to empty tiles.", 60, 150);

	this.InstructionImages.DrawPatchNumber(0, 40, 160);
	this.InstructionImages.DrawPatchNumber(1, 190, 160);
	for (i=0;i<3;++i)
		this.TileImages.DrawPatchNumber(i, 40, 300+(50*i));
	this.TextWriter.Write("Green indicates a letter", 90, 315);
	this.TextWriter.Write("is in the right position.", 90, 330);
	this.TextWriter.Write("Yellow means it is in the right row or", 90, 365);
	this.TextWriter.Write("column, but in a different position.", 90, 380);
	this.TextWriter.Write("Red appears when the letter is not", 90, 415);
	this.TextWriter.Write("in the row or column at all.", 90, 430);

	this.InstructOkButton.Show();
};
GenieShuffleView.prototype.PollInstructions = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PollInstructions.bind(this));

	if (this.InstructOkButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.InstructOkButton.Hide();
		this.ColourScape();
		this.Board.Draw(true);
		this.InfoPanel.Display();
		this.ShowControls();
		this.Update();
	}
};
GenieShuffleView.prototype.OpenMainView = function() {  //DE-LOG, will be in LexiView

	MainView.Open();
	MainView.Update();
};
