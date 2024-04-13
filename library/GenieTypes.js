
//---------------------------------------------
//---------- COORDINATE 2D --------------------
var Coordinate2D = function() {var X, Y;};
Coordinate2D.prototype.Set = function(x, y) { this.X = x; this.Y = y; };

//------------------------------------------
//---------- GENIE TILE --------------------
var GenieTile = function() {var C, R;};
GenieTile.prototype.Set = function(c, r) { this.C = c; this.R = r; };

//------------------------------------------
//---------- GENIE RECT --------------------
var GenieRect = function() { var L, T, W, H; };
GenieRect.prototype.Set = function(l, t, w, h) { this.L = l; this.T = t; this.W = w; this.H = h; };
GenieRect.prototype.SetRect = function(rct) { this.L = rct.L; this.T = rct.T; this.W = rct.W; this.H = rct.H; };
GenieRect.prototype.CheckPointInside = function(x, y) {
   if ( ( (x>=this.L) && (x<=(this.L+this.W) ) ) && ( (y>=this.T) && (y<=(this.T+this.H)) ) )
      return true;
   else
      return false;
};

//------------------------------------------
//---------- GENIE LINE --------------------
var GenieLine = function() { var StartCoords, EndCoords; };
GenieLine.prototype.Set = function(x1, y1, x2, y2)
  { this.StartCoords = new Coordinate2D(); this.EndCoords = new Coordinate2D(); this.StartCoords.Set(x1, y1); this.EndCoords.Set(x2, y2); };

//-----------------------------------------
//---------- GENIE KEY --------------------
var GenieKey = function() { var Code, State, Action; };
GenieKey.prototype.Set = function(code, action) { this.Code = code; this.State = KEySTATE.READY; this.Action = action || KEyPRESS.CONTINUOUS; };

//------------------------------------------
//---------- GENIE NAME --------------------
var GenieName = function() { var First, Last; };
GenieName.prototype.Set = function(first, last) { this.First = first; this.Last = last; };
GenieName.prototype.GetFullName = function() { if (this.Last) return (this.First + " " + this.Last); else return (this.First); };

var VISUAlOBJECT = { NEUTRAL: 0, COMRADE: 1, FOE: 2, BUILDING: 3, TERRAIN: 4 };  //TODO: also bases, but then need friend and foe ones
var VisualObject = function() {var Type, Pointer;};

var AttachedSprite = function() { var X, Y, Sprite, State; };
AttachedSprite.prototype.Flip = function(sx, sy) { this.X *= sx; this.Y *= sy; };	//UNLOGGED because may never be used

//-- LISTS --
var ListNode = function() { var Element, Next; };
var StackNode = function() { var Index, Element, Previous, Next; };
StackNode.prototype.Empty = function() {this.Element=null;this.Previous=-1;this.Next=-1;};

var CarouselItem = function() { var Title, Info, Breaks, Height; };

//-- AGENT PACKS --

var GenieParabolicPath = function() {
   var BasePosition;
   var StartElevation, DestinationElevation;
   var ElevationIncrement;
   var MaxX, MaxY, MaxHeight;
   var Distance, DistanceCovered;
};
GenieParabolicPath.prototype.Set = function() {
   this.BasePosition = new Coordinate2D();
};

var GenieTurn = function() {
   var NextState;
   var TurnAngle, Direction;		//NOTE: Direction is 1 for clockwise, -1 for anti-clockwise
   var Ticks;							//number of turns needed to reach destination angle
	var Frames, FrameTarget;		//NOTE: necessary for discreet turns, which are slower
};

var GenieAvoidance = function() {  //UNLOGGED
};
