function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x * 423435;
  g = y * 25235;
  b = 215;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}