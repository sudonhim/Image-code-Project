function setPixel(x,y) {
  var r=0, g=0, b=0;
  var angle = mod(atan(y/x),0.2);
  r = x*255*angle + 0.8*y*996;
  g = r*2; 
  b = 245*pow((1.2-(x*x+y*y)),2)*(12-x)*(1-y);
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}