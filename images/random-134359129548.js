function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x * 255*random();
  g = y * 255*random();
  b = x*y*255*random();
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}