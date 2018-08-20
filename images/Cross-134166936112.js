function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = x-0.5;
  y = y-0.5;
  
  var angle = atan(x/y);
  
  var radial_stripes = mod(8*angle, 1);
  
  var cross = floor(1.1-abs(x)-0.05*abs(y))+floor(1.1-abs(y)-0.05*abs(x));
  
  r = cross*255;
  g = max(cross,radial_stripes)*255;
  b = g;
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}