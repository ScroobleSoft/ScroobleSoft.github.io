
//------------------------------------------------
//---------- DOMINION CARRIER --------------------
var DominionCarrier = function() {
};
DominionCarrier.prototype = new DominionShip();
DominionCarrier.prototype.ReColour = function() {

   //UNLOGGED - base method needs to be over-ridden only for Carriers

};
DominionGunBoat.prototype.Set = function(specs, sprite, type) {
   DominionShip.prototype.Set.call(this, specs, sprite, type);

   this.Type = type ? type : SHIP.SMALlCARRIER;
};
DominionCarrier.prototype.Draw = function() {
   DominionShip.prototype.Draw.call(this);

   //UNLOGGED

};
DominionCarrier.prototype.DrawBows = function() {

   if (this.Type!=SHIP.SMALlCARRIER) {

      //NW
      this.x = this.ScreenCoords.X + CARRIErBOwOFFSETs[this.Type-SHIP.CARRIER][0].X;
      this.y = this.ScreenCoords.Y + CARRIErBOwOFFSETs[this.Type-SHIP.CARRIER][0].Y;
      ShipBowSprite.Draw(this.x, this.y, 2*this.BowIndex);

      //NE
      this.x = this.ScreenCoords.X + CARRIErBOwOFFSETs[this.Type-SHIP.CARRIER][1].X;
      this.y = this.ScreenCoords.Y + CARRIErBOwOFFSETs[this.Type-SHIP.CARRIER][1].Y;
      ShipBowSprite.Draw(this.x, this.y, (2*this.BowIndex)+1);

      //SE
      this.x = this.ScreenCoords.X + CARRIErBOwOFFSETs[this.Type-SHIP.CARRIER][2].X;
      this.y = this.ScreenCoords.Y + CARRIErBOwOFFSETs[this.Type-SHIP.CARRIER][2].Y;
      ShipBowSprite.Draw(this.x, this.y, (2*this.BowIndex)+1);

      //SW
      this.x = this.ScreenCoords.X + CARRIErBOwOFFSETs[this.Type-SHIP.CARRIER][3].X;
      this.y = this.ScreenCoords.Y + CARRIErBOwOFFSETs[this.Type-SHIP.CARRIER][3].Y;
      ShipBowSprite.Draw(this.x, this.y, 2*this.BowIndex);

      return;
   }

   DominionShip.prototype.DrawBows.call(this);
};
