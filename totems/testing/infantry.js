
TollTesting.prototype.SetGunnerBattle = function() {
   var aSides;

   //Randomly select sides and set units
   aSides = new Array(2);
   this.Randomizer.GetUnique(aSides, 2, STARtAtZERO, CLAN.COUNT-1);
   for (indx=0;indx<STACK.MAX;++indx) {
/*
	 Battle.LeftClan[indx] = LeftGunners[indx];
	 Battle.LeftClan[indx].Unit = { Clan: Clans[aSides[0]] };
	 Battle.RightClan[indx] = RightGunners[indx];
	 Battle.RightClan[indx].Unit = { Clan: Clans[aSides[1]] };
*/
      Battle.LeftStack.push(LeftGunners[indx]);
      Battle.LeftStack[indx].Clan = Clans[aSides[0]];
      Battle.RightStack.push(RightGunners[indx]);
      Battle.RightStack[indx].Clan = Clans[aSides[1]];
   }
//   Battle.SetPositions();
   Battle.SetStacks();
};
TollTesting.prototype.PlayGunnerBattle = function() {

   //UNLOGGED

//   this.AnimationFrameHandle = requestAnimationFrame(this.PlayGunnerBelt.bind(this));

   Battle.Play();
};
