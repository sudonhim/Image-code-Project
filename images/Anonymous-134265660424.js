function setPixel(x,y) {
  var r=0, g=0, b=0;
  var d,sp,theta;
  
  d = sqrt(pow(x,2)+pow(y-0.5, 2));
     
  theta = atan((y-0.5)/(x));
  
  sp = sin(d*8*pi+theta*pi);
     
  r = (sp-0.5)*255;
  b = 255*max(0,-1*sp)
  g = 255*max(0,sp)
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}