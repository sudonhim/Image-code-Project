function setPixel(x,y) {
  var r=0, g=0, b=0;
  var r=0, g=0, b=0;
  
  x = 8*x
  
  y = 6*y
  
     
  
  f = 1*sin( ( abs(x)+abs(y)) )
  
     
  
  g = 256*f
  
  r = 256*x*f
  
  b = 256*y*f
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}