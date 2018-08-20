function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = 2*(x-0.5);
  y = 2*(y-0.5);
  
  z = 1+x*x-y*y;
  
  layer = floor(z*0.9/0.2);
  
  grad = 2*x-2*y;
  
  r=g=b = layer/5*128;
  
  r *= 1.5*grad;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}