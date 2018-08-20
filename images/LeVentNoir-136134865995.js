function setPixel(x,y) {
  var r,g,b;
  x = abs(256 * (x - 0.5));
  y = abs(256 * (y - 0.5));
  
  r = sqrt(x*x+y*y);
  g = 180 - sqrt(x*x+y*y);
  b = 180 * sin( 0.5 * sqrt(x*x+y*y) );
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}