
//-----------------------------------------------------
//---------- DOMINION AUCTION VIEW --------------------
var DominionAuctionView = function() {
	var Turn;
};
DominionAuctionView.prototype = new GenieView();
DominionAuctionView.prototype.Set = function(cnvs, specs) {
   GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionAuctionView.prototype.Start = function() {

	//UNLOGGED

	//-initially, a list of available items is presented, the player 'marking' (checking?) which ones they would be interested in bidding for
	//-of course, there is no need to spend entire reserves
      //state amount sought
      //receive bids from interested powers
      //if multiple bids, increase amount
      //repeat until only one bid left
};
