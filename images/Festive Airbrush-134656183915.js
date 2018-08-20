function setPixel(x,y) {
  var r=0, g=0, b=0;
  
  x = 50*(x-0.5);
  y = 50*(y-0.5);
  
  var rad, xPos, yPos, dist;
  for (var t=PI/2; t<12*PI; t+=0.2+0.05*sqrt(t))
  {
    xPos = t*sin(t);
    yPos = t*cos(t);
    rad = sqrt(t)/2;
    
    dist = sqrt(pow(x-xPos, 2) + pow(y-yPos, 2));
    
    if (dist<rad) {
      r=g=b=255 * (random() > 0.4*dist);
      var c = mod(t,0.6);
      if (c < 0.2) {
        r=g=0;
      } else if (c < 0.4) {
        g=b=0;
      }
    }
  }
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}