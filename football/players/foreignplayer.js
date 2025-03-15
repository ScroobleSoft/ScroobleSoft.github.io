
//----------------------------------------------
//---------- FOREIGN PLAYER --------------------	DE-LOG
var ForeignPlayer = function() {
   var Adaptability;
};
ForeignPlayer.prototype = new SeniorPlayer();
ForeignPlayer.prototype.Set = function(rGenerator, indx) {
   SeniorPlayer.prototype.Set.call(this, rGenerator, indx);

};
ForeignPlayer.prototype.Generate = function() {
//   SeniorPlayer.prototype.Generate.call(this);

   //TODO: this is where league/adaptability rating will be determined
};
