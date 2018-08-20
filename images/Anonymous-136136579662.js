function setPixel(x,y) {
  var r,g,b;
  x = abs(256 * (x - 0.5));
  y = abs(256 * (y - 0.5));
  
  w = 0.3 * sqrt(x*x+y*y);
  r = sqrt(x*x+y*y);
  g = 150*pow(mod(w,2*pi)/(4*pi)+0.5,4);
  b = 180 * sin( w );
  
  r *= mod(w,2*pi)/(4*pi)+0.5;
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}