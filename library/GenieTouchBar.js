
//----------------------------------------------  specs: { L: -1, T: -1, W: -1, H: -1, C: -1, R: -1, KEYS: -1, MULTI: false,
//---------- GENIE TOUCH BAR -------------------		COLOUR: { KEY: "", SELECTION: "" }, SELECT: -1/[], ORIENT: -1 }
var GenieTouchBar = function() {
	var SelectedKey, SelectedKeys;
	var KeyChangeFlag;

	var c, r;
};
GenieTouchBar.prototype = new GenieControl();
GenieTouchBar.prototype.Set = function(cnvs, specs, pSpecs) {  //p- pic
	GenieControl.prototype.Set.call(this, cnvs, specs);

	this.Pic = new GenieImage();
	this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], pSpecs);
	this.SetSelection();
	this.KeyChangeFlag = false;
	this.rct = new GenieRect();
};
GenieTouchBar.prototype.SetSelection = function() {

	if (this.Specs.MULTI) {
		this.SelectedKeys = new Array(this.Specs.KEYS);
		if (this.Specs.SELECT)
	 for (this.i=0;this.i<this.Specs.SELECT.length;++this.i)
		 this.SelectedKeys[this.Specs.SELECT[this.i]] = true;
	} else
		this.SelectedKey = this.Specs.SELECT || 0;
};
GenieTouchBar.prototype.Draw = function() {

	//Strip background
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.KEY || TOUChBAR.COLOUR.KEY;
	else
		this.Context.fillStyle = TOUChBAR.COLOUR.KEY;
	this.Context.fillRect(this.Specs.L+1, this.Specs.T+1, this.Specs.W-2, this.Specs.H-2);

	//Selection
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.SELECTION || TOUChBAR.COLOUR.SELECTION;
	else
		this.Context.fillStyle = TOUChBAR.COLOUR.SELECTION;
	if (this.Specs.MULTI) {
		for (this.i=0;this.i<this.Specs.KEYS;++this.i)  //TODO: block below is used twice, so move to internal function
			if (this.SelectedKeys[this.i]) {
				if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL)
					this.Context.fillRect(this.Specs.L+(this.i*(this.Specs.KEY.W+1))+1, this.Specs.T+1, this.Specs.KEY.W, this.Specs.KEY.H);
				else if (this.Specs.ORIENT==ORIENTATION.VERTICAL)
					this.Context.fillRect(this.Specs.L+1, this.Specs.T+(this.i*(this.Specs.KEY.H+1))+1, this.Specs.KEY.W, this.Specs.KEY.H);
				else {
					this.x = (this.i % this.Specs.C) * (this.Specs.KEY.W+1);
					this.y = Math.floor(this.i/this.Specs.C) * (this.Specs.KEY.H+1);
					this.Context.fillRect(this.Specs.L+1+this.x, this.Specs.T+1+this.y, this.Specs.KEY.W, this.Specs.KEY.H);
				}
			}
	} else {
		if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL)
			this.Context.fillRect(this.Specs.L+(this.SelectedKey*(this.Specs.KEY.W+1))+1, this.Specs.T+1, this.Specs.KEY.W, this.Specs.KEY.H);
		else if (this.Specs.ORIENT==ORIENTATION.VERTICAL)
			this.Context.fillRect(this.Specs.L+1, this.Specs.T+(this.SelectedKey*(this.Specs.KEY.H+1))+1, this.Specs.KEY.W, this.Specs.KEY.H);
		else {
			this.x = (this.SelectedKey % this.Specs.C) * (this.Specs.KEY.W+1);
			this.y = Math.floor(this.SelectedKey/this.Specs.C) * (this.Specs.KEY.H+1);
			this.Context.fillRect(this.Specs.L+1+this.x, this.Specs.T+1+this.y, this.Specs.KEY.W, this.Specs.KEY.H);
		}
	}

	this.Pic.Draw(this.Specs.L, this.Specs.T);
};
GenieTouchBar.prototype.MouseDown = function() {

	this.i = this.GetKey();
	if (this.i!=this.SelectedKey) {
		this.KeyChangeFlag = true;
		this.SelectedKey = this.i;
		this.Draw();
	}
};
GenieTouchBar.prototype.CheckKeyChanged = function() {

	if (this.KeyChangeFlag) {
		this.KeyChangeFlag = false;
		return (true);
	} else
		return (false);
};
GenieTouchBar.prototype.GetKey = function() {

	if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL)
		return (Math.floor((Mouse.Down.X-this.Specs.L)/(this.Specs.KEY.W+1)));
	else if (this.Specs.ORIENT==ORIENTATION.VERTICAL)
		return (Math.floor((Mouse.Down.Y-this.Specs.T)/(this.Specs.KEY.H+1)));
	else {
		this.c = Math.floor((Mouse.Down.X-this.Specs.L)/(this.Specs.KEY.W+1));
		this.r = Math.floor((Mouse.Down.Y-this.Specs.T)/(this.Specs.KEY.H+1));
		return ((this.Specs.C*this.r)+this.c);
	}
};
GenieTouchBar.prototype.ChangeKey = function(nKey) {

	this.SelectedKey = nKey;
	this.Draw();
};
