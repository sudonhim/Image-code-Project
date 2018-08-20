function setPixel(x,y) {
  var r=0, g=0, b=0;
  var s0 = (sin(x*50) + 1.0) / 2.0;
  var s1 = (sin(y*50) + 1.0) / 2.0;
  var v = (s0+s1) / 2;
  
  r = v*1999;
  b = g = abs(s1-s0)*1;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}