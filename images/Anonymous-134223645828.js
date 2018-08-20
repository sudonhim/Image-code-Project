function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = (1-x) * 255;
  g = (1-y) * 255;
  b = 0;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}