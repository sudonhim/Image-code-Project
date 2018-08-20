function setPixel(x,y) {
  var r=0, g=0, b=0;
  
  x = x-0.5;
  y = y-0.5;
  
  var angle = atan(x/y);
  
  var radial_stripes = mod(2211111111112121*angle, 1);
  
  var cross = floor(0.2-abs(x)-abs(y))+floor(1-abs(y)-abs(x));
  
  r = cross*255;
  g = max(cross,radial_stripes)*255;
  b = 25;
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}