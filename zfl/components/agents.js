
GridironComponents.prototype.CreateHomeGridders = function() {

   //UNLOGGED

   //Side view
   HomeSideViewQB = new SideViewQuarterback();
//   HomeSideViewRBs = new AgentArray();
   HomeSideViewWRs = new AgentArray();
//   HomeSideViewTEs = new AgentArray();
   HomeSideViewOLs = new AgentArray();
   HomeSideViewDEs = new AgentArray();
   HomeSideViewDTs = new AgentArray();
/*
   HomeSideViewLBs = new AgentArray();
   HomeSideViewSs = new AgentArray();
*/
   HomeSideViewCBs = new AgentArray();

   //Top down

};
GridironComponents.prototype.SetHomeGridders = function() {

   //UNLOGGED

   //Side view
//   HomeSideViewQB.Set(QB, GridderSprite);
//   HomeSideViewQB.SetLinks(this.Randomizer, this.ScreenRect);
//   HomeSideViewRBs = new AgentArray();
//   HomeSideViewRBs.SetLinks(this.Randomizer, this.ScreenRect);
   HomeSideViewWRs.Set(5, SideViewWideReceiver, null, WR, LeftGridderSprite);
   HomeSideViewWRs.SetLinks(this.Randomizer, this.ScreenRect);
//   HomeSideViewTEs = new AgentArray();
//   HomeSideViewTEs.SetLinks(this.Randomizer, this.ScreenRect);
   HomeSideViewOLs.Set(5, SideViewOffensiveLineman, null, OL, LeftOLSprite);
   HomeSideViewOLs.SetLinks(this.Randomizer, this.ScreenRect);
   HomeSideViewDEs.Set(3, SideViewDefensiveLineman, null, DL, RightOLSprite);
   HomeSideViewDEs.SetLinks(this.Randomizer, this.ScreenRect);
   HomeSideViewDTs.Set(3, SideViewDefensiveLineman, null, DL, RightOLSprite);
   HomeSideViewDTs.SetLinks(this.Randomizer, this.ScreenRect);
/*
   HomeSideViewLBs = new AgentArray();
   HomeSideViewLBs.SetLinks(this.Randomizer, this.ScreenRect);
   HomeSideViewSs = new AgentArray();
   HomeSideViewSs.SetLinks(this.Randomizer, this.ScreenRect);
*/
   HomeSideViewCBs.Set(3, SideViewCornerback, null, CB, LeftGridderSprite);
   HomeSideViewCBs.SetLinks(this.Randomizer, this.ScreenRect);

   //Top down

};
GridironComponents.prototype.CreateVisitorGridders = function() {

   //UNLOGGED

   //Side view
   VisitorSideViewQB = new SideViewQuarterback();
//   VisitorSideViewRBs = new AgentArray();
   VisitorSideViewWRs = new AgentArray();
//   VisitorSideViewTEs = new AgentArray();
   VisitorSideViewOLs = new AgentArray();
   VisitorSideViewDEs = new AgentArray();
   VisitorSideViewDTs = new AgentArray();
/*
   VisitorSideViewLBs = new AgentArray();
   VisitorSideViewSs = new AgentArray();
*/
   VisitorSideViewCBs = new AgentArray();

   //Top down

};
GridironComponents.prototype.SetVisitorGridders = function() {

   //UNLOGGED

   //Side view
//   VisitorSideViewQB.Set(QB, GridderSprite);
//   VisitorSideViewQBs.SetLinks(this.Randomizer, this.ScreenRect);
//   VisitorSideViewRBs = new AgentArray();
//   VisitorSideViewRBs.SetLinks(this.Randomizer, this.ScreenRect);
   VisitorSideViewWRs.Set(5, SideViewWideReceiver, null, WR, RightGridderSprite);
   VisitorSideViewWRs.SetLinks(this.Randomizer, this.ScreenRect);
//   VisitorSideViewTEs = new AgentArray();
//   VisitorSideViewTEs.SetLinks(this.Randomizer, this.ScreenRect);
   VisitorSideViewOLs.Set(5, SideViewOffensiveLineman, null, OL, RightOLSprite);
   VisitorSideViewOLs.SetLinks(this.Randomizer, this.ScreenRect);
   VisitorSideViewDEs.Set(3, SideViewDefensiveLineman, null, DL, RightOLSprite);
   VisitorSideViewDEs.SetLinks(this.Randomizer, this.ScreenRect);
   VisitorSideViewDTs.Set(3, SideViewDefensiveLineman, null, DL, RightOLSprite);
   VisitorSideViewDTs.SetLinks(this.Randomizer, this.ScreenRect);
/*
   VisitorSideViewLBs = new AgentArray();
   VisitorSideViewLBs.SetLinks(this.Randomizer, this.ScreenRect);
   VisitorSideViewSs = new AgentArray();
   VisitorSideViewSs.SetLinks(this.Randomizer, this.ScreenRect);
*/
   VisitorSideViewCBs.Set(3, SideViewCornerback, null, CB, RightGridderSprite);
   VisitorSideViewCBs.SetLinks(this.Randomizer, this.ScreenRect);

   //Top down

};
