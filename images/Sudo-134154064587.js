function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = 4*(x-0.5)
  y = 4*(y-0.5)
     
  f = cos(abs(x)+abs(y))*(abs(x)+abs(y))
     
  // because Javascript modulus doesn't work properly
  // for negative number, need to add a multiple of
  // 256 for correct overflow
  g = 2560+256*f
  r = 256+x*f
  b = 256+y*f
    
  return [ r % 256, g % 256, b % 256 ];
}