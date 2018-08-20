function setPixel(x,y) {
  var r,g,b;
  x = (x-0.5)*2;
  y = (y-0.5)*2;
  r=g=b=0;
  
  theta = cos(y/x);
  rad = sin(x*x+y*y);
  phase = (atan(theta*40 + sin(rad*10*pi))+1)/2;
  
  g = sin(phase*108+27);
  b = sin(1-phase*phase)*255;
  b = tan(rad*100);
  return [mod(r,256),mod(g,256),mod(b,256)];
}