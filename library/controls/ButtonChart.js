/*
 *  not being used anywhere, and may be REDUNDANT
 */
/*
 *  Specs format depends on whether image or text labels are used
 *  text:  { L: l, T: t, W: w, H: h, GAP: gap, LABELS: [ ] };
 *  image: { L: l, T: t, W: w, H: h, GAP: gap, SX: sx, SY: sy };
 */
/*
//--------------------------------------------
//---------- GROUP BUTTON --------------------
var GroupButton = function() {
   var Pressed;
   var Group;
};
GroupButton.prototype = new CanvasButton();
GroupButton.prototype.ClickedOn = function() {
   if (!this.Pressed) {
      this.Group.ButtonPressed.UnPress();
      this.Press();
   }
};
GroupButton.prototype.Press = function() {
   this.DrawPressed();
   this.Pressed = true;
   this.Group.ButtonPressed = this;
};
GroupButton.prototype.UnPress = function() {
   this.Draw();
   this.Pressed = false;
};
*/
//--------------------------------------------------
//---------- GENIE BUTTON GROUP --------------------
var GenieButtonChart = function() {
//   var Buttons;
   var ButtonPressed;
};
GenieButtonChart.prototype = new GenieCanvasControl();
GenieButtonChart.prototype.Set = function(cnvs, specs, gTool, tWriter) {
/*
   var i;
   var l, t, sx, sy;
   var specs;
   var lHeight;  //l- label
*/
   GenieCanvasControl.prototype.Set.call(this, cnvs, specs, gTool, tWriter);
/*
   this.Buttons = Utilities.CreateArray(3, GroupButton);
   for (i=0;i<this.Specs.COUNT;++i) {
      switch (this.Specs.ORIENTATION) {
	 case ORIENTATION.HORIZONTAL:
	    l = this.Specs.L + (i*(this.Specs.W+this.Specs.GAP));
	    t = this.Specs.T;
	    break;
	 case ORIENTATION.VERTICAL:
	    l = this.Specs.L;
	    t = this.Specs.T + (i*(this.Specs.H+this.Specs.GAP));
	    break;
      }
      if (this.Specs.LABELS) {
	 specs = { L: l, T: t, W: this.Specs.W, H: this.Specs.H, GAP: gap, LABEL: this.Specs.LABELS[i] };
	 this.Buttons[i].Set(cnvs, null, specs, tWriter);
      } else {
	 sx = this.Specs.SX + (i*(this.Specs.W+this.Specs.O));	//ASSUMPTION: all images will be in a row rather than a column
	 sy = this.Specs.SY;
// TODO: this will be if images are in a column (IMAGE.ORIENTATION field?)
//	 sx = this.Specs.SX;
//	 sy = this.Specs.SY + (i*(this.Specs.W+this.Specs.O));
//
	 specs = { L: l, T: t, W: this.Specs.W, H: this.Specs.H, O: this.Specs.O, SX: sx, SY: sy };
	 this.Buttons[i].Set(cnvs, iSheet, specs);
      }
      this.Buttons[i].Group = this;
   }

   if (this.Specs.SELECTION)
      this.ButtonPressed = this.Buttons[this.Specs.SELECTION];
   else
      this.ButtonPressed = this.Buttons[0];
   this.ButtonPressed.Pressed = true;
*/
};
/*
GenieButtonGroup.prototype.ClickedOn = function() {
   var i;

   GenieCanvasControl.prototype.ClickedOn.call(this);

   for (i=0;i<this.Specs.COUNT;++i)
     if (Utilities.PointInBox(Mouse.GetClickCoordinates(), this.Buttons[i].Specs)) {
	 this.Buttons[i].ClickedOn();
	 break;
      }
};
GenieButtonGroup.prototype.Display = function() {
   if (this.Specs.LABEL)
      this.WriteLabel();
   this.Buttons.forEach(function(button){button.Display();});
   this.ButtonPressed.Press();
};
GenieButtonGroup.prototype.Hide = function() {
   if (this.Specs.LABEL)
      this.EraseLabel();
   this.Buttons.forEach(function(button){button.Hide();});
};
GenieButtonGroup.prototype.WriteLabel = function() {
   var bLength, lLength;  //b- buttons, l- label
   var lPos;

   //NOTE: positioned above buttons, so space has to be accounted for

   //Determine overall width of buttons
   if (this.Specs.ORIENTATION==ORIENTATION.HORIZONTAL)
      bLength = (this.Specs.W*this.Specs.COUNT) + (this.Specs.GAP*(this.Specs.COUNT-1));
   else
      bLength = this.Specs.W;

   //Determine X position of text
   lLength = this.Context.measureText(this.Specs.LABEL).width;
   if (lLength>bLength)
      lPos = this.Specs.L - Math.round((lLength-bLength)/2);
   else
      lPos = this.Specs.L + Math.round((bLength-lLength)/2);
   this.TextWriter.Context = this.Context;
   this.TextWriter.Write(this.Specs.LABEL, lPos, this.Specs.T-4);
   this.TextWriter.RestoreContext();
};
GenieButtonGroup.prototype.EraseLabel = function() {
   var bLength, lLength;  //b- buttons, l- label
   var lPos;

   //NOTE: positioned above buttons, so space has to be accounted for

   //Determine overall width of buttons
   if (this.Specs.ORIENTATION==ORIENTATION.HORIZONTAL)
      bLength = (this.Specs.W*this.Specs.COUNT) + (this.Specs.GAP*(this.Specs.COUNT-1));
   else
      bLength = this.Specs.W;

   //Determine X position of text
   lLength = this.Context.measureText(this.Specs.LABEL).width;
   if (lLength>bLength)
      lPos = this.Specs.L - Math.round((lLength-bLength)/2);
   else
      lPos = this.Specs.L + Math.round((bLength-lLength)/2);
   this.Context.clearRect(lPos, this.Specs.T-18, lLength, 20);		//HARD-CODING!
};
*/