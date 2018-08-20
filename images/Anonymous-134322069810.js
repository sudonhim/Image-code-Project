function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x * 2055 + y*2550;
  g = y * 2055 + x*2550;
  b = 0;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}