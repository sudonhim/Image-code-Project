function setPixel(x,y) {
  var r,g,b;
  
  y = 1-y;
  y = 2*(y-0.5)*y*y;
  x = 2*(x-0.5);
  if (y<0) {
    x = x*(1-10*y);
  } else {
    x += 0.1*sin(20*y);
  }
  
  
  
  var radius = sqrt( pow(x,2) + pow(y,2) );
  
  var grey = (sin(50*radius) < radius)*255;
  
  r=g=b = grey;
  
  r *= x%0.1;
  g *= x%0.5;
  b = 255-(b-mod(x,0.1));
  
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}