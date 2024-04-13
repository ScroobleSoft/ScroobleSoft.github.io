/*
 *  deafult colouring is light grey for unselected pages, light blue for selected ones
 *  NOTE: 'ITEMS.PAGE' denotes the number of entries displayed per page; # of pages won't be fixed, and will depend on # of items
 */
//-----------------------------------------------  specs: { L: -1, T: -1, W: -1, H: -1, ITEMS: { PAGE: -1, COLOUR: "", MAX: -1 },
//---------- GENIE PAGINATION -------------------		 COLOUR: { FRAME: "", PAGE: "", STRIP: "", SELECTION: "" } }
var GeniePagination = function() {
	var SelectedPage, SelectedItemIndex, SelectedIem;		//NOTE: index is for entry on page, not overall entry in list of items
	var PageChangeFlag, SelectionChangeFlag;					//refers to selected item
	var Items, Pages;
};
GeniePagination.prototype = new GenieControl();
GeniePagination.prototype.Set = function(cnvs, specs, img, pSpecs) {  //p- pic
	GenieControl.prototype.Set.call(this, cnvs, specs, img);

	if (!this.Pic) {	//create an image if one is not passed in (obviously, there will then be only 1 pagination control in entire app)
		this.Pic = new GenieImage();
		if (pSpecs)
			this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], pSpecs);
		else
			this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], PAGeNUMBERsIMAGE);
	}

	this.SelectedPage = 0;
	this.SelectedItemIndex = 0;
	this.SelectionChangeFlag = false;
	this.PageChangeFlag = false;
};
GeniePagination.prototype.SetItems = function(itms) {  //NOTE: this method is partly to allow writing items here if so chosen; mostly, the app does the writing

	this.Items = itms;
	this.SelectedItem = this.Items[0];

	//TEMP - HACK!
	this.Items.Length = 900;

	if (this.Items.Length===undefined)			//NOTE: unknown whether .Items will be in Array or GenieList format
		this.Pages = Math.ceil(this.Items.length/this.Specs.ITEMS.PAGE);
	else
		this.Pages = Math.ceil(this.Items.Length/this.Specs.ITEMS.PAGE);
};
GeniePagination.prototype.Draw = function() {

	this.DrawPage();

	//Frame
	if (this.Specs.COLOUR)
		this.Context.strokeStyle = this.Specs.COLOUR.FRAME || "black";
	else
		this.Context.strokeStyle = "black";
	this.Context.strokeRect(this.Specs.L+0.5, this.Specs.T+0.5, this.Specs.W-1, this.Specs.H-(this.Pic.Specs.H+1));

	//Numbers strip image and background
	if (this.Items)
		if (this.Items.length)
			this.DrawStrip();
};
GeniePagination.prototype.DrawPage = function() {

	//Page background
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.PAGE || PAGINATION.COLOUR.PAGE;
	else
		this.Context.fillStyle = PAGINATION.COLOUR.PAGE;
	this.Context.fillRect(this.Specs.L+1, this.Specs.T+1, this.Specs.W-2, this.Specs.H-(this.Pic.Specs.H+2));

	//Highlight selected slot
	if (this.Specs.COLOUR)
		this.Context.fillStyle = this.Specs.COLOUR.SELECTION || PAGINATION.COLOUR.SELECTION;
	else
		this.Context.fillStyle = PAGINATION.COLOUR.SELECTION;
	this.Context.fillRect(this.Specs.L+1, this.Specs.T+1+(15*this.SelectedItemIndex), this.Specs.W-2, 15);  //TODO: entry height needs to be customized
};
GeniePagination.prototype.MouseDown = function() {  //check if mouse is down over the strip - otherwise, ignore

	if (this.Pic.CheckMouseDown()) {
		this.i = this.GetPage();
		if (this.i==-1)
			return;
		else if (this.i!=this.SelectedPage) {
			this.SelectedPage = this.i;
			this.SelectedItemIndex = 0;
			this.SelectedItem = this.Items[(this.SelectedPage*this.Specs.ITEMS.PAGE)+this.SelectedItemIndex];
			this.PageChangeFlag = true;
		}
	}
};
GeniePagination.prototype.ClickedOn = function() {

	//Check if strip rather than page was clicked on - ignore if so
	if (Mouse.Click.Y>(this.Specs.T+this.Specs.H-(this.Pic.Specs.H+2)))
		return;

	//Determine item clicked on
	this.i = Math.floor((Mouse.Click.Y-this.Specs.T)/15);	//ISSUE: entry height is being HARD-CODED at 15px - future flexibility has to be added in specs
	if (this.i!=this.SelectedItemIndex) {
		this.SelectedItemIndex = this.i;
		this.SelectedItem = this.Items[(this.SelectedPage*this.Specs.ITEMS.PAGE)+this.SelectedItemIndex];
		this.SelectionChangeFlag = true;
	}
};
GeniePagination.prototype.CheckPageChanged = function() {

	if (this.PageChangeFlag) {
		this.PageChangeFlag = false;
		return (true);
	} else
		return (false);
};
GeniePagination.prototype.CheckSelectionChanged = function() {

	if (this.SelectionChangeFlag) {
		this.SelectionChangeFlag = false;
		return (true);
	} else
		return (false);
};
GeniePagination.prototype.DrawStrip = function() {
	var i;
	var l, t, w, h;
	var r;
	var ptch;
	var sColour, cColour;	//s- strips, c- clicked

	ptch = this.Specs.PATCH ? this.Specs.PATCH : PAGINATION.PATCH;

	//Set colours
	if (this.Specs.COLOUR) {
		sColour = this.Specs.COLOUR.STRIP || PAGINATION.COLOUR.STRIP;
		cColour = this.Specs.COLOUR.PAGE || PAGINATION.COLOUR.PAGE;
	} else {
		sColour = PAGINATION.COLOUR.STRIP;
		cColour = PAGINATION.COLOUR.PAGE;
	}

	t = this.Specs.T + this.Specs.H - (this.Pic.Specs.H+1);
	if (this.Specs.R) {

		r = Math.floor(this.Pages/this.Specs.C);		//NOTE: only complete rows

		//Colour background
		this.Context.fillStyle = sColour;
		this.Context.fillRect(this.Specs.L+1, t, this.Pic.Specs.W-2, (ptch.H+1)*r);		//complete rows
		if (this.Pages % this.Specs.C) {																	//partial rows
			t += (ptch.H+1) * r;
			w = ((this.SelectedPage % this.Specs.C)*(ptch.W+1)) - 1;
			this.Context.fillRect(this.Specs.L+1, t, w, ptch.H+2);
			t -= (ptch.H+1) * r;		//NOTE: doing this as it will be used again below
		}

		//Colour selection
		this.Context.fillStyle = cColour;
		w = ((this.SelectedPage % this.Specs.C)*(ptch.W+1)) + 1;
		h = (Math.floor(this.SelectedPage/this.Specs.C)*(ptch.H+1)) + 1;
		this.Context.fillRect(this.Specs.L+w, t+h, ptch.W, ptch.H);
	
		//Draw rows' bitmap (first complete, then partial if any)
		this.Pic.DrawPatch(this.Specs.L, t, 0, 0, this.Pic.Specs.W, ((ptch.H+1)*r)+1);		//complete
		if (this.Pages % this.Specs.C) {																		//partial
			t += (ptch.H+1) * r;
			w = ((this.SelectedPage % this.Specs.C)*(ptch.W+1)) + 1;
			this.Pic.DrawPatch(this.Specs.L, t, 0, 0, w, ptch.H+2);
		}

	} else {

		//Colour background
		this.Context.fillStyle = sColour;
		this.Context.fillRect(this.Specs.L+1, t, this.Pages*(ptch.W+1), this.Pic.Specs.H-2);

		//Colour selection
		this.Context.fillStyle = cColour;
		l = this.Specs.L + (this.SelectedPage*(ptch.W+1)) + 1;
		this.Context.fillRect(l, t, ptch.W, ptch.H);

		//Draw bitmap
		this.Pic.DrawPatch(this.Specs.L, t, 0, 0, ((this.Pages)*(ptch.W+1))+1, this.Pic.Specs.H);
	}
};
GeniePagination.prototype.GetPage = function() {

	this.i = Math.floor((Mouse.Down.X-this.Specs.L)/(PAGINATION.PATCH.W+1));
	if (this.i<this.Pages)
		return (this.i);
	else
		return (-1);
};
