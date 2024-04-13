
   CheckBoxBoxIntersection(rect1, rect2) {

      //Check rect1's corners against rect2
      this.Coords.Set(rect1.L, rect1.T);
      if (this.CheckPointInBox(this.Coords, rect2))
	 return (true);
      this.Coords.Set(rect1.L+rect1.W, rect1.T);
      if (this.CheckPointInBox(this.Coords, rect2))
	 return (true);
      this.Coords.Set(rect1.L+rect1.W, rect1.T+rect1.H);
      if (this.CheckPointInBox(this.Coords, rect2))
	 return (true);
      this.Coords.Set(rect1, rect1.T+rect1.H);
      if (this.CheckPointInBox(this.Coords, rect2))
	 return (true);

      //Check rect2's corners against rect1
      this.Coords.Set(rect2.L, rect2.T);
      if (this.CheckPointInBox(this.Coords, rect1))
	 return (true);
      this.Coords.Set(rect2.L+rect2.W, rect2.T);
      if (this.CheckPointInBox(this.Coords, rect1))
	 return (true);
      this.Coords.Set(rect2.L+rect2.W, rect1.T+rect2.H);
      if (this.CheckPointInBox(this.Coords, rect1))
	 return (true);
      this.Coords.Set(rect2, rect2.T+rect2.H);
      if (this.CheckPointInBox(this.Coords, rect1))
	 return (true);

      return (false);
};
