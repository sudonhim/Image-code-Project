function setPixel(x,y) {
  var r,g,b;
  x = x*4-2;
  y = y*4-2;
  
  x = x*x;
  y = y*y + y*y*x;
  
  var c1 = floor((x+y)*10);
  var c2 = floor((x+1-y)*10);
  
  r=g=b=255;
  
  r*= sin(100*c1);
  g*= (1.0+sin(c2))*0.2 + 0.6;
  b*= floor((x+y)*10)/10;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}