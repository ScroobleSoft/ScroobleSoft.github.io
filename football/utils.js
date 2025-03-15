
//--------------------------------------------------
//---------- FOOTBALL UTILITIES --------------------
var FootballUtilities = function() {
   var ScreenRect;
};
FootballUtilities.prototype = {
   Set(sRect) {
      this.ScreenRect = sRect;
   },
   CartesianToSideView(pnt) {

      pnt.X -= PITCH.SIDeVIEW.W / 2;
      pnt.X -= (PITCH.SIDeVIEW.TOUChLINE.FAR.L.X-PITCH.SIDeVIEW.TOUChLINE.NEAR.L.X) * ((PITCH.SIDeVIEW.B-ont.Y)/PITCH.SIDeVIEW.B) * (pnt.X/(PITCH.SIDeVIEW.W/2));
      pnt.X += PITCH.SIDeVIEW.W / 2;
      pnt.Y = PITCH.SIDeVIEW.TOUChLINE.FAR.L.Y + (pnt.Y/(PITCH.SIDeVIEW.B/PITCH.SIDeVIEW.H));

      pnt.X -= this.ScreenRect.L;
   },
   SideViewToCartesian(pnt) {

      pnt.Y -= PITCH.SIDeVIEW.TOUChLINE.FAR.L.Y;
      pnt.Y *= PITCH.SIDeVIEW.B / PITCH.SIDeVIEW.H;

      pnt.X += this.ScreenRect.L;
      pnt.X -= PITCH.SIDeVIEW.W / 2;
      pnt.X += (PITCH.SIDeVIEW.TOUChLINE.FAR.L.X-PITCH.SIDeVIEW.TOUChLINE.NEAR.L.X) * ((PITCH.SIDeVIEW.B-pnt.Y)/PITCH.SIDeVIEW.B) * (pnt.X/(PITCH.SIDeVIEW.W/2));
      pnt.X += PITCH.SIDeVIEW.W / 2;
/*
   this.ScreenCoords.X = this.Position.X - (PITCH.SIDeVIEW.W/2);
   this.ScreenCoords.X -= (PITCH.SIDeVIEW.TOUChLINE.FAR.L.X-PITCH.SIDeVIEW.TOUChLINE.NEAR.L.X) * ((PITCH.SIDeVIEW.B-this.Position.Y)/PITCH.SIDeVIEW.B) *
			  (this.ScreenCoords.X/(PITCH.SIDeVIEW.W/2));
   this.ScreenCoords.X += PITCH.SIDeVIEW.W/2;

   this.ScreenCoords.Y = PITCH.SIDeVIEW.T + (this.Position.Y/(PITCH.SIDeVIEW.B/PITCH.SIDeVIEW.H));
*/
   }
};
