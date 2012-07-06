function setPixel(x,y) {
  var r=0, g=0, b=0;
  var t = abs(atan((y-0.5)/(x-0.5)));
  r = 255*sin(pi*t);
  g = 255*sin(pi*(t- (PI / 8)));
  b = 255*sin(pi*(t+ (PI / 8)));
  
  var rad = (sqrt((x-0.5)*(x-0.5)+(y-0.5)*(y-0.5)));
  var mod = 0.5 + 0.5*sin(16*pi*rad);
  r *= mod;
  g *= mod;
  b *= mod;
  return [ r % 256, g % 256, b % 256 ];
}