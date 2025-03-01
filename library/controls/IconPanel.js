/*
 *  NOTE: different from button panel in that one or more icons could stay in depressed state (so in fact this is a glorified radio group)
 *  ISSUE: actually, at the moment it seems only one icon can be in depressed state
 *  TODO: want to make this more like ButtonPanel in that an image will be supplied for the outline rather than using .GraphicsTool
 */
//------------------------------------------------  specs = { L: -1, T: -1, W: -1, H: -1, LW: -1, R: -1, C: -1, MULTI: false,
//---------- GENIE ICON PANEL --------------------				  ICONS: -1, ICON: { W: -1, H: -1 }, PRESS: -1, COLOURS: "" };
var GenieIconPanel = function() {
	var CornersPic, BevelPic;
	var Icon, DepressedIcon;		//indices
	var MouseDownFlag, IconChangeFlag;
	var PicContext;
};
GenieIconPanel.prototype = new GenieControl();
GenieIconPanel.prototype.Set = function(canvas, specs, pSpecs) {
	GenieControl.prototype.Set.call(this, canvas, specs);

	if (pSpecs) {
		this.Pic = new GenieImage();
		this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], pSpecs);
	}
	if (this.Specs.PRESS!=null) {
		this.DepressedIcon = this.Specs.PRESS;
		this.MouseDownFlag = true;
	} else {
		this.DepressedIcon = -1;
		this.MouseDownFlag = false;
	}
	this.IconChangeFlag = false;
};
GenieIconPanel.prototype.SetCornersPic = function(pic) {

	this.CornersPic = pic;
	this.PicContext = this.CornersPic.Context;
};
GenieIconPanel.prototype.SetBevelPic = function(pic) {

	this.BevelPic = pic;
	this.PicContext = this.BevelPic.Context;
};
GenieIconPanel.prototype.MouseDown = function() {

	this.Icon = this.GetIconPressed();
	if (this.Icon==-1)
		return;
	this.MouseDownFlag = true;
	if (this.Icon!=this.DepressedIcon) {
		this.IconChangeFlag = true;
		if (this.DepressedIcon!=-1)
			this.DrawIcon(this.DepressedIcon);
		this.DrawIcon(this.Icon, PRESSED);
		this.DepressedIcon = this.Icon;
	}
};
GenieIconPanel.prototype.CheckMouseDown = function() {

	if (!this.MouseDownFlag)
		return (false);
	this.MouseDownFlag = false;
	return (true);
};
GenieIconPanel.prototype.CheckIconChanged = function() {

	if (this.IconChangeFlag) {
		this.IconChangeFlag = false;
		return (true);
	} else
		return (false);
};
GenieIconPanel.prototype.Draw = function() {
	var i;

	for (i=0;i<this.Specs.ICONS;++i)
		if (i==this.DepressedIcon)
	 this.DrawIcon(i, PRESSED);
		else
	 this.DrawIcon(i);
};
GenieIconPanel.prototype.GetIconPressed = function() {  //returns index
	var x, y;

	x = Math.floor((Mouse.Down.X-this.Specs.L)/this.Specs.ICON.W);
	y = Math.floor((Mouse.Down.Y-this.Specs.T)/this.Specs.ICON.H);
	this.Icon = x + (this.Specs.C*y);
	if (this.Icon>=this.Specs.ICONS)
		return (-1);
	else
		return (this.Icon);
};
GenieIconPanel.prototype.DrawIcon = function(iIcon, bPressed) {
	var x, y;
	var w, h;
	var colour1, colour2;

	this.EraseIcon(iIcon);

	//Determine correct coordinates
	x = this.Specs.L + Math.round(this.Specs.ICON.W*(iIcon % this.Specs.C));
	y = this.Specs.T + Math.round(this.Specs.ICON.H*Math.floor(iIcon/this.Specs.C));

	//Draw edges and corners
	if (this.BevelPic) {

		//Draw bevel
		this.BevelPic.Context = this.Context;
		if (bPressed)
			this.BevelPic.DrawPatchNumber(1, x, y);
		else
			this.BevelPic.DrawPatchNumber(0, x, y);
		this.BevelPic.Context = this.PicContext;
		if (this.Pic)
			this.Pic.DrawPatchNumber(iIcon, x+this.Specs.LW, y+this.Specs.LW);
		else {
			w = this.Specs.ICON.W - (2*this.Specs.LW);
			h = this.Specs.ICON.H - (2*this.Specs.LW);
			this.GraphicsTool.SwitchContext(this.Context);
			this.GraphicsTool.DrawRectangle(x+this.Specs.LW, y+this.Specs.LW, w, h, this.Specs.COLOURS[iIcon], 0);
			this.GraphicsTool.RestoreContext();
		}
	} else {

		this.GraphicsTool.SwitchContext(this.Context);

		//Set correct corners and colours for drawing
		if (bPressed) {
			num = 4;
			colour1 = GREY.ONYX;
			colour2 = GREY.FAINT;
		} else {
			num = 0;
			colour1 = GREY.FAINT;
			colour2 = GREY.ONYX;
		}

		//Draw shadows
		this.GraphicsTool.DrawRectangle(x, y, this.Specs.ICON.W, this.Specs.LW, colour1, 0);													//top
		this.GraphicsTool.DrawRectangle(x+this.Specs.ICON.W-this.Specs.LW, y, this.Specs.LW, this.Specs.ICON.H, colour2, 0);			//right
		this.GraphicsTool.DrawRectangle(x, y+this.Specs.ICON.H-this.Specs.LW, this.Specs.ICON.W, this.Specs.LW, colour2, 0);			//bottom
		this.GraphicsTool.DrawRectangle(x, y, this.Specs.LW, this.Specs.ICON.H, colour1, 0);													//left

		//Draw Image or colour
		if (this.Pic)
			this.Pic.DrawPatchNumber(iIcon, x+this.Specs.LW, y+this.Specs.LW);
		else {
			w = this.Specs.ICON.W - (2*this.Specs.LW);
			h = this.Specs.ICON.H - (2*this.Specs.LW);
			this.GraphicsTool.DrawRectangle(x+this.Specs.LW, y+this.Specs.LW, w, h, this.Specs.COLOURS[iIcon], 0);
		}

		//Draw corners
		this.CornersPic.Context = this.Context;
		this.CornersPic.DrawPatchNumber(num, x, y);			//top-left corner
		x += (this.Specs.ICON.W-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(num+1, x, y);		//top-right
		y += (this.Specs.ICON.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(num+2, x, y);		//bottom-right
		x -= (this.Specs.ICON.W-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(num+3, x, y);		//bottom-left
		this.CornersPic.Context = this.PicContext;

		this.GraphicsTool.RestoreContext();
	}
};
GenieIconPanel.prototype.EraseIcon = function(iIcon) {
	var x, y;

	//Determine correct coordinates
	x = this.Specs.L + (this.Specs.ICON.W*(iIcon % this.Specs.C));
	y = this.Specs.T + (this.Specs.ICON.H*Math.floor(iIcon/this.Specs.C));
	if (this.Specs.COLOUR) {
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(x, y, this.Specs.ICON.W, this.Specs.ICON.H);
	} else
		this.Context.clearRect(x, y, this.Specs.ICON.W, this.Specs.ICON.H);
};
GenieIconPanel.prototype.UnPress = function() {
	var x, y;

	if (this.DepressedIcon==-1)
		return;
	x = this.Specs.L + (this.Specs.ICON.W*(iIcon % this.Specs.C));
	y = this.Specs.T + (this.Specs.ICON.H*Math.floor(iIcon/this.Specs.C));
	if (this.Specs.COLOUR) {
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(x, y, this.Specs.ICON.W, this.Specs.ICON.H);
	} else
		this.Context.clearRect(x, y, this.Specs.ICON.W, this.Specs.ICON.H);
	this.DrawIcon(this.DepressedIcon);
	this.DepressedIcon = -1;
};
