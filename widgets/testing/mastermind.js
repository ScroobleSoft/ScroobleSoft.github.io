
GalleryTesting.prototype.SetMastermind = function() {
   this.GenerateCombination();
   this.DigitsImage = new GenieImage();
   this.DigitsImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 1072, T: 210, W: 62, H: 10, R: 1, C: 9, O: 1, PATCH: { W: 6, H: 10 } } );
   this.CreateButtons();
   this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   this.DrawHackingScreen();
};
GalleryTesting.prototype.GenerateCombination = function() {
   this.Combination = new Array(4);
   for (indx=0;indx<4;++indx)
      this.Combination[indx] = this.Randomizer.GetNumberWithinRange(1, 9);

   this.Attempt = new Array(4);
   for (indx=0;indx<4;++indx)
      this.Attempt[indx] = this.Randomizer.GetNumberWithinRange(1, 9);

   this.Matches = new Array(4);
   this.Order = new Array(4);
};
GalleryTesting.prototype.CreateButtons = function() {
   var x;

   this.UpButtons = new Array(4);
   this.DownButtons = new Array(4);
   this.UpPressedButtons = new Array(4);
   this.DownPressedButtons = new Array(4);
   for (indx=0;indx<4;++indx) {
      this.UpButtons[indx] = new GenieImage();
      x = 297 + (20*indx);
      this.UpButtons[indx].Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 1072, T: 221, W: 18, H: 18, X: x, Y: 179 } );
      this.DownButtons[indx] = new GenieImage();
      this.DownButtons[indx].Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 1072, T: 240, W: 18, H: 18, X: x, Y: 244 } );
      this.UpPressedButtons[indx] = new GenieImage();
      this.UpPressedButtons[indx].Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 1091, T: 221, W: 18, H: 18, X: x, Y: 179 } );
      this.DownPressedButtons[indx] = new GenieImage();
      this.DownPressedButtons[indx].Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 1091, T: 240, W: 18, H: 18, X: x, Y: 244 } );
   }
};
GalleryTesting.prototype.DrawHackingScreen = function() {

   this.Screen.fillStyle = GREY.LIGHT;
   this.Screen.fillRect(200, 0, 400, 400);

   //Buttons
   this.UpButtons.forEach(function(btn){btn.Draw();});
   this.DownButtons.forEach(function(btn){btn.Draw();});

   this.DisplayDigits();
};
GalleryTesting.prototype.PlayMastermind = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayMastermind.bind(this));

//   this.DisplayDigits();

   this.ProcessClick();
};
GalleryTesting.prototype.DisplayDigits = function() {

   //Attempt
   for (indx=0;indx<4;++indx)
      this.Screen.clearRect(300+(21*indx), 200, 10, 42);
   for (coords.X=301;coords.X<380;coords.X+=20)
      for (coords.Y=200;coords.Y<242;coords.Y+=14)
	 this.GraphicsTool.DrawRectangle(coords.X, coords.Y, 10, 14, "black", 1);
   for (indx=0;indx<4;++indx)
      this.DrawDigit(this.Attempt[indx], 303+(20*indx), 216);

   //Combination
   for (indx=0;indx<4;++indx) {
      this.GraphicsTool.DrawRectangle(400+(10*indx), 214, 10, 14, "black", 1);
//      this.DigitsImage.DrawPatchNumber(this.Combination[indx]-1, 402+(10*indx), 216);
   }
};
GalleryTesting.prototype.DrawDigit = function(nDigit, x, y) {
   this.DigitsImage.DrawPatchNumber(nDigit-1, x, y);

   //Draw top digit
   if (nDigit==1)
      this.DigitsImage.DrawPatchNumber(8, x, y-14);
   else
      this.DigitsImage.DrawPatchNumber(nDigit-2, x, y-14);

   //Draw bottom digit
   if (nDigit==9)
      this.DigitsImage.DrawPatchNumber(0, x, y+14);
   else
      this.DigitsImage.DrawPatchNumber(nDigit, x, y+14);
};
GalleryTesting.prototype.ProcessClick = function() {
   if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
      for (indx=0;indx<4;++indx) {
	 if (this.UpButtons[indx].CheckClicked()) {
	    this.UpPressedButtons[indx].Draw();
	    this.MoveDigitUp(indx);
	    break;
	 }
	 if (this.DownButtons[indx].CheckClicked()) {
	    this.DownPressedButtons[indx].Draw();
	    this.MoveDigitDown(indx);
	    break;
	 }
      }
   }
};
GalleryTesting.prototype.MoveDigitUp = function(iDigit) {
   ++this.Attempt[iDigit];
   if (this.Attempt[iDigit]==10)
      this.Attempt[iDigit] = 1;
   this.UpdateMatch();
};
GalleryTesting.prototype.MoveDigitDown = function(iDigit) {
   --this.Attempt[iDigit];
   if (this.Attempt[iDigit]==0)
      this.Attempt[iDigit] = 9;
   this.UpdateMatch();
};
GalleryTesting.prototype.UpdateMatch = function() {

   this.Screen.fillStyle = GREY.LIGHT;
   this.Screen.fillRect(295, 265, 85, 25);

   this.DisplayDigits();

   //Check if combination has been cracked
   for (indx=0;indx<4;++indx)
      if (this.Attempt[indx]!=this.Combination[indx])
	 break;
   if (indx==4) {
      cancelAnimationFrame(this.AnimationFrameHandle);
      for (indx=0;indx<4;++indx)
	 this.DigitsImage.DrawPatchNumber(this.Combination[indx]-1, 402+(10*indx), 216);
      return;
   }

   //Evaluate matches
   for (indx=0;indx<4;++indx)
      this.Matches[indx] = 0;
   for (indx=0;indx<4;++indx)
      if (this.Attempt[indx]==this.Combination[indx])
//	 this.GraphicsTool.DrawCircle(305+(20*indx), 275, 7, "green", 0);
	 this.Matches[indx] = 2;
      else {
	 for (indx2=0;indx2<4;++indx2) {
	    if (indx2==indx)
	       continue;
	    if (this.Attempt[indx]==this.Combination[indx2]) {
//	       this.GraphicsTool.DrawCircle(305+(20*indx), 275, 7, "yellow", 0);
	       this.Matches[indx] = 1;
	       break;
	    }
	 }
//	 if (indx2==4)
//	    this.GraphicsTool.DrawCircle(305+(20*indx), 275, 7, "red", 0);
      }

   //Display match codes
   this.Randomizer.GetUniqueNumbers(this.Order, 4, 4, STARtAtZERO);
   for (indx=0;indx<4;++indx) {
      switch (this.Matches[this.Order[indx]]) {
	 case 0:
	    colour = "red";
	    break;
	 case 1:
	    colour = "yellow";
	    break;
	 case 2:
	    colour = "green";
	    break;
      }
      this.GraphicsTool.DrawCircle(305+(20*indx), 275, 7, colour, 0);
   }

   //Delay for 0.5secs
   cancelAnimationFrame(this.AnimationFrameHandle);
   this.Frames = 15;
   this.DelayLoop();
};
GalleryTesting.prototype.DelayLoop = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.DelayLoop.bind(this));

   --this.Frames;
   if (!this.Frames) {
      cancelAnimationFrame(this.AnimationFrameHandle);
      this.UpButtons.forEach(function(btn){btn.Draw();});
      this.DownButtons.forEach(function(btn){btn.Draw();});
      this.PlayMastermind();
   }
};
