
//--------------------------------------------------------
//---------- FOOTBALL KICK OFF BUTTON --------------------
var FootballKickOffButton = function() {
   var PlayerTeam, OpponentTeam;
};
FootballKickOffButton.prototype = new ImageButton();
FootballKickOffButton.prototype.Set = function(cnvs, specs, img) {	//TODO: REDUNDANT
   ImageButton.prototype.Set.call(this, cnvs, specs, img);

};
FootballKickOffButton.prototype.SetTeams = function(pTeam, oTeam) {

   this.PlayerTeam = pTeam;
   this.OpponentTeam = oTeam;
};
FootballKickOffButton.prototype.DrawImage = function() {
   var cntxt;
   var colour1, colour2, colour3;
   var complexion;

   ImageButton.prototype.DrawImage.call(this);		//background

   //Set proper context for sprites
   cntxt = LeftFootballerSprite.Context;
   LeftFootballerSprite.Context = this.Context;
   FootballSprite.Context = this.Context;

   //Kick-off players and ball
   colour1 = TeamColours[this.PlayerTeam][0];
   colour2 = TeamColours[this.PlayerTeam][1];
   colour3 = TeamColours[this.PlayerTeam][2];
   complexion = "brown";
   LeftFootballerSprite.IndexedReColourState( [ [ colour1, [1] ], [ colour2, [3] ], [ colour3, [5] ], [ complexion, [0,2,4] ] ] );
   LeftFootballerSprite.Draw(this.Specs.L+40, this.Specs.T+43);
   FootballSprite.Draw(this.Specs.L+50, this.Specs.T+48);
   LeftFootballerSprite.DrawFlipped(this.Specs.L+51, this.Specs.T+56);

   //Opponent player
   colour1 = TeamColours[this.OpponentTeam][0];
   colour2 = TeamColours[this.OpponentTeam][1];
   colour3 = TeamColours[this.OpponentTeam][2];
   LeftFootballerSprite.IndexedReColourState( [ [ colour1, [1] ], [ colour2, [3] ], [ colour3, [5] ], [ complexion, [0,2,4] ] ] );
   LeftFootballerSprite.Draw(this.Specs.L+36, this.Specs.T+99);

   //Reset context for sprites
   LeftFootballerSprite.Context = cntxt;
   FootballSprite.Context = cntxt;
};
