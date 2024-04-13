/*
 *  TODO: at the moment the scroll bar is not clickable, its only purpose being to indicate percentage of items displayed, and which set is visible
 */
//---------------------------------------------------  NOTE: 19x17 are arrow button dimensions, hence the frequent use of these numbers
//---------- EMBEDDED SCROLL BAR --------------------  NOTE: .Specs.ITEMS is the maximum number of items displayed at any given time
var EmbeddedScrollBar = function() {
   var Context;
   var Specs;
   var Control;					//parent control
   var UpRect, DownRect, ThumbRect;
   var ThumbSize, ThumbPosition, ThumbGaps;	//'Gaps' are increments by which thumb moves up and down
   var Items, FirstItem;			//.Items denotes quantity, .FirstItem is first one depicted
   var UpFlag, DownFlag, ThumbFlag;
};
EmbeddedScrollBar.prototype = {
   Set(cntxt, specs, cntrl) {
      this.Context = cntxt;
      this.Specs = specs;
      this.Control = cntrl;
      this.ThumbPosition = 0;
      this.SetRects();
      this.SetItems(this.Specs.ITEMS);
   },
   SetRects() {
      this.UpRect = new GenieRect();
      this.UpRect.Set(this.Specs.L, this.Specs.T, 19, 17);
      this.ThumbRect = new GenieRect();
      this.ThumbRect.Set(this.Specs.L, this.Specs.T+17, 19, this.Specs.H-34);
      this.DownRect = new GenieRect();
      this.DownRect.Set(this.Specs.L, this.Specs.T+this.Specs.H-17, 19, 17);
   },
   SetItems(nItems) {

      this.Items = nItems;

      //Set items if specified, set thumb size
      this.ThumbSize = this.Specs.ITEMS/this.Items;
      if (this.ThumbSize>1)
	 this.ThumbSize = 1;
      this.ThumbSize *= (this.Specs.H-34);
      this.ThumbSize = Math.round(this.ThumbSize);

      this.SetThumbPosition();
   },
   SetThumbPosition() {
      if (this.Items<=this.Specs.ITEMS)
	 this.ThumbPosition = this.Specs.T + 17;
      else {
	 this.ThumbGaps = Math.round((this.Specs.H-34-this.ThumbSize)/(this.Items-this.Specs.ITEMS));
	 if (this.Control.FirstItem>(this.Items-this.Specs.ITEMS))
	    this.Control.FirstItem = this.Items - this.Specs.ITEMS;
	 this.ThumbPosition = this.Specs.T + 17 + (this.Control.FirstItem*this.ThumbGaps);
      }
   },
   Draw() {

      this.DrawColumn();

      //Arrow buttons
      ScrollBarArrowsImage.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
      ScrollBarArrowsImage.DrawPatchNumber(2, this.Specs.L, this.Specs.T+this.Specs.H-17);
   },
   DrawColumn() {
      var y;

      //Column
      this.Context.fillStyle = "rgb(239,239,239)";
      this.Context.fillRect(this.Specs.L, this.Specs.T+17, this.Specs.W-1, this.Specs.H-34);	//NOTE: 1 is subtracted from width to compensate for button shadows

      //Thumb
      for (y=2;y<(this.ThumbSize-2);y+=3)
	 ScrollBarThumbImage.DrawPatchNumber(1, this.Specs.L, this.ThumbPosition+y);
      ScrollBarThumbImage.DrawPatchNumber(0, this.Specs.L, this.ThumbPosition);
      ScrollBarThumbImage.DrawPatchNumber(2, this.Specs.L, this.ThumbPosition+this.ThumbSize-2);
   },
   MouseDown() {

      //Up arrow
      if (SpaceUtils.CheckPointInBox(Mouse.Down, this.UpRect)) {
	 ScrollBarArrowsImage.DrawPatchNumber(1, this.Specs.L, this.Specs.T);
	 setTimeout(this.ResetUpArrow.bind(this), 100);
	 if (this.Control.FirstItem!=0) {
	    this.UpFlag = true;
	    --this.Control.FirstItem;
	    this.DrawColumn();
	 }
      }

      //Thumb and column
      if (SpaceUtils.CheckPointInBox(Mouse.Down, this.ThumbRect)) {
	 if (this.Items>this.Specs.ITEMS) {
	    this.ThumbFlag = true;
	    this.Control.FirstItem = Math.round((((Mouse.Down.Y-this.Specs.T)/this.Specs.H)*this.Items)-(this.Specs.ITEMS/2));
	    if (this.Control.FirstItem>(this.Items-this.Specs.ITEMS))
	       this.Control.FirstItem = this.Items - this.Specs.ITEMS;
	    this.ThumbPosition = this.Specs.T + 17 + (this.FirstItem*this.ThumbGaps);
	    this.DrawColumn();
	 }
      }

      //Down arrow
      if (SpaceUtils.CheckPointInBox(Mouse.Down, this.DownRect)) {
	 ScrollBarArrowsImage.DrawPatchNumber(3, this.Specs.L, this.Specs.T+this.Specs.H-19);
	 setTimeout(this.ResetDownArrow.bind(this), 100);
	 if (this.Control.FirstItem<(this.Items-this.Specs.ITEMS) && this.Items>this.Specs.ITEMS) {
	    this.DownFlag = true;
	    ++this.Control.FirstItem;
	    this.DrawColumn();
	 }
      }
   },
   CheckClicked() {
      return (SpaceUtils.CheckPointInBox(Mouse.Click, this.Specs));
   },
   CheckUpPressed() {
      if (!this.UpFlag)
	 return (false);
      else {
	 this.UpFlag = false;
	 return (true);
      }
   },
   CheckDownPressed() {
      if (!this.DownFlag)
	 return (false);
      else {
	 this.DownFlag = false;
	 return (true);
      }
   },
   CheckThumbMoved() {
      if (!this.ThumbFlag)
	 return (false);
      else {
	 this.ThumbFlag = false;
	 return (true);
      }
   },
   ResetUpArrow() {
      ScrollBarArrowsImage.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
   },
   ResetDownArrow() {
      ScrollBarArrowsImage.DrawPatchNumber(2, this.Specs.L, this.Specs.T+this.Specs.H-17);
   }
};
