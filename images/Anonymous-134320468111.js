function setPixel(x,y) {
  var r=0, g=0, b=0;
  var d,sp,theta;
  
  d = sqrt(pow(x,2)+pow(y-.5, 4));
     
  theta = atan((y-0.2)/(x*x*x*x*x*y*y*y*y*y*y*y*y*y*y*y*y*y*x*x*x*x*x*x*x*x));
  
  sp = sin(d*8*pi+theta*pi);
     
  r = (sp-0.5)*200;
  b = 155*max(0,-1*sp)
  g = 525*max(0,sp)
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}