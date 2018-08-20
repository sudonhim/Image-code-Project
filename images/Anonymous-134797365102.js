function setPixel(x,y) {
  var r=0, g=0, b=0;
  r=g=b=100
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}