
//----------------------------------------------  specs: { L: -1, T: -1, W: -1, H: -1, O: -1, C: -1, R: -1, KEYS: -1, MULTI: false, NULL: false;
//---------- GENIE TOUCH BAR -------------------			  COLOUR: { KEY: "", SELECTION: "" }, SELECT: -1/[], ORIENT: -1 }
var GenieTouchBar = function() {
	var SelectedKey, SelectedKeys;
	var KeyChangeFlag;
	var Offset;

	var c, r, l;
};
GenieTouchBar.prototype = new GenieControl();
GenieTouchBar.prototype.Set = function(cnvs, specs, pSpecs) {  //p- pic
	GenieControl.prototype.Set.call(this, cnvs, specs);

	this.Pic = new GenieImage();
	this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], pSpecs);
	this.SetSelection();
	this.KeyChangeFlag = false;
	this.rct = new GenieRect();
	this.Offset = this.Specs.O || 1;
};
GenieTouchBar.prototype.SetSelection = function() {

	if (this.Specs.MULTI) {
		this.SelectedKeys = new Array(this.Specs.KEYS);
		if (this.Specs.SELECT)
			for (this.i=0;this.i<this.Specs.SELECT.length;++this.i)
				this.SelectedKeys[this.Specs.SELECT[this.i]] = true;
	} else
		if (this.Specs.NULL)
			this.SelectedKey = (this.Specs.SELECT==undefined) ? this.Specs.SELECT : -1;
		else
			this.SelectedKey = (this.Specs.SELECT==undefined) ? this.Specs.SELECT : 0;
};
GenieTouchBar.prototype.Draw = function() {

	//Strip background
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.KEY || TOUChBAR.COLOUR.KEY;
	else
		this.Context.fillStyle = TOUChBAR.COLOUR.KEY;
	this.Context.fillRect(this.Specs.L+this.Offset, this.Specs.T+this.Offset, this.Specs.W-(2*this.Offset), this.Specs.H-(2*this.Offset));

	//Selection
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.SELECTION || TOUChBAR.COLOUR.SELECTION;
	else
		this.Context.fillStyle = TOUChBAR.COLOUR.SELECTION;
	if (this.Specs.MULTI) {
		for (this.i=0;this.i<this.Specs.KEYS;++this.i)  //TODO: block below is used twice, so move to internal function
			if (this.SelectedKeys[this.i]) {
				if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL) {
					this.l = this.Specs.L + (this.i*(this.Specs.KEY.W+this.Offset)) + this.Offset;
					this.Context.fillRect(this.l, this.Specs.T+this.Offset, this.Specs.KEY.W, this.Specs.KEY.H);
				} else if (this.Specs.ORIENT==ORIENTATION.VERTICAL) {
					this.t = this.Specs.T + (this.i*(this.Specs.KEY.H+this.Offset)) + this.Offset;
					this.Context.fillRect(this.Specs.L+this.Offset, this.t, this.Specs.KEY.W, this.Specs.KEY.H);
				} else {
					this.l = (this.i % this.Specs.C) * (this.Specs.KEY.W+this.Offset);
					this.t = Math.floor(this.i/this.Specs.C) * (this.Specs.KEY.H+this.Offset);
					this.Context.fillRect(this.Specs.L+this.Offset+this.l, this.Specs.T+this.Offset+this.t, this.Specs.KEY.W, this.Specs.KEY.H);
				}
			}
	} else {
		if (this.SelectedKey!=-1) {
			if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL) {
				this.l = this.Specs.L + (this.SelectedKey*(this.Specs.KEY.W+this.Offset)) + this.Offset;
				this.Context.fillRect(this.l, this.Specs.T+this.Offset, this.Specs.KEY.W, this.Specs.KEY.H);
			} else if (this.Specs.ORIENT==ORIENTATION.VERTICAL) {
				this.t = this.Specs.T + (this.SelectedKey*(this.Specs.KEY.H+this.Offset)) + this.Offset;
				this.Context.fillRect(this.Specs.L+this.Offset, this.t, this.Specs.KEY.W, this.Specs.KEY.H);
			} else {
				this.l = (this.SelectedKey % this.Specs.C) * (this.Specs.KEY.W+this.Offset);
				this.t = Math.floor(this.SelectedKey/this.Specs.C) * (this.Specs.KEY.H+this.Offset);
				this.Context.fillRect(this.Specs.L+this.Offset+this.l, this.Specs.T+this.Offset+this.t, this.Specs.KEY.W, this.Specs.KEY.H);
			}
		}
	}

	this.Pic.Draw(this.Specs.L, this.Specs.T);
};
GenieTouchBar.prototype.MouseDown = function() {

	this.i = this.GetKey();
	if (this.Specs.MULTI) {
		this.SelectedKeys[this.i] = !this.SelectedKeys[this.i];
		this.KeyChangeFlag = true;
	} else {
		if (this.Specs.NULL) {
			if (this.i==this.SelectedKey)
				this.SelectedKey = -1;
			else
				this.SelectedKey = this.i;
			this.KeyChangeFlag = true;
		} else
			if (this.i!=this.SelectedKey) {
				this.SelectedKey = this.i;
				this.KeyChangeFlag = true;
			}
	}

	if (this.KeyChangeFlag)
		this.Draw();
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
		return (Math.floor((Mouse.Down.X-this.Specs.L)/(this.Specs.KEY.W+this.Offset)));
	else if (this.Specs.ORIENT==ORIENTATION.VERTICAL)
		return (Math.floor((Mouse.Down.Y-this.Specs.T)/(this.Specs.KEY.H+this.Offset)));
	else {
		this.c = Math.floor((Mouse.Down.X-this.Specs.L)/(this.Specs.KEY.W+this.Offset));
		this.r = Math.floor((Mouse.Down.Y-this.Specs.T)/(this.Specs.KEY.H+this.Offset));
		return ((this.Specs.C*this.r)+this.c);
	}
};
GenieTouchBar.prototype.ChangeKey = function(nKey) {

	this.SelectedKey = nKey;
	this.Draw();
};
