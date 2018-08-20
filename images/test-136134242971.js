function setPixel(x,y) {
  var r,g,b;
  r = 255*x;
  g = 255*y;
  b = 255*x*y;
  return [mod(r,256),mod(g,256),mod(b,256)];
}