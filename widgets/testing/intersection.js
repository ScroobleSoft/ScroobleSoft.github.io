
GalleryTesting.prototype.SetIntersectionTest = function() {
   this.SetRobots();
   this.Intersection = new Array(4);
   this.Intersection.forEach(function(node){node=false;});
};
GalleryTesting.prototype.SetRobots = function() {
   this.Robots = new AgentArray();
   this.Robots.Set(4, GenieAgent, null, null, null, null, { SPEED: 0.5 }, RobotSprite);
   coords.Set(301, 40+this.Randomizer.GetNumberWithinRange(0, 200));				//N
   this.Robots[0].SetPosition(coords);
   this.Robots[0].SetDirection(DIRECTION.S);
   coords.Set(560-this.Randomizer.GetNumberWithinRange(0, 200), 341);				//E
   this.Robots[1].SetPosition(coords);
   this.Robots[1].SetDirection(DIRECTION.W);
   coords.Set(261, 600-this.Randomizer.GetNumberWithinRange(0, 200));				//S
   this.Robots[2].SetPosition(coords);
   this.Robots[2].SetDirection(DIRECTION.N);
   coords.Set(this.Randomizer.GetNumberWithinRange(0, 200), 301);				//W
   this.Robots[3].SetPosition(coords);
   this.Robots[3].SetDirection(DIRECTION.E);
   this.Robots.forEach(function(robot){robot.SetVisible();});
   for (indx=0;indx<4;++indx) {
      this.Robots[indx].State.Motion = STATE.MOTION.ADVANCING;
      this.Robots[indx].Clear = false;
   }
};
GalleryTesting.prototype.PlayIntersectionTest = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayIntersectionTest.bind(this));

   this.DrawBackground();
   this.Robots.forEach(function(robot){robot.Draw();});

   this.UpdateRobots();
   this.UpdateIntersection();
};
GalleryTesting.prototype.DrawBackground = function() {
   this.Screen.fillStyle = GREY.MEDIUM;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   this.Screen.strokeStyle = "black";
   this.Screen.strokeRect(-1, 260, SCREEN.WIDTH+2, 80);
   this.Screen.strokeRect(260, -1, 80, SCREEN.HEIGHT+2);
   this.Screen.fillStyle = GREY.ASH;
   this.Screen.fillRect(-1, 261, SCREEN.WIDTH+2, 78);
   this.Screen.fillRect(261, -1, 78, SCREEN.HEIGHT+2);
};
GalleryTesting.prototype.UpdateRobots = function() {
   if (this.Robots[0].Position.Y>SCREEN.HEIGHT) {				//N
      coords.Set(301, 40+this.Randomizer.GetNumberWithinRange(0, 200));
      this.Robots[0].SetPosition(coords);
   } else if (this.Robots[0].Position.Y>=260 && this.Robots[0].Position.Y<=380) {
      if (this.CheckRoadClear(0))
	 this.Robots[0].Update();
   } else
      this.Robots[0].Update();

   if (this.Robots[1].Position.X<0) {						//E
      coords.Set(560-this.Randomizer.GetNumberWithinRange(0, 200), 341);
      this.Robots[1].SetPosition(coords);
   } else if (this.Robots[1].Position.X>=220 && this.Robots[1].Position.X<=340) {
      if (this.CheckRoadClear(1))
	 this.Robots[1].Update();
   } else
      this.Robots[1].Update();

   if (this.Robots[2].Position.Y<0) {						//S
      coords.Set(261, 600-this.Randomizer.GetNumberWithinRange(0, 200));
      this.Robots[2].SetPosition(coords);
   } else if (this.Robots[2].Position.Y>=260 && this.Robots[2].Position.Y<=380) {
      if (this.CheckRoadClear(2))
	 this.Robots[2].Update();
   } else
      this.Robots[2].Update();

   if (this.Robots[3].Position.X>SCREEN.WIDTH) {				//W
      coords.Set(this.Randomizer.GetNumberWithinRange(0, 200), 301);
      this.Robots[3].SetPosition(coords);
   } else if (this.Robots[3].Position.X>=220 && this.Robots[3].Position.X<=340) {
      if (this.CheckRoadClear(3))
	 this.Robots[3].Update();
   } else
      this.Robots[3].Update();
};
GalleryTesting.prototype.CheckRoadClear = function(iRobot) {
   if (iRobot==0 || iRobot==2)
      return(!this.Intersection[1] && !this.Intersection[3]);
   else
      return(!this.Intersection[0] && !this.Intersection[2]);
};
GalleryTesting.prototype.UpdateIntersection = function() {
   if (this.Robots[0].Position.Y>260 && this.Robots[0].Position.Y<380)
      this.Intersection[0] = true;
   else
      this.Intersection[0] = false;
   if (this.Robots[1].Position.X>220 && this.Robots[1].Position.X<340)
      this.Intersection[1] = true;
   else
      this.Intersection[1] = false;
   if (this.Robots[2].Position.Y>260 && this.Robots[2].Position.Y<380)
      this.Intersection[2] = true;
   else
      this.Intersection[2] = false;
   if (this.Robots[3].Position.X>220 && this.Robots[3].Position.X<340)
      this.Intersection[3] = true;
   else
      this.Intersection[3] = false;
};
