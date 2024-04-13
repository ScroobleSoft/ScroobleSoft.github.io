/*
	NOTE: also called a Slider, or Carousel Slider, usually horizontal, but there are vertical ones too
	NOTE: it's the app's responsiblity that the Title fit within the Deck; the Title must be one line only
	TODO: right now entries are deleted as soon as they scroll off, but FUTURE additions that would be useful would be
			____	___	_________	___	____
			|^^|	|^|	| PAUSE |	|v|	|vv|
			----	---	---------	---	----
			this is already implemeted in testing\rolling.js using plain style buttons
*/
/*
 *		re-name Film-Strip?
 */
//-----------------------------------------------------  specs: { L: -1, T: -1, W: -1, H: -1, COLOUR: { FRAME: "", BACKGROUND: "" }, TITLE: { FONT: "" },
//---------- GENIE CAROUSEL SLIDER --------------------				LW: { FRAME: -1, SEPARATOR: -1 }, TEXT: { FONT: "" }, GAP: { X: -1, Y: -1 }, SPACING: -1,
var GenieCarouselSlider = function() {					  //				BUFFER: { WIDTH: 300, HEIGHT: 150 }, F: -1, CLEAR: false }
	var Entries;
	var State, Frames;
	var TopEntry, EntryPixel, BottomEntry;		//.TopEntry and .BottomEntry are indices
	var TopLine;
	var Left;
	var EntryBuffer, BufferFlag;					//NOTE: buffering is useful if performance is not an issue (takes up twice the time)

	var j, h, sum, info, start, end, by;
};
GenieCarouselSlider.prototype = new GenieControl();
GenieCarouselSlider.prototype.Set = function(cnvs, specs) {
	GenieControl.prototype.Set.call(this, cnvs, specs);

	this.Entries = new Array();
	this.Left = this.Specs.L + this.Specs.LW.FRAME + this.Specs.GAP.X;
	this.TopEntry = 0;
	this.EntryPixel = 0;
	this.TopLine = 0;
	this.SetBuffer();
	if (this.Specs.CLEAR) {
		this.TopLine = this.Specs.H;
		this.State = DECK.STATE.SCROLLING;
	} else
		this.State = DECK.STATE.STATIC;
};
GenieCarouselSlider.prototype.SetBuffer = function() {

	if (this.Specs.BUFFER) {
		this.EntryBuffer = new GenieBuffer();
		this.EntryBuffer.Set(this.Specs.BUFFER);
	}
};
GenieCarouselSlider.prototype.AddEntry = function(title, info) {
	var item;

	item = new CarouselItem();
	item.Title = title;
	item.Info = info;
	if (this.Specs.TEXT)
		item.Breaks = StringUtils.GetLineBreaks(info, this.Specs.TEXT.FONT, this.Context, this.Specs.W-(2*(this.Specs.GAP.X+this.Specs.LW.FRAME)));
	else
		item.Breaks = StringUtils.GetLineBreaks(info, null, this.Context, this.Specs.W-(2*(this.Specs.GAP.X+this.Specs.LW.FRAME)));
	item.Height = this.GetEntryHeight(item);
	this.Entries.push(item);

	//Check if deck should now start scrolling
	if (this.State==DECK.STATE.STATIC)
		if (!this.CheckEntriesFit()) {
			this.State = DECK.STATE.SCROLLING;
			this.Frames = this.F || DECK.F;
		}
};
GenieCarouselSlider.prototype.RemoveEntry = function(iEntry) {

	if (!iEntry)
		if (this.Entries.length)
			this.Entries.shift();
	else
		ArrayUtils.Extract(this.Entries, iEntry);

	this.Draw();  //TODO: this should be called only if entry was on-screen
};
GenieCarouselSlider.prototype.GetEntryHeight = function(item) {

	//Title
	if (item.Title) {
		if (this.Specs.TITLE)
			this.h = StringUtils.GetTextHeight(this.Specs.TITLE.FONT, this.Context);
		else
			this.h = StringUtils.GetTextHeight(null, this.Context);
	}

	//Entries
	this.h += (item.Breaks.length+1) * this.Specs.SPACING;
	this.h += this.Specs.GAP.Y;

	return (this.h);
};
GenieCarouselSlider.prototype.GetEntriesHeight = function(iItem) {

	iItem = iItem || 0;
	this.sum = 0;
	for (this.i=iItem;this.i<this.Entries.length;++this.i)
		this.sum += this.Entries[this.i].Height;

	return (this.sum);
};
GenieCarouselSlider.prototype.EnableBuffer = function() {

	this.BufferFlag = true;
};
GenieCarouselSlider.prototype.DisableBuffer = function() {

	this.BufferFlag = false;
};
GenieCarouselSlider.prototype.Draw = function() {

	this.DrawFrame();
	if (this.BufferFlag)
		this.DisplayBufferedEntries();
	else
		this.DisplayEntries();
};
GenieCarouselSlider.prototype.Update = function() {

	//TODO: optionally, could just move entries up one entire item at a time, which would be easier to implement

	switch (this.State) {
		case DECK.STATE.STATIC:
/*
			if (this.GetEntriesHeight(this.TopEntry)>this.Specs.H)
				this.State = DECK.STATE.SCROLLING;
*/
			break;
		case DECK.STATE.SCROLLING:
			++this.EntryPixel;
			this.Draw();
			if (this.EntryPixel>=this.Entries[this.TopEntry].Height) {
				this.EntryPixel = 0;
				if (this.Specs.CLEAR) {
					if (this.TopLine<=0)
						this.Entries.shift();
					else
						this.TopLine -= this.Entries[this.TopEntry].Height;
				}
				if (this.CheckEntriesFit())
					this.State = DECK.STATE.STATIC;
				else
					this.State = DECK.STATE.PAUSED;
			}
/*
			if (this.Specs.CLEAR)
				if (this.TopLine>0)
					--this.TopLine;
*/
			break;
		case DECK.STATE.PAUSED:
			--this.Frames;
			if (!this.Frames) {
				if (this.CheckEntriesFit())
					this.State = DECK.STATE.STATIC;
				else {
					this.State = DECK.STATE.SCROLLING;
					this.Frames = this.F || DECK.F;
				}
			}
			break;
	}
};
GenieCarouselSlider.prototype.DrawFrame = function() {

	this.GraphicsTool.SwitchContext(DominionScape.HelpDeck.Context);

	//Border
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, this.Specs.COLOUR.BACKGROUND, 0);
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, this.Specs.COLOUR.FRAME, 3);

	//Separators
	this.y = this.Specs.T + this.Specs.LW.FRAME;
	this.y += this.TopLine;
	for (this.i=0;this.i<this.Entries.length;++this.i) {
		this.y += this.Entries[this.i].Height;
		if ((this.y-this.EntryPixel)>(this.Specs.T+this.Specs.H))  //check if have gone beyond control's bottom edge
			break;
		this.GraphicsTool.DrawHorizontalLine( { X: this.Specs.L, Y: this.y-this.EntryPixel }, this.Specs.W, this.Specs.COLOUR.FRAME, 1);
	}

	this.GraphicsTool.RestoreContext();
};
GenieCarouselSlider.prototype.DisplayEntries = function() {

	if (!this.Entries)
		return;

	this.TextWriter.SwitchContext(CANVAS.HELP);

	this.Context.save();
	this.Context.rect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	this.Context.clip();

	this.y = this.Specs.T + this.Specs.LW.FRAME - this.EntryPixel;
	this.y += this.TopLine;
	for (this.i=this.TopEntry;this.i<this.Entries.length;++this.i) {

		//Title
		if (this.Entries[this.i].Title) {
			this.y += StringUtils.GetTextHeight(this.Specs.TITLE.FONT, this.Context);
			this.TextWriter.Write(this.Entries[this.i].Title, this.Left, this.y, this.Specs.TITLE);
		}

		//Entries
		this.start = 0;
		for (this.j=0;this.j<this.Entries[this.i].Breaks.length;++this.j) {
			this.y += this.Specs.SPACING;
			this.info = this.Entries[this.i].Info.substring(this.start, this.Entries[this.i].Breaks[this.j]);
			this.TextWriter.Write(this.info, this.Left, this.y, this.Specs.TEXT);
			this.start = this.Entries[this.i].Breaks[this.j] + 1;
		}
		this.y += this.Specs.SPACING;
		this.info = this.Entries[this.i].Info.substring(this.start, this.Entries[this.i].Info.length+1);
		this.TextWriter.Write(this.info, this.Left, this.y, this.Specs.TEXT);

		this.y += this.Specs.GAP.Y;
		if (this.y>(this.Specs.T+this.Specs.H))
			break;
	}

	this.Context.restore();

	this.TextWriter.RestoreContext();
};
GenieCarouselSlider.prototype.DisplayBufferedEntries = function() {

	this.TextWriter.SetContext(this.EntryBuffer.Context);

	this.y = 0 - this.EntryPixel;
	this.Context.save();
	this.Context.rect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	this.Context.clip();
	for (this.i=0;this.i<this.Entries.length;++this.i) {

		this.EntryBuffer.Clear();
		this.by = this.Specs.T + this.Specs.LW.FRAME;

		//Title
		this.by += StringUtils.GetTextHeight(this.Specs.TITLE.FONT, this.Context);
		this.TextWriter.Write(this.Entries[this.i].Title, this.Left, this.by, this.Specs.TITLE);

		//Entries
		this.start = 0;
		for (this.j=0;this.j<this.Entries[this.i].Breaks.length;++this.j) {
			this.by += this.Specs.SPACING;
			this.info = this.Entries[this.i].Info.substring(this.start, this.Entries[this.i].Breaks[this.j]);
			this.TextWriter.Write(this.info, this.Left, this.by, this.Specs.TEXT);
			this.start = this.Entries[this.i].Breaks[this.j] + 1;
		}
		this.by += this.Specs.SPACING;
		this.info = this.Entries[this.i].Info.substring(this.start, this.Entries[this.i].Info.length+1);
		this.TextWriter.Write(this.info, this.Left, this.by, this.Specs.TEXT);

		this.Context.drawImage(this.EntryBuffer.Canvas, 0, this.y);
		this.y += this.Entries[this.i].Height;
	}
	this.Context.clip();

	this.TextWriter.RestoreContext();
};
GenieCarouselSlider.prototype.CheckEntriesFit = function() {

	return (this.GetEntriesHeight()<(this.Specs.H-this.TopLine));
};
