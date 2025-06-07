
SolarTesting.prototype.SetMissionGenerate = function() {
   this.Difficulty = this.Randomizer.GetInRange(9, 18);
   this.Events = [ "Shuttle", "Asteroids", "Pirate", "Fugitive", "Cargo", "Spy", "Courier", "Criminal",
		  "Trader", "Smuggler", "Trafficker", "Liner", "Mercenary", "Merchant", "Marshalls", "Tourists" ];
   this.DrawEventCards();
   this.CardIndex = -1;
   this.Cards = new Array(this.Difficulty);
};
SolarTesting.prototype.DrawEventCards = function() {
   this.Screen.fillStyle = "black";
   this.Screen.fillRect(0, 300, SCREEN.WIDTH, 300);
   for (indx=0;indx<8;++indx) {
      this.GraphicsTool.DrawRoundedRectangle(10+(70*indx), 360, 60, 90, 5, "blue", "white", 1);
      this.TextWriter.Write(this.Events[indx], 20+(70*indx), 410);
      this.GraphicsTool.DrawRoundedRectangle(10+(70*indx), 470, 60, 90, 5, "blue", "white", 1);
      this.TextWriter.Write(this.Events[indx+8], 20+(70*indx), 520);
   }
};
SolarTesting.prototype.PlayMissionGenerate = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayMissionGenerate.bind(this));

   this.Screen.fillStyle = "black";
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, 300);

   this.DisplayMissionPlan();

   if (Mouse.CheckLeftClicked()) {
      ++this.CardIndex;
      if (this.CardIndex<this.Difficulty)
	 this.Cards[this.CardIndex] = this.Randomizer.GetInRange(0, 15);
   }

   if (this.CardIndex==this.Difficulty)
      cancelAnimationFrame(this.AnimationFrameHandle);
};
SolarTesting.prototype.DisplayMissionPlan = function() {
   for (indx=0;indx<this.Difficulty;++indx) {
      coords.X = 30 + (90*(indx % 6));
      coords.Y = 30 + (90*Math.floor(indx/6));
      if (indx<=this.CardIndex)
	 this.GraphicsTool.DrawRoundedRectangle(coords.X, coords.Y, 90, 60, 5, "white", "white", 1);
      else
	 this.GraphicsTool.DrawRoundedRectangle(coords.X, coords.Y, 90, 60, 5, "white", null, 1);
      if (this.Cards[this.CardIndex]!=-1)
	 this.TextWriter.Write(this.Events[this.Cards[indx]], coords.X+10, coords.Y+30);
   }
};
