function setPixel(x,y) {
  var r,g,b;
  
  //create offset for x and y to center
  u = x-0.5;
  v = y-0.5;
  
  
  
  var xPos;
  var yPos;
  var flag = 0;
  
  
  r2 = sqrt(u*u+v*v);
  if (r2 < .06) {
      r=140;
      g=128;
      b=0;
      centerColor = 1;
      return [ mod(r,256), mod(g,256), mod(b,256) ];
  }
  
  //need to go 0 to 2 PI for a full flowers
  for (var t=0; t<2*PI; t=t+0.01) {
  
    // reset center color flag
    centerColor = 0;
    
    // n=7, d=2 for fancy petals
    //0.3 for length of petal
    xPos = .3*cos((6)*t)*cos(t);
    yPos = .3*cos((6)*t)*sin(t);
    
    // distance from center
    r = sqrt(xPos*xPos+yPos*yPos);
  
  
    
    // outline the flower with a .012 buffer for line thickness
    if(u<xPos+.006 && u>xPos-.006 && v<yPos+0.006&&v>yPos-0.006){
      flag = 1;
      continue;
    }
    
  
      
  }
   
  // color purpleish if point is on outline of flower
  if (flag == 1) {
  	r=255;
  	g=255;
    b=100;
  }
  // color the sky
  else {
    b=255;
    r=225;
    g=245;
  }
  
  //stem (not working, dunno)
  if (u<0.01 && u>-0.01 && v>0.30){
      g=255;
      r=180;
      b=90;
  }
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}