
FootballComponents.prototype.SetSideViewPlayers = function() {
   var keeper;

   HomeSideViewPlayers.Set(PLAYERS.OUTFIELD, SideViewPlayer, null, SIDeVIEwFOOTBALLER, LeftFootballerSprite);
   HomeSideViewPlayers.SetLinks(this.TextWriter, this.ScreenRect);
   keeper = new MatchKeeper();
   keeper.Set(SIDeOnKEEPER, LeftKeeperSprite);
   keeper.SetLinks(this.TextWriter, this.ScreenRect);
   HomeSideViewPlayers.unshift(keeper);
   AwaySideViewPlayers.Set(PLAYERS.OUTFIELD, SideViewPlayer, null, SIDeVIEwFOOTBALLER, RightFootballerSprite);
   AwaySideViewPlayers.SetLinks(this.TextWriter, this.ScreenRect);
   keeper = new MatchKeeper();
   keeper.Set(SIDeOnKEEPER, RightKeeperSprite);
   keeper.SetLinks(this.TextWriter, this.ScreenRect);
   AwaySideViewPlayers.unshift(keeper);
};
