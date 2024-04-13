/*
 *  come to think of it, need only 2 or 3 rows (of 600/640/800px width) in buffer, with rows being constantly 're-used' by updating them with strings
 *  Note that a 30px height will give a buffer size of 48K at the most with 2 rows
 *  TODO: no scrolling if all info fits
		** interstitial marker - '***'
		** might need .Info, .Location, .Length, .ActiveFlag per entry (or may not be needed at all)
		** clicking on Ticker pauses it, another click resumes scrolling, double-click perhaps spawning expanded info in a different window (Tabloid?)
 */
var InfoItem = function() {
	var Text;
	var Style;
};
/* can only uncomment this after removing from GenieControls.js
var TextIndex = function() {
	var Line,
	var Character;
};
*/
//--------------------------------------------  specs = { L: -1, T: -1, W: -1, H: -1, COLOUR: { BACKGROUND: "", FRAME: "", TEXT: "" },
//---------- GENIE TICKER --------------------				 BUFFER: { WIDTH: -1, HEIGHT: -1 }, GAP: -1 }
var GenieTicker = function() {
	var Buffer;
	var FirstRow;
	var BackgroundColour, FrameColour, TextColour;
	var Entries, EntryColours, EntryLengths;
	var PixelIndex, EntryIndex, EntryCharacterIndex;
	var Baseline;

	var EntriesLength;	//in px
	var CurrentEntryIndex;
	var EntryPixelIndex;
	var Frames, State;

	var i, w, l, t;
};
GenieTicker.prototype = new GenieControl();
GenieTicker.prototype.Set = function(cnvs, specs) {
	GenieControl.prototype.Set.call(this, cnvs, specs);

	if (this.Specs.COLOUR) {
		this.BackgroundColour = this.Specs.COLOUR.BACKGROUND || TICKER.COLOUR.BACKGROUND;
		this.FrameColour = this.Specs.COLOUR.FRAME || TICKER.COLOUR.FRAME;
		this.TextColour = this.Specs.COLOUR.TEXT || TICKER.COLOUR.TEXT;
	}
	this.SetBuffer();
	this.SetBaseline();
	this.FirstRow = true;
	this.PixelIndex = this.Specs.LW;
	this.EntryIndex = 0;
	this.EntryCharacterIndex = 0;

	this.Entries = new Array();
	this.EntryColours = new Array();				//REDUNDANT?
	this.EntryLengths = new Array();				//REDUNDANT?
	this.EntriesLength = this.Specs.ENTRY.PADDING;
	this.CurrentEntry = 0;
	this.EntryPixelIndex = 0;
};
GenieTicker.prototype.SetBuffer = function() {

	this.Buffer = new GenieBuffer();
	this.Buffer.Set(this.Specs.BUFFER);
};
GenieTicker.prototype.SetBaseline = function() {

	this.Specs.H-(2*this.Specs.LW)
	this.Baseline = StringUtils.GetTextHeight(null, this.Context);
	this.Baseline += Math.round(((this.Specs.H-(2*this.Specs.LW))-this.Baseline)/2);
};
GenieTicker.prototype.AddEntry = function(str) {

	this.Entries.push(str);
/*
	var eLength;  //e- entry
	var indx;

	//LOGGED - UNTESTED

	this.Buffer.Context.clearRect(0, 20*this.NumEntries, this.Buffer.Canvas.width, 20);
	indx = this.EntryLengths.GetSlot(this.NumEntries);

	this.Entries.push(strng);
	eLength = Math.ceil(this.Context.measureText(this.Entries[0]).width);
	if (this.NumEntries==ENTRY.MAX) {
		this.EntriesLength -= eLength;
		this.Entries.shift();
		this.EntryLengths.shift();
	} else
		++this.NumEntries;

	this.Entries.push(strng);
	this.EntriesLength += eLength;
	this.TextWriter.SetContext(this.Buffer.Context);
	this.TextWriter.Write(strng, 0, 20*this.NumEntries);

	//each time a new entry is added, should ignore what was scrolling and flash the new entry 3 times, then resume
	// scrolling (at which point? - would be hard to pick up old point especially if that entry is now gone); ideally, resume
	// from same spot, or pick next entry if that entry is gone
*/
};
GenieTicker.prototype.ActivateBuffer = function() {

	//UNLOGGED

	this.TextWriter.SetContext(this.Buffer.Context);
	++this.PixelIndex;
	for (this.i=0;this.i<this.Entries.length;++this.i) {
		this.w = StringUtils.GetTextWidth(this.Entries[this.i], null, this.Context);
		if (this.PixelIndex+this.w<this.Specs.W-(2*this.Specs.LW/2)) {
			this.TextWriter(this.Entries[this.i], this.PixelIndex, this.Baseline);
			this.PixelIndex += this.w;
		} else {
			//-write only the portion of the string that fits, record entry and character index
		}
	}
	//-write second row
	this.TextWriter.RestoreContext();
};
GenieTicker.prototype.RemoveEntry = function(iEntry) {

	ArrayUtils.Extract(this.Entries, iEntry);
	//-refresh display if entry was on-screen
/*
	ArrayUtils.Extract(this.EntryColours, iEntry);
	ArrayUtils.Extract(this.EntryLengths, iEntry);

	this.EntriesLength = ArrayUtils.GetSum(this.EntryLengths);
*/
};
GenieTicker.prototype.Update = function() {
/*
	--this.Frames;
	if (this.Frames)
		return;
	else
		this.Frames = this.Specs.F;

	++this.PixelIndex;
	if (this.PixelIndex==this.EntriesLength)
		this.PixelIndex = 0;

	++this.EntryPixelIndex;
	if (this.EntryPixelIndex==this.EntryLengths[this.CurrentEntryIndex]) {
		++this.CurrentEntryIndex;
		if (this.CurrentEntryIndex==this.NumEntries)
	 this.CurrentEntryIndex = 0;
	}
*/
	++this.PixelIndex;
	if (this.PixelIndex==(this.Specs.W-this.Specs.LW)) {
		this.PixelIndex = this.Specs.LW;
		this.FirstRow = !this.FirstRow;				//flip rows
		//-write to inactive row
	}
};
GenieTicker.prototype.Draw = function(entry) {

	//UNLOGGED

	//Background
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, this.Colour, 0);
/*
	//Text
	this.drawn = this.EntryLengths[this.CurrentEntryIndex] - this.EntryPixelIndex;
	//TODO: have to check if length of entry exceeds ticker width
	this.Context.drawImage(this.Buffer.Canvas, this.EntryPixelIndex, 20*this.CurrentEntryIndex, this.drawn, 20, 0, 0, this.drawn, 20);
	nEntry = this.CurrentEntryIndex;
	while (this.drawn<this.Specs.W) {
		++nEntry;
		if (nEntry==this.NumEntries)
	  nEntry = 0;
		if (this.EntryLengths[nEntry]>(this.Specs.W-this.drawn))
	 this.Context.drawImage(this.Buffer.Canvas, 0, 20*nEntry, this.Specs.W-this.drawn, 20, this.drawn, 0, this.Specs.W-this.drawn, 20);
		else
	 this.Context.drawImage(this.Buffer.Canvas, 0, 20*nEntry, this.EntryLengths[nEntry], 20, this.drawn, 0, this.EntryLengths[nEntry], 20);
		this.drawn += (this.EntryLengths[nEntry]);
	}
*/
	this.w = this.Specs.W - this.PixelIndex;
	this.l = this.Specs.L + this.Specs.LW;
	this.t = this.Specs.T + this.Specs.LW;
	if (this.FirstRow) {
		this.Context.drawImage(this.Buffer.Canvas, this.PixelIndex, 0, this.w, this.Specs.H, this.l, this.t, this.w, this.Specs.H);
		if (this.PixelIndex)
			this.Context.drawImage(this.Buffer.Canvas, 0, this.Specs.H/2, this.PixelIndex, this.Specs.H, this.l+this.w, this.t, this.PixelIndex, this.Specs.H);
	} else {
		this.Context.drawImage(this.Buffer.Canvas, this.PixelIndex, this.Specs.H/2, this.w, this.Specs.H, this.l, this.t, this.w, this.Specs.H);
		if (this.PixelIndex)
			this.Context.drawImage(this.Buffer.Canvas, 0, 0, this.PixelIndex, this.Specs.H, this.l+this.w, this.t, this.PixelIndex, this.Specs.H);
	}

	//Frame . . . TODO: may not be needed
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, this.FrameColour, 3);
};
