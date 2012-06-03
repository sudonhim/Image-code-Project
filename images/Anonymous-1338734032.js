function setPixel(x,y) {
  var r = x*x;
  var g = y*y;
  var b = x*x*y*y;
  
  return [ r%256, g%256, b%256 ];
}