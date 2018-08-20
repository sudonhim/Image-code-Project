function setPixel(x,y) {
  var r=0, g=0, b=0;
  r=g=b = 255;
  
  x = mod(x*5, 1);
  y = mod(y*5, 1);
  
  
  var xm,ym,x2,h;
  
  xm = x*2 - 1;
  ym = y*2 - 1;
  
  xm *= 8;
  ym *= -10;
  
  x2 = xm*xm;
  h =  ym-(2*(abs(xm)+x2-6))/(3*(abs(x)+x2+2));
  h = h*h;
  h = h+x2;
  
  if (h<15) {
    r=255;
    g=b = 0;
  }
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}