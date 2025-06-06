/*
 *  LOGGED -	a bit excited about splitting hero into general and special agent roles
 *		watching let's plays of Warlords, it's interesting how a victorious but depleted general stack has to seek out reinforcements
 *		suppose then that rather than a variety of strengths and weaknesses amongst units, there might be a progression in their capabilities
 *		different generals with different leadership attributes to match fear/morale/courage etc?
 *		remember, heroes (generals) show up after random intervals, with equally random accompaniment of units
 *		so, generaled and general-less stacks will be distinct
 */
//-----------------------------------------------
//---------- TOLL COMMANDANT --------------------
var TollCommandant = function() {
   var Clan;
};
TollCommandant.prototype = {
   Set(cln) {
      this.Clan = cln;
   }
};
