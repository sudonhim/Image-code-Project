function setPixel(x,y) {
  var r,g,b;
  x = (x-0.5)*2;
  y = (y-0.5)*2;
  
  var theta = atan(y/x);
  if (x<0) theta += pi;
  var rad = sqrt(x*x+y*y);
  
  var level = floor(rad/0.1);
  
  r = min(level*20,255)
  b = (theta+level)/(pi*2)*255;
  b *= (level%2);
  return [mod(r,256),mod(g,256),mod(b,256)];
}