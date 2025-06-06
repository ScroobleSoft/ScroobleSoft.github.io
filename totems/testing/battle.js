
TollTesting.prototype.SetRandomBattle = function() {

   this.BattleField = new TollBattlefield();
   this.BattleField.Set(this.Screen, this.GraphicsTool);
   this.SetStacks();
   this.SetStackPositions();
};
TollTesting.prototype.SetStacks = function() {
   var aSides;
   var aSprites;
   var unit;
   var specs;

   //Create 2 sides
   this.LeftStack = new AgentArray();
   this.LeftStack.Set(16, TollUnit, INDEXED);
   for (indx=0;indx<16;++indx)
      this.LeftStack[indx].SetLinks(this.GraphicsTool, this.CalcPad);
   this.RightStack = new AgentArray();
   this.RightStack.Set(16, TollUnit, INDEXED);

   //Randomly select sides and set units
   aSides = new Array(2);
   this.Randomizer.GetUnique(aSides, 2, CLAN.COUNT, STARtAtZERO);
   aSprites = [ GunnerSprite, BazookerSprite, JeepSprite, LightTankSprite, MediumTankSprite, HeavyTankSprite, AVSprite ];
   for (indx=0;indx<16;++indx) {
	 unit = this.Randomizer.GetIndex(aSprites.length);
	 switch (unit) {
	    case 0:  //gunner
	       specs = GUNNER;
	       break;
	    case 1:  //bazooker
	       specs = BAZOOKER;
	       break;
	    case 2:  //jeep
	       specs = JEEP;
	       break;
	    default:
	       specs = { SPEED: 1.0, SELECTION: { SHAPE: SHAPE.RECTANGLE }, ANIMATION: { SEQUENCE: [0,1] } };
	 }
	 this.LeftStack[indx].Set(specs, aSprites[unit], null);
	 this.LeftStack[indx].SetClan(Clans[aSides[0]]);
	 unit = this.Randomizer.GetIndex(aSprites.length);
	 this.RightStack[indx].Set(specs, aSprites[unit], DIRECTION.W);
	 this.RightStack[indx].SetClan(Clans[aSides[1]]);
   }
};
TollTesting.prototype.SetStackPositions = function() {

   //Set positions
   for (indx=0;indx<16;++indx) {
	 offst = Math.round((40-this.LeftStack[indx].Sprite.Width)/2);
	 if (indx % 2)
	    offst += 20
	 this.LeftStack[indx].SetPosition( { X: 8+offst, Y: 322+(16*(indx+1)) } );
	 offst = Math.round((40-this.RightStack[indx].Sprite.Width)/2);
	 if (indx % 2)
	    offst += 20
	 this.RightStack[indx].SetPosition( { X: 530+offst, Y: 322+(16*(indx+1)) } );
      }

   this.RightStack.forEach(function(agnt){agnt.Visible=true;agnt.Extant=true;});
   this.LeftStack.forEach(function(agnt){agnt.Visible=true;agnt.Extant=true;});
};
TollTesting.prototype.PlayRandomBattle = function() {

      //UNLOGGED

      this.AnimationFrameHandle = requestAnimationFrame(this.PlayRandomBattle.bind(this));

      this.t1 = performance.now();
      this.BattleField.Draw();
      this.t2 = performance.now();

      for (indx=0;indx<16;++indx) {
	 this.LeftStack.forEach(function(unit){unit.Draw();});
	 this.RightStack.forEach(function(unit){unit.Draw();});
      }
//      if (this.LeftStack.SelectedAgent)
//	 this.LeftStack.SelectedAgent.DrawSelectionIndicator();
      if (Mouse.CheckLeftClicked())
	 this.LeftStack.UpdateSelection();

      if (Game.Reset)
	 cancelAnimationFrame(this.AnimationFrameHandle);
   };
