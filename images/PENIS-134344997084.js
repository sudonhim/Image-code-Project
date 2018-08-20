function setPixel(x,y) {
  var r=0, g=0, b=0;
  
  x = 50*(x-0.5);
  y = 50*(y-0.5);
  
  var rad, xPos, yPos, dist;
  for (var t=0.1; t<12*PI; t+=0.2+0.05*sqrt(t))
  {
    xPos = t*sin(t);
    yPos = t*cos(t);
    rad = sqrt(t)/.3;
    
    dist = sqrt(pow(x-xPos, 6) + pow(y-yPos, 6));
    
    if (dist<rad) {
      r = dist*255;
      g=b = dist*t*255/(12*PI)/2;
    }
  }
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}