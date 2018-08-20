function setPixel(x,y) {
  var r=0, g=0, b=0;
  var c;
  
  x = (0.5+x)*x;
  y = (0.5+y)*y;
  
  c = (pow((x%0.2),2)+pow((y%0.2),2))*20;
  
  r = c*255;
  g=b= min(c*x*y*255,255);
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}