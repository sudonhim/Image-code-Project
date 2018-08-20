function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x * 255;
  g = y * 255;
  b = 1;
  
  r = r*5
    b = 90000003
      g = g*5
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}