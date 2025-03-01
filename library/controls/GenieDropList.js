/*
 *  can solve the problem of droplist box clicking by giving all the controls each dropbox will cover, and able/disable based on its dropdown state - this way
 *  refreshing won't be needed (of course, specs will have to be altered based on dropdown status)
 *
 *  better yet, it would just be easier to organize controls in such a way that there is no clash
 */
//--------------------------------------------------
//---------- GENIE DROPDOWN LIST -------------------
var GenieDropDownList = function() {
	var Items;
	var ListDown;
	var ItemSelected;
	var Height;
};
GenieDropDownList.prototype = new GenieControl();
GenieDropDownList.prototype.Set = function(cnvs, specs, img) {
	GenieControl.prototype.Set.call(this, cnvs, specs, img);

	if (!this.Pic) {	//create an image if one is not passed in (obviously, there will then be only 1 dropdownlist in entire app)
		this.Pic = new GenieImage();
		this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], DROpLIStBUTTOnIMAGE);
	}
	this.ListDown = false;
	this.ItemSelected = 0;
	this.Height = this.Specs.H;
	this.Items = this.Specs.ITEMS;

	this.rct = new GenieRect();
};
GenieDropDownList.prototype.SetItems = function(itms) {  //TODO: shouldn't this be in specs?
 
 this.Items = itms;
};
GenieDropDownList.prototype.RemoveItem = function(item) {

	this.i = this.indexOf(item);					//NOTE: this only works because entries will be strings or integers
	this.splice(this.i, 1);
};
GenieDropDownList.prototype.AddItem = function(item, iItem) {

	this.splice(iItem, 0, item);
};
GenieDropDownList.prototype.Draw = function() {

	//Clear control area
	this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	this.Context.lineWidth = 1;

	//Draw outline
	this.Context.strokeStyle = this.Specs.COLOUR || CONTROL.COLOUR;
	this.Context.strokeRect(this.Specs.L+0.5, this.Specs.T+0.5, this.Specs.W-1, this.Specs.H-1);

	this.DrawButton();
	this.WriteSelection();

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write(this.Items[this.ItemSelected], this.Specs.L+5, this.Specs.T+this.Specs.H-5);
	this.TextWriter.RestoreContext();
};
GenieDropDownList.prototype.DrawButton = function() {

	this.x = this.Specs.L + this.Specs.W - DROpDOWnLIST.BUTTON.W - 1;
	this.y = this.Specs.T + 1;
	this.Context.fillStyle = this.Specs.COLOUR || CONTROL.COLOUR;
	this.Context.fillRect(this.x+2, this.y+2, DROpDOWnLIST.BUTTON.W-4, DROpDOWnLIST.BUTTON.W-4);
	if (this.ListDown)
		this.Pic.DrawPatchNumber(1, this.x, this.y);
	else
		this.Pic.DrawPatchNumber(0, this.x, this.y);
};
GenieDropDownList.prototype.WriteSelection = function() {

	this.Context.clearRect(this.Specs.L+1, this.Specs.T+1, this.Specs.W-DROpDOWnLIST.BUTTON.W-2, this.Height-2);
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write(this.Items[this.ItemSelected], this.Specs.L+5, this.Specs.T+this.Height-5);
	this.TextWriter.RestoreContext();
};
GenieDropDownList.prototype.ClickedOn = function() {

	//Check if button is clicked
	this.rct.Set(this.Specs.L+this.Specs.W-DROpDOWnLIST.BUTTON.W, this.Specs.T+1, DROpDOWnLIST.BUTTON.W, DROpDOWnLIST.BUTTON.H);
	if (SpaceUtils.CheckPointInBox(Mouse.Click, this.rct)) {
		if (this.ListDown)
	 this.RetractList();
		else
	 this.DrawList();
		this.ListDown = !this.ListDown;
		this.DrawButton();
	} else {
		this.ItemSelected = Math.floor((Mouse.Click.Y-(this.Specs.T+this.Height))/15);
		if (this.ItemSelected<0)
	 this.ItemSelected = 0;
		this.WriteSelection();
		if (this.ListDown) {
	 this.Specs.H = this.Height;
	 this.ListDown = false;
	 this.RetractList();
	 this.DrawButton();
		}
	}
};
GenieDropDownList.prototype.DrawList = function() {

	//Draw box
	this.Context.clearRect(this.Specs.L, this.Specs.T+this.Specs.H, this.Specs.W, 15*this.Items.length);
	this.Context.strokeStyle = this.Specs.COLOUR || CONTROL.COLOUR;
	this.Context.strokeRect(this.Specs.L+0.5, this.Specs.T+0.5+this.Specs.H-1, this.Specs.W-1, 15*this.Items.length);

	//Write items
	this.TextWriter.SetContext(this.Context);
	for (this.i=0;this.i<this.Items.length;++this.i)
		this.TextWriter.Write(this.Items[this.i], this.Specs.L+5, this.Specs.T+this.Specs.H+((this.i+1)*15)-2);
	this.TextWriter.RestoreContext();
	this.Specs.H *= this.Items.length;
};
GenieDropDownList.prototype.RetractList = function() {
	this.Specs.H = this.Height;
	this.Context.fillStyle = this.Specs.BACKGROUND || CONTROL.BACKGROUND;
	this.Context.fillRect(this.Specs.L, this.Specs.T+this.Specs.H, this.Specs.W, 15*this.Items.length);
};
