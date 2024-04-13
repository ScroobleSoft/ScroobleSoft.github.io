
//--------------------------------------------
//---------- SHUFFLE TILE --------------------
var ShuffleTile = function() {
	var Specs;
   var Screen;
   var Board;
   var X, Y, Row, Col, Index;
   var Status;			//correctness of placement
   var Letter;
   var State;			//downed/normal

   var num, colour;
};
ShuffleTile.prototype = {
   Set(specs, cntxt, board, indx) {
		this.Specs = specs;
      this.Screen = cntxt;
      this.Board = board;
      this.Index = indx;
      this.Row = Math.floor(this.Index/this.Specs.C);
      this.Col = this.Index % this.Specs.C;
      this.Status = this.Specs.STATUS.NEUTRAL;
      this.State = this.Specs.STATE.NORMAL;
   },
/*
   Reset() {  //REDUNDANT?

      this.State = this.Specs.STATE.NORMAL;
      this.DetermineStatus();
      this.Draw();
   },
*/
   DetermineStatus() {
      var iLetter;

		//No need to update inner tiles
		if ( !( this.Row==0 || this.Row==(this.Specs.R-1) || this.Col==0 || this.Col==(this.Specs.C-1) ) )
			return;

      //Check if tile is now empty
		if (this.Letter=="" || !this.Letter) {
			this.Status = this.Specs.STATUS.NEUTRAL;
			return;
		}

		iLetter = this.Board.BorderIndices.indexOf(this.Index);
      if (this.Letter==this.Board.WordsString[iLetter])
			this.Status = this.Specs.STATUS.CORRECT;
      else {
			this.Status = 0;
			if (this.Row==0)													//top row
				if (this.Board.TopRow.includes(this.Letter))
					this.Status |= this.Specs.STATUS.CLOSE;
			if (this.Col==(this.Specs.C-1))								//right column
				if (this.Board.RightColumn.includes(this.Letter))
					this.Status |= this.Specs.STATUS.CLOSE;
			if (this.Row==(this.Specs.R-1))								//bottom row
				if (this.Board.BottomRow.includes(this.Letter))
					this.Status |= this.Specs.STATUS.CLOSE;
			if (this.Col==0)													//left column
				 if (this.Board.LeftColumn.includes(this.Letter))
					this.Status |= this.Specs.STATUS.CLOSE;

			if (!this.Status)
				this.Status = this.Specs.STATUS.WRONG;
      }
   },
	Draw() {

      this.DrawBackground();
      this.DrawOutline();
      this.DrawLetter();
   },
   DrawBackground() {

      switch (this.Status) {
			case this.Specs.STATUS.NEUTRAL:
				if (this.Board.BorderIndices.includes(this.Index))
					colour = this.Specs.COLOUR.OUTER;
				else
					colour = this.Specs.COLOUR.INNER;
				break;
			case this.Specs.STATUS.WRONG:
				colour = this.Specs.COLOUR.WRONG;
				break;
			case this.Specs.STATUS.CLOSE:
				colour = this.Specs.COLOUR.CLOSE;
				break;
			case this.Specs.STATUS.CORRECT:
				colour = this.Specs.COLOUR.CORRECT;
				break;
      }
      this.Screen.fillStyle = colour;
      this.Screen.fillRect(this.X, this.Y, this.Specs.W, this.Specs.H);
   },
   DrawOutline() {

      switch (this.State) {
			case this.Specs.STATE.NORMAL:
				ShuffleTileImages.DrawPatchNumber(0, this.X, this.Y);
				break;
			case this.Specs.STATE.DOWNED:
				ShuffleTileImages.DrawPatchNumber(1, this.X, this.Y);
				break;
      }
   },
   DrawLetter() {

      if (this.Letter) {
			if (this.State==this.Specs.STATE.NORMAL) {
				this.num = this.Board.Alphabet.indexOf(this.Letter);
				ShuffleLetterImages.DrawPatchNumber(this.num, this.X+8, this.Y+4);
			} else {
				this.num = this.Board.Alphabet.indexOf(this.Letter);
				ShuffleLetterImages.DrawPatchNumber(this.num, this.X+9, this.Y+5);
			}
      }
   }
};
