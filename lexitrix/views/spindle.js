/*
 *  UNLOGGED
 */
//-----------------------------------------------------
//----------- GENIE SPINDLE VIEW ----------------------
var GenieSpindleView = function() {
	var PlayArea, Spindle, Tray;
	var FirstTile, SecondTile;
	var Words;
	var FourWords;												//solution (array)
	var Spine, TopRow, MiddleRow, BottomRow;			//ditto above
	var Moves;

	var letter;		//scratch variables
};
GenieSpindleView.prototype = new GenieView();
GenieSpindleView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(gTool, tWriter, rGenerator);
//	this.SetData();
//	this.SetInfoPanel();
};
GenieSpindleView.prototype.SetComponents = function() {

	this.SetSpindle();
	this.SetTray();
};
GenieSpindleView.prototype.SetControls = function() {

	//UNLOGGED
/*
	this.Controls.push(HintButton);
	this.Controls.push(SolveButton);
	this.Controls.push(RestartButton);
	this.Controls.push(QuitButton);
*/
};
GenieSpindleView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	//UNLOGGED

	var i, j;
	var aWords, word;
	var aLetters, aLists;

	//-pick a random 7-letter word
	this.Words = [ Words7a, Words7b, Words7c, Words7d, Words7e, Words7f, Words7g, Words7h, Words7i, Words7j, Words7k, Words7l, Words7m,
						Words7n, Words7o, Words7p, Words7q, Words7r, Words7s, Words7t, Words7u, Words7v, Words7w, Words7y, Words7z ];
	word = this.Randomizer.Get2DElement(this.Words);
	aWords = new Array(4);

	function CreateWordList(lttr, iLttr, arry2d) {
		var i, j;
		var lst;

		lst = new Array();
		for (i=0;i<arry2d.length;++i)
			for (j=0;j<arry2d[i].length;++j)
				if (arry2d[i][j][iLttr]==lttr)
					lst.push(arry2d[i][j]);

		return (lst);
	}

	//-pick 3 words whose middle letter is the 2nd/4th/6th letter of the first word
	//--create a list of words with matching middle letter; don't generate a new list if a letter is repeated
	aLetters = [ word[1], word[3], word[5] ];
	aLists = new Array(3);
	aLists[0] = CreateWordList(aLetters[0], 3, this.Words);
	if (aLetters[1]==aLetters[0])
		aLists[1] = aLists[0];
	else
		aLists[1] = CreateWordList(aLetters[1], 3, this.Words);
	if (aLetters[2]==aLetters[0])
		aLists[2] = aLists[0];
	else if (aLetters[2]==aLetters[1])
		aLists[2] = aLists[1];
	else
		aLists[2] = CreateWordList(aLetters[2], 3, this.Words);

	aWords[0] = word;
	for (i=0;i<aLists.length;++i)
		aWords[i+1] = aLists[i][this.Randomizer.GetIndex(aLists[i].length)];
};
GenieSpindleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

//try {
	if (!this.UpdateControls())
		this.UpdateInterface();
//} catch {
//	cancelAnimationFrame(this.AnimationFrameHandle);
//	alert("Spindle has crashed - sorry!");
//}
};
