/*
 *  probably don't need mapping for isometric, but do for side-view and bird's eye
 */
//-------------------------------------------------------
//---------- PITCH COORDINATE MAPPER --------------------
var PitchCoordinateMapper = function() {
   var ScreenRect;
   var Perspective;
   var Scale;		//for side-view

   var x;
};
PitchCoordinateMapper.prototype = {
   Set(sRect) {
      this.ScreenRect = sRect;
   },
   SetPerspective(prspctv) {
      this.Perspective = prspctv;
      if (this.Perspective==PERSPECTIVE.SIDeVIEW) {
	 this.Scale.X = PITCH.FArTOUCHLINE.L/PITCH.W;
	 this.Scale.Y = PITCH.FArTOUCHLINE.B/PITCH.B;
      }

      //TODO: perform any necessary calculations here for perspectives other than side-view and bird's eye
   },
   Map(pos, sCoords) {  //s-screen

      //UNLOGGED

      switch (this.Perspective) {
	 case PERSPECTIVE.SIDeVIEW:  //ASSUMPTION: there will be no vertical scrolling
	    this.x = pos.X - (PITCH.L/2);
	    this.x *= this.Scale.X;
	    this.x += ((PITCH.L-PITCH.FArTOUCHLINE.L)/2)*(pos.Y/PITCH.B)*(pos.X/(PITCH.L/2));
	    this.ScreenCoords.X = this.x + (PITCH.L/2);
	    this.ScreenCoords.Y = (pos.Y*this.Scale.Y) + PITCH.H;
	 case PERSPECTIVE.TOpDOWN:	//same as bird's eye
	    this.ScreenCoords.X = pos.X - this.ScreenRect.L;
	    this.ScreenCoords.Y = pos.Y - this.ScreenRect.T;
	    break;
      }
   },
   CheckOnScreen(coords, wSprite) {  //w-width

      //UNLOGGED

      if (coords.X>(this.ScreenRect.L+this.ScreenRect.W))	//taking this step since sprites are bottom-left aligned
	 return (false);
      return (GeoUtils.CheckPointInBox(coords, this.ScreenRect, wSprite));
   },
   ReverseMap(pos) {
   }
};
