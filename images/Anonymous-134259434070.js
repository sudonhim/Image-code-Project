function setPixel(x,y) {
  var r=0, g=0, b=0;
  var r=0, g=0, b=0;
  
  x = 5*(x-0.5)
  
  y = 5*(y-0.5)
  
     
  
  f = 2.5*sin( ( abs(x)+abs(y)) )
  
     
  
  g = 256*f
  
  r = 256*x*f
  
  b = 256*y*f
  
    
  
  
  
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
  
  
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}