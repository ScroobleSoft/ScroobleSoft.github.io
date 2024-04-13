/*
 *  TODO: probably will have no blinking cursor due to the need for calling ::Update
 *  TODO: should have .FONT and .COLOUR (text and background) in specs; might even have colour and style options for .BORDER, though to begin with
 *	  should have simple grey bas-relief
 */
//---------------------------------------------
//---------- GENIE TEXT BOX -------------------
var GenieTextBox = function() {
   var Text;
   var CursorPosition;		//indicates character before it is placed (on adjacent pixel)
};
GenieTextBox.prototype = new GenieControl();
GenieTextBox.prototype.Set = function(canvas, specs, img) {
   GenieCanvasControl.prototype.Set.call(this, canvas, specs, img);

   this.Text = this.Specs.TEXT;
//   this.CursorPosition = have to calculate length of string, then place cursor at end
};
