function setPixel(x,y) {
  var r=0, g=0, b=0;
  b = x*(x/+y*5)*5*5*5*5*5;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}