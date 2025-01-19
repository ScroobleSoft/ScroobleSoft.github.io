
DominionComponents.prototype.CreateCannonImages = function() {

   ShortCannonImages = new GenieImage();
   LongCannonImages = new GenieImage();
   ShortCannonConsoleImages = new GenieImage();
   LongCannonConsoleImages = new GenieImage();
};
DominionComponents.prototype.SetCannonImages = function() {

   ShortCannonImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], SHORtCANNOnIMAGEs);
   LongCannonImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], LONgCANNOnIMAGEs);
   ShortCannonConsoleImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], SHORtCANNOnCONSOLeIMAGEs);
   LongCannonConsoleImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], LONgCANNOnCONSOLeIMAGEs);
};
DominionComponents.prototype.CreateMissileImages = function() {

   //UNLOGGED

   //AAMs
   AAMHorizontalShaftImages = new GenieImage();
   AAMVerticalShaftImages = new GenieImage();
   FirebrandHorizontalFinImages = new GenieImage();
   SilklightHorizontalFinImages = new GenieImage();
   FirebrandVerticalFinImages = new GenieImage();
   SilklightVerticalFinImages = new GenieImage();
   FirebrandHorizontalWarheadImages = new GenieImage();
   SilklightHorizontalWarheadImages = new GenieImage();
   FirebrandVerticalWarheadImage = new GenieImage();
   SilklightVerticalWarheadImage = new GenieImage();
};
DominionComponents.prototype.SetMissileImages = function() {

   //UNLOGGED

   //AAMs
   AAMHorizontalShaftImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], AAMhORIZONTAlSHAFtIMAGEs);
   AAMVerticalShaftImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], AAMvERTICAlSHAFtIMAGEs);
   FirebrandHorizontalFinImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], FIREBRANdHORIZONTAlFInIMAGEs);
   SilklightHorizontalFinImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], SILKLIGHtHORIZONTAlFInIMAGEs);
   FirebrandVerticalFinImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FIREBRANdVERTICAlFInIMAGEs);
   SilklightVerticalFinImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], SILKLIGHtVERTICAlFInIMAGEs);
   FirebrandHorizontalWarheadImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], FIREBRANdHORIZONTAlWARHEAdIMAGEs);
   SilklightHorizontalWarheadImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], SILKLIGHtHORIZONTAlWARHEAdIMAGEs);
   FirebrandVerticalWarheadImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FIREBRANdVERTICAlWARHEAdIMAGE);
   SilklightVerticalWarheadImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], SILKLIGHtVERTICAlWARHEAdIMAGE);
};
DominionComponents.prototype.CreateWardImages = function() {

   FlareImage = new GenieImage();
   ChaffImage = new GenieImage();
   FlareSymbolImage = new GenieImage();
   ChaffSymbolImage = new GenieImage();
};
DominionComponents.prototype.SetWardImages = function() {

   FlareImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FLAReIMAGE);
   ChaffImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], CHAFfIMAGE);
   FlareSymbolImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FLAReSYMBOlIMAGE);
   ChaffSymbolImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], CHAFfSYMBOlIMAGE);
};
