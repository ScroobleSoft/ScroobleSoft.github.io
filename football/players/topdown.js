
//---------------------------------------------------
//---------- TOP DOWN FOOTBALLER --------------------
var TopDownFootballer = function() {
   var Team;
};
TopDownFootballer.prototype = new MatchPlayer();
TopDownFootballer.prototype.Set = function(specs, sprite) {
   MatchPlayer.prototype.Set.call(this, specs, sprite);

};
