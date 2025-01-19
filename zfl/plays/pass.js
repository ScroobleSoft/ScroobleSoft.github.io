
//---------------------------------------------
//---------- ZFL PASS PLAY --------------------
var ZFLPassPlay = function() {
   var Routes;
};
ZFLPassPlay.prototype = new ZFLPlay();
ZFLPassPlay.prototype.Set = function(rGenerator) {
   ZFLPlay.prototype.Set.call(this, rGenerator);

   this.Routes = ArrayUtils.Create2D(5, 10);	//NOTE: 8 is the maximum number of segments in a route
};
ZFLPassPlay.prototype.Generate = function(receivers) {	//TODO: this may be REDUNDANT with all plays being set . . . receivers is a boolean string
   var i, j;
   var nSgmnts;

   //UNLOGGED

   for (i=0;i<PLAY.RECEIVERS.MAX;++i)
      if (BitUtils.CheckBit(receivers, i)) {
	 nSgmnts = this.Randomizer.GetInRange(1,4);
	 for (j=0;j<nSgmnts;++j)
	    this.Routes[i][j] = this.Randomizer.GetIndex(3);
	 this.Routes[i][j] = -1;
      }
};
