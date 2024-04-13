
//------------------------------------------------
//---------- COMPOSITE SPRITE --------------------
var CompositeSprite = function() {
};
CompositeSprite.prototype = new GeometricSprite();
CompositeSprite.prototype.Set = function(cntxt, pic, specs, cPad) {
   GeometricSprite.prototype.Set.call(this, cntxt, specs, cPad);
   GenieSprite.prototype.Set.call(this, cntxt, pic, specs);

};
CompositeSprite.prototype.Draw = function(x, y) {
   GeometricSprite.prototype.Draw.call(this, x, y);
   GenieSprite.prototype.Draw.call(this, x, y);

};
CompositeSprite.prototype.DrawCentred = function(x, y) {

	x = Math.round(x-(this.Specs.W/2));
	y = Math.round(y+(this.Specs.H/2));

   GeometricSprite.prototype.Draw.call(this, x, y);
   GenieSprite.prototype.Draw.call(this, x, y);
};
CompositeSprite.prototype.DrawResized = function(x, y, scale) {
   GeometricSprite.prototype.DrawResized.call(this, x, y, scale);
   GenieSprite.prototype.DrawResized.call(this, x, y, scale);

};
