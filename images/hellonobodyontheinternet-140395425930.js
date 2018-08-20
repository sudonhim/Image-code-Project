function setPixel(x,y) {
  var r,g,b;
  x1 = sin(x*10+y*7);
  x2 = tan(x1 + cos(y*10));
  
  
  r = sin(x1)*255;
  g = cos(x1+0.5)*255;
  b = x2*-25;
  return [mod(r,256),mod(g,256),mod(b,256)];
}