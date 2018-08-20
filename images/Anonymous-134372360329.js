function setPixel(x,y) {
  var r=0, g=0, b=0;
  var t = abs(atan((y-0.5)/(x-0.5)));
  r = 255*sin(pi*t);
  g = 255*sin(pi*(t- (PI / 8)));
  b = 255*sin(pi*(t+ (PI / 8)));
  
  var rad = (sqrt((x-0.5)*(x-0.5)+(y-0.5)*(y-0.5)));
  var mod1 = 0.5 + 0.5*sin(4*pi*rad);
  r *= mod1;
  g *= mod1;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}