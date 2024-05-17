
//-------------------------------------------
//---------- FUND RAISER --------------------
var FundRaiser = function () {
	var Pics;
	var ImagesLoaded;
};
FundRaiser.prototype = new GenieGame();
FundRaiser.prototype.Set = function(intrfc, gTool, tWriter, rGenerator) {

	this.Interface = intrfc;
	this.Screen = this.Interface.PrimeScape.Context;
	this.GraphicsTool = gTool;
	this.TextWriter = tWriter;
	this.Randomizer = rGenerator;

   this.Components = new SlideComponents();
};
FundRaiser.prototype.SetComponents = function() {

   this.Components.Set(this.Interface, this.GraphicsTool, this.TextWriter, this.Randomizer);
};
FundRaiser.prototype.CheckImagesLoaded = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.CheckImagesLoaded.bind(this));

	if (ImageManager.AllLoaded) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.SetComponents();
		this.Start();
	}
};
FundRaiser.prototype.Start = function() {

	this.Screen.fillStyle = GREY.LIGHT;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	this.TextWriter.Write("Loading Paintings . . . ", 20, 40, { FONT: "18px Arial", COLOUR: "blue" } );
	this.TextWriter.Write("(Please wait 2 seconds.)", 20, 65, { FONT: "18px Arial", COLOUR: "blue" } );

	this.LoadPaintings();
};
FundRaiser.prototype.LoadPaintings = function() {
	var i;
	var img;

	//Load images
	Paintings = new Array(VIEW.SALE.PICS);
	this.Pics = new Array();
	this.ImagesLoaded = 0;
	for (i=0;i<VIEW.SALE.PICS;++i) {
		img = new Image();
		this.Pics.push(img);
		this.Pics[i].addEventListener("load", this.ImageLoaded.bind(this));	 
		this.Pics[i].src = Art[i];
	}

	this.PollLoaded();
};
FundRaiser.prototype.ImageLoaded = function() {

	++this.ImagesLoaded;
};
FundRaiser.prototype.PollLoaded = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PollLoaded.bind(this));

	if (this.ImagesLoaded==VIEW.SALE.PICS) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.CreatePaintingArray();
		SaleView.Open();
	}
};
FundRaiser.prototype.CreatePaintingArray = function() {
	var i;
	var specs;

	for (i=0;i<this.ImagesLoaded;++i) {
		Paintings[i] = new GenieImage();
		specs = { L: 0, T: 0, W: this.Pics[i].width, H: this.Pics[i].height };
		Paintings[i].Set(this.Screen, this.Pics[i], specs);
	}
};
