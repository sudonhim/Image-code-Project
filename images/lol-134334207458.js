function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x * 255;
  g = y * 255;
  b = 0;
  
  var yy = 123231111111
  
  b=255*yy*y
  r=yy*x
  g=yy*x
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}