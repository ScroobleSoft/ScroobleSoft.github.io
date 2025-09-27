
//----------------------------------------------  specs: { L: -1, T: -1, W: -1, H: -1, O: -1, C: -1, R: -1, KEYS: -1, MULTI: false, NULL: false,
//---------- GENIE TOUCH BAR -------------------			  COLOUR: { KEY: "", SELECTION: "", DISABLED: "" }, SELECT: -1/[], ORIENT: -1 }
var GenieTouchBar = function() {
	var SelectedKey, SelectedKeys, DisabledKeys;
	var KeyChangeFlag;
	var Offset;

	var c, r, l;
};
GenieTouchBar.prototype = new GenieControl();
GenieTouchBar.prototype.Set = function(cnvs, specs, pSpecs, img) {  //p- pic
	GenieControl.prototype.Set.call(this, cnvs, specs);

	this.Pic = new GenieImage();
	if (img)
		this.Pic.Set(this.Context, img, pSpecs);
	else
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
		if (this.Specs.SELECT===undefined)
			this.SelectedKey = -1;
		else
			this.SelectedKey = this.Specs.SELECT;
};
GenieTouchBar.prototype.SetDisabled = function(aKeys) {

	this.DisabledKeys = aKeys;
};
GenieTouchBar.prototype.Draw = function() {

	//Strip background
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.KEY || TOUChBAR.COLOUR.KEY;
	else
		this.Context.fillStyle = TOUChBAR.COLOUR.KEY;
	this.Context.fillRect(this.Specs.L+this.Offset, this.Specs.T+this.Offset, this.Specs.W-(2*this.Offset), this.Specs.H-(2*this.Offset));

	//Colour disabled cells
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.DISABLED || TOUChBAR.COLOUR.DISABLED;
	else
		this.Context.fillStyle = TOUChBAR.COLOUR.DISABLED;
	if (this.DisabledKeys)
		for (this.i=0;this.i<this.DisabledKeys.length;++this.i)
			this.DrawKey(this.DisabledKeys[this.i]);

	//Selection
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.SELECTION || TOUChBAR.COLOUR.SELECTION;
	else
		this.Context.fillStyle = TOUChBAR.COLOUR.SELECTION;
	if (this.Specs.MULTI) {
		for (this.i=0;this.i<this.Specs.KEYS;++this.i)
			if (this.SelectedKeys[this.i])
				this.DrawKey(this.i);
	} else {
		if (this.SelectedKey!=-1)
			this.DrawKey(this.SelectedKey);
	}

	this.Pic.Draw(this.Specs.L, this.Specs.T);
};
GenieTouchBar.prototype.DrawKey = function(iKey) {

	if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL) {
		this.l = this.Specs.L + (iKey*(this.Specs.KEY.W+this.Offset)) + this.Offset;
		this.Context.fillRect(this.l, this.Specs.T+this.Offset, this.Specs.KEY.W, this.Specs.KEY.H);
	} else if (this.Specs.ORIENT==ORIENTATION.VERTICAL) {
		this.t = this.Specs.T + (iKey*(this.Specs.KEY.H+this.Offset)) + this.Offset;
		this.Context.fillRect(this.Specs.L+this.Offset, this.t, this.Specs.KEY.W, this.Specs.KEY.H);
	} else {
		this.l = (iKey % this.Specs.C) * (this.Specs.KEY.W+this.Offset);
		this.t = Math.floor(iKey/this.Specs.C) * (this.Specs.KEY.H+this.Offset);
		this.Context.fillRect(this.Specs.L+this.Offset+this.l, this.Specs.T+this.Offset+this.t, this.Specs.KEY.W, this.Specs.KEY.H);
	}
};
GenieTouchBar.prototype.MouseDown = function() {

	this.i = this.GetKey();

	//Check if a disabled cell (key) was clicked
	if (this.DisabledKeys)
		if (this.DisabledKeys.includes(this.i))
			return;

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
		return (Math.floor((Mouse.Down.X-(this.Specs.L+this.Offset))/(this.Specs.KEY.W+this.Offset)));
	else if (this.Specs.ORIENT==ORIENTATION.VERTICAL)
		return (Math.floor((Mouse.Down.Y-(this.Specs.T+this.Offset))/(this.Specs.KEY.H+this.Offset)));
	else {
		this.c = Math.floor((Mouse.Down.X-(this.Specs.L+this.Offset))/(this.Specs.KEY.W+this.Offset));
		this.r = Math.floor((Mouse.Down.Y-(this.Specs.T+this.Offset))/(this.Specs.KEY.H+this.Offset));
		return ((this.Specs.C*this.r)+this.c);
	}
};
GenieTouchBar.prototype.ChangeKey = function(nKey) {

	this.SelectedKey = nKey;
	this.Draw();
};
