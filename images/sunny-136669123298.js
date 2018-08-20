function setPixel(x,y) {
  var r,g,b;
  x = (x-0.5)*2;
  y = (y-0.5)*2;
  r=g=b=0;
  
  theta = atan(y/x);
  rad = sqrt(x*x+y*y);
  phase = (sin(theta*40 + sin(rad*10*pi))+1)/2;
  
  r=g = phase*128+127;
  b = (1-phase*phase)*255;
  
  if (rad < 0.4) {
    r=g=255;
    b=0;
  } else if (rad < 0.5) {
    interp = (rad-0.4)*10;
    r = r*interp + 255*(1-interp);
    g = g*interp + 255*(1-interp);
    b = b*interp;
  }
  return [mod(r,256),mod(g,256),mod(b,256)];
}