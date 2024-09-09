/*
 *  NOTE: different from button panel in that one or more icons could stay in depressed state (so in fact this is a glorified radio group)
 *  ISSUE: actually, at the moment it seems only one icon can be in depressed state
 *  TODO: want to make this more like ButtonPanel in that an image will be supplied for the outline rather than using .GraphicsTool
 */
//------------------------------------------------  specs = { L: -1, T: -1, W: -1, H: -1, LW: -1, R: -1, C: -1,
//---------- GENIE ICON PANEL --------------------				  ICONS: -1, ICON: { W: -1, H: -1 }, PRESS: -1, COLOURS: "" };
var GenieIconPanel = function() {
	var CornersPic;
	var Icon, DepressedIcon;		//indices
	var MouseDownFlag, IconChangeFlag;
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
};
GenieIconPanel.prototype.MouseDown = function() {

	this.Icon = this.GetIconPressed();
	if (this.Icon==-1)
		return;
	this.MouseDownFlag = true;
	if (this.Icon!=this.DepressedIcon) {
		this.IconChangeFlag = true;
		this.GraphicsTool.SwitchContext(this.Context);
		if (this.DepressedIcon!=-1)
			this.DrawIcon(this.DepressedIcon);
		this.DrawIcon(this.Icon, PRESSED);
		this.DepressedIcon = this.Icon;
		this.GraphicsTool.RestoreContext();
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

	this.GraphicsTool.SwitchContext(this.Context);
	for (i=0;i<this.Specs.ICONS;++i)
		if (i==this.DepressedIcon)
	 this.DrawIcon(i, PRESSED);
		else
	 this.DrawIcon(i);
	this.GraphicsTool.RestoreContext();
};
GenieIconPanel.prototype.GetIconPressed = function() {  //returns index

	this.x = Math.floor((Mouse.Down.X-this.Specs.L)/(this.Specs.ICON.W+(2*this.Specs.LW)));
	this.y = Math.floor((Mouse.Down.Y-this.Specs.T)/(this.Specs.ICON.H+(2*this.Specs.LW)));
	this.Icon = this.x + (this.Specs.C*this.y);
	if (this.Icon>=this.Specs.ICONS)
		return (-1);
	else
		return (this.Icon);
};
GenieIconPanel.prototype.DrawIcon = function(iIcon, bPressed) {
	var colour1, colour2;

	this.EraseIcon(iIcon);

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

	//Determine correct coordinates
	this.x = this.Specs.L + Math.round((this.Specs.ICON.W+(2*this.Specs.LW))*(iIcon % this.Specs.C));
	this.y = this.Specs.T + Math.round((this.Specs.ICON.H+(2*this.Specs.LW))*Math.floor(iIcon/this.Specs.C));

	//Draw shadows
	this.GraphicsTool.DrawRectangle(this.x+this.Specs.LW, this.y, this.Specs.ICON.W, this.Specs.LW, colour1, 0);											//top shadow
	this.GraphicsTool.DrawRectangle(this.x+this.Specs.ICON.W+this.Specs.LW, this.y+this.Specs.LW, this.Specs.LW, this.Specs.ICON.H, colour2, 0);	//right
	this.GraphicsTool.DrawRectangle(this.x+this.Specs.LW, this.y+this.Specs.ICON.H+this.Specs.LW, this.Specs.ICON.W, this.Specs.LW, colour2, 0);	//bottom
	this.GraphicsTool.DrawRectangle(this.x, this.y+this.Specs.LW, this.Specs.LW, this.Specs.ICON.H, colour1, 0);											//left

	//Draw Image or colour
	if (this.Pic)
		this.Pic.DrawPatchNumber(iIcon, this.x+this.Specs.LW, this.y+this.Specs.LW);
	else
		this.GraphicsTool.DrawRectangle(this.x+this.Specs.LW, this.y+this.Specs.LW, this.Specs.ICON.W, this.Specs.ICON.H, this.Specs.COLOURS[iIcon], 0);

	//Draw corners
	this.CornersPic.DrawPatchNumber(num, this.x, this.y);			//top-left corner
	this.x += (this.Specs.ICON.W+this.Specs.LW);
	this.CornersPic.DrawPatchNumber(num+1, this.x, this.y);		//top-right
	this.y += (this.Specs.ICON.H+this.Specs.LW);
	this.CornersPic.DrawPatchNumber(num+2, this.x, this.y);		//bottom-right
	this.x -= (this.Specs.ICON.W+this.Specs.LW);
	this.CornersPic.DrawPatchNumber(num+3, this.x, this.y);		//bottom-left
};
GenieIconPanel.prototype.EraseIcon = function(iIcon) {

	//Determine correct coordinates
	this.x = this.Specs.L + ((this.Specs.ICON.W+(2*this.Specs.LW))*(iIcon % this.Specs.C));
	this.y = this.Specs.T + ((this.Specs.ICON.H+(2*this.Specs.LW))*Math.floor(iIcon/this.Specs.C));

	if (this.Specs.COLOUR) {
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(this.x, this.y, this.Specs.ICON.W+(2*this.Specs.LW), this.Specs.ICON.H+(2*this.Specs.LW));
	} else
		this.Context.clearRect(this.x, this.y, this.Specs.ICON.W+(2*this.Specs.LW), this.Specs.ICON.H+(2*this.Specs.LW));
};
GenieIconPanel.prototype.UnPress = function() {

	if (this.DepressedIcon==-1)
		return;

	this.x = this.Specs.L + ((this.Specs.ICON.W+(2*this.Specs.LW))*(this.DepressedIcon % this.Specs.C));
	this.y = this.Specs.T + ((this.Specs.ICON.H+(2*this.Specs.LW))*Math.floor(this.DepressedIcon/this.Specs.C));
	if (this.Specs.COLOUR) {
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(this.x, this.y, this.Specs.ICON.W+(2*this.Specs.LW), this.Specs.ICON.H+(2*this.Specs.LW));
	} else
		this.Context.clearRect(this.x, this.y, this.Specs.ICON.W+(2*this.Specs.LW), this.Specs.ICON.H+(2*this.Specs.LW));
	this.DrawIcon(this.DepressedIcon);
	this.DepressedIcon = -1;
};
