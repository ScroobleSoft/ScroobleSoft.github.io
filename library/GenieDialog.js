/*
 *  TODO: can add a title bar and text (UNLOGGED)
 */ 
//------------------------------------------------
//---------- GENIE DIALOG BOX --------------------
var GenieDialogBox = function() {
   var Specs;
   var Context;
   var GraphicsTool, TextWriter;
   var Size;				//rect - actually, this could be set in specs (TODO)
   var Views, CallingView;		//.CallingView is an index
};
GenieDialogBox.prototype = {
   Set(specs, cntxt, gTool, tWriter) {		//at the moment, specs has title, background colour, size, rounded rectangle attributes (maybe)

      this.Context = cntxt;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
      this.Specs = specs;
      this.Size = new GenieRect();
      //-create Ok button
      //-may have options for Yes, No and/or Cancel buttons and such
   },
   SetViews(aViews) {  //NOTE: dialog can be launched by different views

      //UNLOGGED

      this.Views = aViews;
   },
   Open(iView) {  //NOTE: dialog needs to know which view to resurrect on closing

      //UNLOGGED

      this.CallingView = iView;
   },
   Draw() {

      //UNLOGGED

      //-first draw background using .Context, all to fit within border (rounded rectangle)
      //-draw border as thick rounded rectangle
      //-in derived class, draw relevant images and controls
   },
   Close() {

      //UNLOGGED

      //-hide all controls, mostly buttons

      this.Views[this.CallingView].Open();
   }
};
