/*
 *  based on current sprites, these factors can be differentiated: mobility/instincts/release/accuracy/arm strength
 *  later, can factor in speed/touch/patience(# of progressions)/toughness(delivering while taking a hit, maintaining performance
 *   under a battering through game)/studiousness(# of plays learned)
 *  also, an adaptability attribute which measures how quickly and how many different systems are picked up
 */

var QB = { FRAMES: { DROP: { STEP3: 60, STEP5: 100, STEP7: 140 } } };

//------------------------------------------------------
//---------- SIDE VIEW QUARTER BACK --------------------
var SideViewQuarterback = function() {
/*
   var Countdown;	//number of frames, to be used for dropbacks, throwing motion, footwork
*/
};
SideViewQuarterback.prototype = new SideViewGridder();  //ISSUE: will later be derived from NFLOffenseGameGridder
SideViewQuarterback.prototype.Set = function(specs, sprite, unit) {
   SideViewGridder.prototype.Set.call(this, specs, sprite, unit);

   //Play state: PReSNAP: 0, SHOTGUN, DROpBACK, POCKET, THROW, RELEASED, SCRAMBLING
   //Footwork state: PLANTED: 0, NEArRISING: 1, NEArFALLING: 2, FArRISING: 3, FArFALLING: 4
   //Near arm state: BySIDE: 0, FORWARD: 1, BACKWARD: 2, PUSH: 3, TACKLE: 4
   //this.Frames = 0;
};

//-------------------------------------
//----------GAME QB--------------------  REDUNDANT
var GameQB = function() {
/***
   var Accuracy;
   var ArmStrength;
   var Mobility;
   var Instincts;
***/
   var Throwing;
   var ArmSprite;
   var HelmetSprite;
};
GameQB.prototype = new GameGridder();
GameQB.prototype.Set = function(spd, pos, dstn, drctn, trn, sprite, unit) {
   GameGridder.prototype.Set.call(this, spd, pos, dstn, drctn, trn, sprite, unit);

   this.Throwing = 0;
};
GameQB.prototype.Move = function() {
   GameGridder.prototype.Move.call(this);

   this.ArmSprite.Draw(this.Position.X+6, this.Position.Y+51-this.Sprite.Height);
   this.HelmetSprite.Draw(this.Position.X+9, this.Position.Y+5-this.Sprite.Height);
};
GameQB.prototype.Throw = function() {
   this.Throwing = 32;  //value depends on arm strength - actually not, since will always be 180degrees
};
GameQB.prototype.UpdateThrowing = function() {
   this.Draw();
   this.HelmetSprite.Draw(this.Position.X+9, this.Position.Y+5-this.Sprite.Height);
//   if (this.Throwing) {
      //Draw arm at appropriate angle
      --this.Throwing;	//will be decremented, although likely by some other value depending on arm strength
      this.ArmSprite.DrawRotated(this.Position.X+6, this.Position.Y+51-this.Sprite.Height, ((32-this.Throwing)/32)*180);
//   }
//   return (this.Throwing!=0);
};
