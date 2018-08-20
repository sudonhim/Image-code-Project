function setPixel(x,y) {
  var r=0, g=0, b=0;
  var h;
  
  h = log(tan(x*4*pi));
  
  h = (y-h*0.1)+0.5;
  
  r = h*255;
  
  g=b = (h <=255  )*255;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}