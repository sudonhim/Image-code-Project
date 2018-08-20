function setPixel(x,y) {
  var r=0, g=0, b=0;
  var xm = x*8 - 4,
      ym = y*-10 + 4,
      x2 = xm*xm,
      h = ym-(2*(abs(xm)+x2-6))/(3*(abs(x)+x2+2)),
      z = (h*h)+x2;
  
  r=g=b= 255;
  if (z<16) g=b= min(255, 255*(z/16));
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}