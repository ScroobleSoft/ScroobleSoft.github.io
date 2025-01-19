
//--------------------------------------------
//---------- ZFL RUN PLAY --------------------
var ZFLRunPlay = function() {
   var Routes;
};
ZFLRunPlay.prototype = new ZFLPlay();
ZFLRunPlay.prototype.Set = function(rGenerator) {
   ZFLPlay.prototype.Set.call(this, rGenerator);

   //-blocking match-ups will have to be set depending on formations, maybe by calling ::SetFormations
};
