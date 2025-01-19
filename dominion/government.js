
//---------------------------------------------------
//---------- DOMINION GOVERNMENT --------------------
var DominionGovernment = function() {
	var Type;
   var Nation;
   var Popularity;
   var Rivals;		//TODO: only 1 to begin with? or maybe 8, equivalent to the various government types
};
DominionGovernment.prototype = {
   Set(nation) {		//TODO: passing 'nation' might become REDUNDANT
      this.Nation = nation;
      this.Popularity = 60;	//TODO: 50?
   }
};
