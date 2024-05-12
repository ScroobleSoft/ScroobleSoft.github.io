
//------------------------------------------
//---------- SLIDE INTRO -------------------
var SlideIntro = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, TextWriter;
	var AnimationFrameHandle;

	var Pics;
	var ImagesLoaded;
};
SlideIntro.prototype = {
	Set(cntxt, iBox, cPanel, gTool, tWriter) {  //TODO: possibly nothing needs to be passed
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
	},
	Start() {

		this.Screen.fillStyle = GREY.LIGHT;
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

		this.TextWriter.Write("Loading Paintings . . . ", 20, 40, { FONT: "18px Arial", COLOUR: "blue" } );
		this.TextWriter.Write("(Please wait 5 seconds.)", 20, 65, { FONT: "18px Arial", COLOUR: "blue" } );

		this.LoadPaintings();
	},
	LoadPaintings() {
		var i;
		var img;

		//Load images
		Paintings = new Array(Art.length);
		this.Pics = new Array();
		this.ImagesLoaded = 0;
		for (i=0;i<Art.length;++i) {
			img = new Image();
			this.Pics.push(img);
			this.Pics[i].addEventListener("load", this.ImageLoaded.bind(this));	 
			this.Pics[i].src = Art[i];
		}

		this.PollLoaded();
	},
	ImageLoaded() {
		var specs;

		Paintings[this.ImagesLoaded] = new GenieImage();
		specs = { L: 0, T: 0, W: this.Pics[this.ImagesLoaded].width, H: this.Pics[this.ImagesLoaded].height };
		Paintings[this.ImagesLoaded].Set(this.Screen, this.Pics[this.ImagesLoaded], specs);
		++this.ImagesLoaded;
	},
	PollLoaded() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PollLoaded.bind(this));

		if (this.ImagesLoaded==Art.length) {
			cancelAnimationFrame(this.AnimationFrameHandle);
//			GalleryView.Open();
//			GalleryView.Update();
			SaleView.Open();
//			SaleView.Update();
		}
	}
};
