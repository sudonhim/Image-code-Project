function setPixel(x,y) {
  var r=0, g=0, b=0;
  var r=0, g=0, b=0;
  r = x * 255;
  g = y * 235;
  b = x*(x+y)*200;
  return [ r % 256, g % 256, b % 256 ];
  
  return [ r % 256, g % 256, b % 256 ];
}