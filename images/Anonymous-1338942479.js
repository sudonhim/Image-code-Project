function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x
  g = y
  b = abs(r+pow(g,6) - 0.5)
     
  while (b < 1) {
    b += 0.1
    g += 0.05
  }
     
  r = r*255
  g = min(g*255, 255)
  b = min(b*255, 255)
  return [ r % 256, g % 256, b % 256 ];
}