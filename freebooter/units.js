
//--------------------------------------------
//------------ SOLAR SHIP --------------------
var SolarShip = function() {
   var HalfSprite;
   var TackCannon;
   var PinCannon;
   var PikeCannon;
};
SolarShip.prototype = new GenieAgent();
SolarShip.prototype.Set = function(specs, sprite, unit) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

//   this.State.Size = ELITeKRAItSHIP.STATE.WHOLE;
   this.State.Size = 0;
   this.Height = ELITeSHIP.MAxALTITUDE;

   this.TackCannon = new GenieCannon();  //TODO: will eventually be shifted to default GenieAgent behaviour via specs
   this.PinCannon = new GenieCannon();
   this.PikeCannonCharge = new GenieCannon();

//   this.TackCannon.Set(this, TACkCANNON);
//   this.PinCannon.Set(this, PInCANNON);
//   this.PikeCannonCharge.Set(this, PIKeCANNON);
};
SolarShip.prototype.SetLinks = function(iBox, sRect) {
//   this.HalfSprite = sList[0];

   this.InfoBox = iBox;
   this.ScreenRect = sRect;
};
SolarShip.prototype.Draw = function() {
   switch (this.State.Size) {
      case ELITeKRAItSHIP.STATE.WHOLE:
	 this.Sprite.DrawResized(this.Position.X, this.Position.Y, this.Height/5);
	 break;
      case ELITeKRAItSHIP.STATE.HALF:
	 this.HalfSprite.Draw(this.Position.X, this.Position.Y);
	 break;
   }
};
SolarShip.prototype.DisplayRadar = function() {
   //in Info Box
};
SolarShip.prototype.DisplayInfo = function() {
   //in console
};
