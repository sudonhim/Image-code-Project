function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = y * 25500;
  g = x * 90000;
  b = x+y;
  
  var i = 0;
  
  b *= b^g;
  g = g^r;
  g *= b & r;
  r = r ^ b & g;
  b /= r;
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}