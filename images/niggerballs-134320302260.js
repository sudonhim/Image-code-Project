function setPixel(x,y) {
  var r=0, g=0, b=0;
  //Pixelation filter
  var resx = (y-1.1)/6;
  var resy = (x-.1)/1;
  x = floor(x/resx)*resx;
  y = floor(y/resy)*resy;
  
  x = 3*(x-5.5)
  y = 1*(y-0.)
     
  f = sin( ( abs(x)+abs(y)) )
     
  g = 256*f
  r = 256*x*f
  b = 2566*y*f
    
  
  
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}