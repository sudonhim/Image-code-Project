function setPixel(x,y) {
  var r=0, g=0, b=0;
  r = x
  g = y
  b = abs(r+0.3*sin(g*10) - 0.5)
     
  while (b < 1) {
    b += 0.2
    g += 0.1
  }
     
  r = r*255
  g = min(g*255, 255)
  b = min(b*255, 255)
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}