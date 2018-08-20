function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = 4*(x-0.5)
  y = 4*(y-0.5)
   
  f = cos(abs(x)+abs(y))*(abs(x)+abs(y))
   
  g = 255*f
  r = x*f
  b = y*f
  
    
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}