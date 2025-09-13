
//-------------------------------------------------
//---------- INDUSTRY MINISTRY --------------------
var IndustryMinistry = function() {
   var Goods;
};
IndustryMinistry.prototype = new DominionMinistry();
IndustryMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

	this.Id = MINISTRY.INDUSTRY;
   this.Goods = 0;
};
