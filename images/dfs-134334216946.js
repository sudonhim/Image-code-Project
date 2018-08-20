function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x * 3055 + y*3550;
  b = y * 3055 + x*3550;
  g = 0;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}