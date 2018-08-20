function setPixel(x,y) {
  var r=0, g=0, b=0;
  y = 0.5*(y+0.5*abs(x-0.5));
  
  
  var h;
  
  h = log(tan(y*4*pi));
  
  h = (x-h*0.1)+0.5;
  
  r = max(h,0)*255;
  
  g=b = r;
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}