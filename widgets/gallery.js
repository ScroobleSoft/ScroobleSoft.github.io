
//-----------------------------------------------
//---------- MISSILE GALLERY --------------------
var MissileGallery = function() {
//   var PrimeCanvas;
   var Screen;
   var InfoBox;
   var ControlPanel;
   var GraphicsTool;
   var Components;
//   var ScreenRect;
   var Frames;

   var Terrain;
};
MissileGallery.prototype = {
   Set(cntxt, iBox, cPanel, gTool, cPad) {
//      this.PrimeCanvas = pCanvas;
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;

      this.Frames = 0;
/*
      this.Components = new GalleryComponents();
      this.Components.Set(this.Screen, this.GraphicsTool);

      this.Terrain = new RiskTerrain();
      this.Terrain.Set(this.Screen, this.GraphicsTool);
      this.Terrain.Generate();
*/
   },
   Play() {
/*
      this.Screen.fillStyle = "green";
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

      var fx = new MechMegaLaser();
      fx.Set( { F: 60, COLOUR: "red" }, this.GraphicsTool);
      fx.Activate( { X: 100.5, Y: 100 }, { X: 200.5, Y: 500 } );
      fx.Draw();
*/
      this.Terrain.Draw();
   }
};
