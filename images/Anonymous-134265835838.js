function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = 2*(x-0.5);
  y = 2*(y-0.5);
  
  var radius = sqrt( pow(x,2) + pow(y,2) );
  
  var grey = (sin(50*radius) < radius)*255;
  
  r=g=b = grey;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}