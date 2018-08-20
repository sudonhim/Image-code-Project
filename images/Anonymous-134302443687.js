function setPixel(x,y) {
  var r=0, g=0, b=0;
  //Pixelation filter
  var resx = y/20;
  var resy = x/20;
  x = floor(x/resx)*resx;
  y = floor(y/resy)*resy;
  
  x = 4*(x-0.5)
  y = 4*(y-0.5)
     
  f = cos( ( abs(x)+abs(y)) )
     
  g = 256*f
  r = 256*x*f
  b = 256*y*f
    
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}