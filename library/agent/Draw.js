
GenieAgent.prototype.Draw = function(stt) {

	this.DetermineScreenCoords();
	this.DetermineState(stt);
	this.ExecuteDraw();
};
GenieAgent.prototype.DrawRotated = function(stt) {  //NOTE: alternative way of executing In Method draw

	//UNLOGGED - REDUNDANT

	this.DetermineScreenCoords();
	this.DetermineState(stt);

	//Start rotation
	this.Sprite.Context.translate(this.ScreenCoords.X+this.CentreOffset.X, this.ScreenCoords.Y+this.CentreOffset.Y);
	this.Sprite.Context.rotate(this.Angle*(Math.PI/180));

	this.ExecuteDraw();

	//End rotation
	this.Sprite.Context.rotate(-this.Angle*(Math.PI/180));
	this.Sprite.Context.translate(-(this.ScreenCoords.X+this.CentreOffset.X), -(this.ScreenCoords.Y+this.CentreOffset.Y));
};
GenieAgent.prototype.DetermineScreenCoords = function() {

	this.ScreenCoords.X = this.Position.X;
	this.ScreenCoords.Y = this.Position.Y;

	//Adjust for scrolling
	if (this.ScreenRect) {
		this.ScreenCoords.X = this.Position.X - this.ScreenRect.L;
		this.ScreenCoords.Y = this.Position.Y - this.ScreenRect.T;
	}

	//Adjust for non-top-down perspectives
	if (this.Specs.PERSPECTIVE) {
		if (this.Specs.PERSPECTIVE==PERSPECTIVE.CUSTOM)
	 this.MapCoords();
		else
	 PerspectiveUtils.Map(this.ScreenCoords);
	}

	//Adjust coordinates for sprite alignment . . . this needs to be examined for validity/veracity (TODO)
	if (this.Status & STATUS.TRANSFORM.TRANsBUFFER) {	//NOTE: always going to align with centre coords if buffer is used
//		this.ScreenCoords.X += this.CentreOffset.X;
//		this.ScreenCoords.Y += this.CentreOffset.Y;
	} else if (this.SpriteOffset) {			//NOTE: .SpriteOffset is used for direct drawing, which is always from the bottom-left
		this.ScreenCoords.X += this.SpriteOffset.X;
		this.ScreenCoords.Y += this.SpriteOffset.Y;
	}

	if (this.Elevation)
		this.ScreenCoords.Y -= this.Elevation;

	//Check if stationary - TODO: perhaps .Position should be rounded off in ::Update instead . . . NOTE: considered using .isInteger to increase speed
	//													 but that might actually be more inefficient
	if (this.State.Motion===STATE.MOTION.STATIONARY) {
		this.ScreenCoords.X = Math.round(this.ScreenCoords.X);
		this.ScreenCoords.Y = Math.round(this.ScreenCoords.Y);
	}
};
GenieAgent.prototype.DetermineState = function(stt) {

	if (stt)
		this.state = stt;
	else
		if (this.Animation)
			this.state = this.Animation.State;
	this.state = this.state || 0;
};
GenieAgent.prototype.ExecuteDraw = function() {

	if (this.Form)
		this.DrawTransformed(this.state);
	else
		this.DrawSprites(this.state, this.ScreenCoords.X, this.ScreenCoords.Y);
};
GenieAgent.prototype.DrawSprites = function(state, x, y) {

	if (this.PreAttachedSprites)		//NOTE: won't be implemented in most cases
		this.PreDrawAttachedSprites(x, y);
	this.Sprite.Draw(x, y, state);
	if (this.AttachedSprites)
		this.DrawAttachedSprites(x, y);	//NOTE: non-existent method that must be implemented in derived classes if needed
};
GenieAgent.prototype.QuickDraw = function(stt) {	//REDUNDANT, UNLOG (99% sure that it's completely unused)

	//Determine state
	if (stt)
		this.state = stt;
	else
		if (this.Animation)
			this.state = this.Animation.State;
	this.state = this.state || 0;

	//Determine drawing method
	if (this.Form)
		if (this.Status & STATUS.TRANSFORM.InMETHOD)
			this.StartTransform();
		else if (this.Form.Type) {
			this.DrawTransformed(this.state);
			return;
		}

	//Draw main sprite and possible attachments
	if (this.PreAttachedSprites)		//NOTE: won't exist in most cases
		this.PreDrawAttachedSprites(this.ScreenCoords.X, this.ScreenCoords.Y);
	this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.state);
	if (this.AttachedSprites)
		this.DrawAttachedSprites(this.ScreenCoords.X, this.ScreenCoords.Y);

	//Reset canvas if necessary
	if (this.Form)
		if (this.Status & STATUS.TRANSFORM.InMETHOD)
			this.EndTransform();
};
GenieAgent.prototype.PreDrawAttachedSprites = function(x, y) {

	for (this.i=0;this.i<this.PreAttachedSprites.length;++this.i) {
		this.x = x + this.PreAttachedSprites[this.i].X;
		this.y = y + this.PreAttachedSprites[this.i].Y;
		this.PreAttachedSprites[this.i].Sprite.Draw(this.x, this.y, this.PreAttachedSprites[this.i].State);
	}
};
GenieAgent.prototype.DrawAttachedSprites = function(x, y) {

	for (this.i=0;this.i<this.AttachedSprites.length;++this.i) {
		this.x = x + this.AttachedSprites[this.i].X;
		this.y = y + this.AttachedSprites[this.i].Y;
		this.AttachedSprites[this.i].Sprite.Draw(this.x, this.y, this.AttachedSprites[this.i].State);
	}
};
GenieAgent.prototype.DrawTransformed = function(state) {

	//-forms can be available via sprite buffer, produced through TransformBuffer, or drawn directly in relevant state to screen
	//-if form comes via sprite buffer, .Form will simply be an integer, and not a 2-field structure (maybe not)

	switch (this.Status & 0xF0) {	//TODO: move everything below into methods called in this switch statement
		case STATUS.TRANSFORM.InMETHOD:
			this.DrawInMethodTransformed(this.state);
			return;
	}

	if (this.Status & STATUS.TRANSFORM.SPRITeBUFFER)
		this.Sprite.DrawForm(this.Form, this.ScreenCoords.X, this.ScreenCoords.Y);  //TODO: have to account for various alignments
	else {
		switch (this.Form.Type) {
	 case SPRITeFORM.FLIPPED:
		 if (this.Status & STATUS.TRANSFORM.DIRECT)
			 this.Sprite.DrawFlipped(this.ScreenCoords.X, this.ScreenCoords.Y, this.Form.Orientation, state);
		 else
			 this.Buffer.DrawFlipped(this.Sprite, state, null, this.ScreenCoords.X, this.ScreenCoords.Y, this.Form.Orientation)
		 break;
	 case SPRITeFORM.SCALED:
		 if (this.Status & STATUS.TRANSFORM.DIRECT)
			 //-adjustments have to be made for offset (alignments being factored in)
			 this.Sprite.DrawScaled(this.ScreenCoords.X, this.ScreenCoords.Y, this.Form.Scale, state);
		 else {
		 //TODO:
		 }
		 break;
	 case SPRITeFORM.ROTATED:
		 if (this.Status & STATUS.TRANSFORM.DIRECT)
			 this.Sprite.DrawRotated(this.ScreenCoords.X, this.ScreenCoords.Y, this.Angle, state);
		 else
			 this.Buffer.DrawRotated(this.Sprite, state, null, this.ScreenCoords.X, this.ScreenCoords.Y, this.Angle);
		 break;
		}
	}
};
GenieAgent.prototype.DrawInMethodTransformed = function(state) {  //NOTE: FLIPPED will be used exclusively, and not in conjunction w/ ROTATED/SCALED

	if (this.Form.Type==SPRITeFORM.FLIPPED)
		this.DrawInMethodFlipped();
	else {
		this.Sprite.Context.translate(this.ScreenCoords.X+this.CentreOffset.X, this.ScreenCoords.Y+this.CentreOffset.Y);
		if (this.Form.Type & SPRITeFORM.ROTATED)
			this.Sprite.Context.rotate(this.Angle*(Math.PI/180));
		if (this.Form.Type & SPRITeFORM.SCALED)
			this.Sprite.Context.scale(this.Scale.X, this.Scale.Y);
			this.DrawSprites(this.state, -this.CentreOffset.X, this.CentreOffset.Y);
		if (this.Form.Type & SPRITeFORM.SCALED)
			this.Sprite.Context.scale(1/this.Scale.X, 1/this.Scale.Y);
		if (this.Form.Type & SPRITeFORM.ROTATED)
			this.Sprite.Context.rotate(-this.Angle*(Math.PI/180));
		this.Sprite.Context.translate(-(this.ScreenCoords.X+this.CentreOffset.X), -(this.ScreenCoords.Y+this.CentreOffset.Y));
	}
};
GenieAgent.prototype.DrawInMethodFlipped = function() {

	//Set scale
	switch (this.Form.Orientation) {
		case FLIPPED.BOTH:
			this.Scale.Set(-1, -1);
			break;
		case FLIPPED.HORIZONTAL:
			this.Scale.Set(-1, 1);
			break;
		case FLIPPED.VERTICAL:
			this.Sprite.Context.scale(1, -1);
	}

	//Flip canvas and draw
	this.Sprite.Context.scale(this.Scale.X, this.Scale.Y);
	if (this.PreAttachedSprites)
		this.PreAttachedSprites.forEach(function(aSprite){aSprite.X=aSprite.X*this.Scale.X;aSprite.Y=aSprite.Y*this.Scale.Y;});
	if (this.AttachedSprites)
		this.AttachedSprites.forEach(function(aSprite){aSprite.X=aSprite.X*this.Scale.X;aSprite.Y=aSprite.Y*this.Scale.Y;});
	this.DrawSprites(this.state, this.ScreenCoords.X*this.Scale.X, this.ScreenCoords.Y*this.Scale.Y);

	//Restore canvas
	this.Sprite.Context.scale(this.Scale.X, this.Scale.Y);
	if (this.PreAttachedSprites)
		this.PreAttachedSprites.forEach(function(aSprite){aSprite.X=aSprite.X*this.Scale.X;aSprite.Y=aSprite.Y*this.Scale.Y;});
	if (this.AttachedSprites)
		this.AttachedSprites.forEach(function(aSprite){aSprite.X=aSprite.X*this.Scale.X;aSprite.Y=aSprite.Y*this.Scale.Y;});
};
GenieAgent.prototype.StartTransform = function() {  //NOTE: both horizontal and vertical flipping is not implemented - a 180deg rotation will be preferred

	//UNLOGGED - maybe REDUNDANT

	if (this.Sprite) {

		//Adjust for rotation
		if (this.Form.Type==SPRITeFORM.ROTATED) {
			this.Sprite.Context.translate(this.ScreenCoords.X+this.CentreOffset.X, this.ScreenCoords.Y+this.CentreOffset.Y);
			this.Sprite.Context.rotate(this.Form.Angle*(Math.PI/180));
			this.ScreenCoords.X = -this.CentreOffset.X;
			this.ScreenCoords.Y = this.CentreOffset.Y + this.Sprite.Specs.H;
		}

		//Adjust for flipping
		if (this.Form.Type==SPRITeFORM.FLIPPED) {
			if (this.Form.Orientation==FLIPPED.HORIZONTAL) {
				this.Sprite.Context.scale(-1, 1);
				this.ScreenCoords.X = -this.ScreenCoords.X;
			}
			if (this.Form.Orientation==FLIPPED.VERTICAL) {
				this.Sprite.Context.scale(1, -1);
				this.ScreenCoords.Y = -this.ScreenCoords.Y;
			}
		}
	}
};
GenieAgent.prototype.EndTransform = function() {

	//UNLOGGED

	if (this.Sprite) {

		//Adjust for rotation
		if (this.Form.Type==SPRITeFORM.ROTATED) {
			this.Sprite.Context.rotate(-this.Form.Angle*(Math.PI/180));
			this.Sprite.Context.translate(-(this.ScreenCoords.X+this.CentreOffset.X), -(this.ScreenCoords.Y+this.CentreOffset.Y));
		}

		//Adjust for flipping
		if (this.Form.Type==SPRITeFORM.FLIPPED) {
	 if (this.Form.Orientation==FLIPPED.HORIZONTAL) {
		 this.Sprite.Context.scale(-1, 1);
		 this.ScreenCoords.X = -this.ScreenCoords.X;
	 }
	 if (this.Form.Orientation==FLIPPED.VERTICAL) {
		 this.Sprite.Context.scale(1, -1);
		 this.ScreenCoords.Y = -this.ScreenCoords.Y;
	 }
		}
	}
};
GenieAgent.prototype.ReColour = function(aPairs) {  //TODO: method should be in relevant sprites
	if (Array.isArray(aPairs[0])) {  //check if array or array of arrays is passed
		if (Array.isArray(this.Sprite.Specs.GS[0][0])) {	//check if its an Animated Composite Sprite
	 for (this.i=0;this.i<aPairs.length;++this.i)
		 for (this.j=0;this.j<this.Sprite.Specs.GS.length;++this.j)
			 for (this.k=0;this.k<this.Sprite.Specs.GS[this.j].length;++this.k)
				 if (this.Sprite.Specs.GS[this.j][this.k][1]==aPairs[this.i][0])
			  this.Sprite.Specs.GS[this.j][this.k][1] = aPairs[this.i][1];
		} else {						//only a Composite Sprite
	 for (this.i=0;this.i<aPairs.length;++this.i)
		 for (this.j=0;this.j<this.Sprite.Specs.GS.length;++this.j)
			 if (this.Sprite.Specs.GS[this.j][1]==aPairs[this.i][0])
		  this.Sprite.Specs.GS[this.j][1] = aPairs[this.i][1];
		}
	} else {
		if (Array.isArray(this.Sprite.Specs.GS[0][0])) {	//check if its an Animated Composite Sprite
	 for (this.i=0;this.i<this.Sprite.Specs.GS.length;++this.i)
		 for (this.j=0;this.j<this.Sprite.Specs.GS[this.i].length;++this.j)
			 if (this.Sprite.Specs.GS[this.i][this.j][1]==aPairs[0])
		  this.Sprite.Specs.GS[this.i][this.j][1] = aPairs[1];
		} else {
	 for (this.i=0;this.i<this.Sprite.Specs.GS.length;++this.i)
		 if (this.Sprite.Specs.GS[this.i][1] = aPairs[0])
			 this.Sprite.Specs.GS[this.i][1] = aPairs[1];
		}
	}
};
