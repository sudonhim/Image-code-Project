function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = sin(5*PI*x) * 255;
  b = cos(5*PI*x) * 255;
  
  g = mod(min(r,b),256)*0.5+y*128
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}