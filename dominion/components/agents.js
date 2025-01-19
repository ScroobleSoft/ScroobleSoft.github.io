
DominionComponents.prototype.CreateJets = function() {

   //UNLOGGED

   LeftBombers = new AgentArray();
   LeftFighters = new AgentArray();

   LeftJets = [ LeftBombers, LeftFighters ];

   RightBombers = new AgentArray();
   RightFighters = new AgentArray();

   RightJets = [ RightBombers, RightFighters ];
};
DominionComponents.prototype.SetJets = function() {

   //UNLOGGED

   //Bombers
   LeftBombers.Set(16, DominionFighter, null, BOMBER, LeftBomberSprite, DIRECTION.E);
   LeftBombers.SetLinks(this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad);
   RightBombers.Set(16, DominionFighter, null, BOMBER, RightBomberSprite, DIRECTION.W);
   RightBombers.SetLinks(this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad);

   //Fighters
   LeftFighters.Set(64, DominionFighter, null, FIGHTER, LeftFighterSprite, DIRECTION.E);										//TODO: HARD-CODED!
   LeftFighters.SetLinks(this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad);
   LeftFighters.SetExtraLinks(LaserList, ShellList, FirebrandList, SilklightList, FlareList, ChaffList);
   RightFighters.Set(64, DominionFighter, null, FIGHTER, RightFighterSprite, DIRECTION.W);									//TODO: HARD-CODED!
   RightFighters.SetLinks(this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad);
   RightFighters.SetExtraLinks(LaserList, ShellList, FirebrandList, SilklightList, FlareList, ChaffList);
};
