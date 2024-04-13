
//------------------------------------------------
//---------- JIGGLE WORD GRID --------------------
var JiggleWordGrid = function() {
	var Words;	//REDUNDANT?
	var TopRow, MiddleRow, BottomRow;
	var LeftColumn, MiddleColumn, RightColumn;
};
JiggleWordGrid.prototype = {
	Set() {

		this.Words = new Array(JIGGLE.WORD.COUNT);
	},
	SetImages() {

		//UNLOGGED

		this.LetterImages = new GenieImage();
		this.LetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.MINiIMAGES], { L: 85, T: 206, W: 231, H: 45, O: 3, C: 13, R: 2, PATCH: { W: 15, H: 21 } } );
		this.ButtonImages = new GenieImage();
		this.ButtonImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.MINiIMAGES], { L: 1, T: 206, W: 82, H: 40, O: 2, C: 2, R: 1, PATCH: { W: 40, H: 40 } } );
	},
	SetWords(aWords) {
		var i;

		//UNLOGGED

		for (i=0;i<JIGGLE.WORD.COUNT;++i)		//REDUNDANT?
			this.Words = aWords[i];

		this.TopRow = aWords[0];
		this.MiddleRow = aWords[1];
		this.BottomRow = aWords[2];
		this.LeftColumn = aWords[3];
		this.MiddleColumn = aWords[4];
		this.RightColumn = aWords[5];
	},
	Draw() {
	}
};
