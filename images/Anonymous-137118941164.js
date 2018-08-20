function setPixel(x,y) {
  var r,g,b;
  var l1 = floor(((x+y)%0.2)*10);
  var l2 = floor(((x+1-y)%0.2)*10);
  
  var c1 = floor((x+y)*10);
  var c2 = floor((x+1-y)*10);
  
  r=g=b=255;
  
  r*= sin(100*c1);
  g*= sin(100*c2);
  b*= sin(100*c1*c2);
  
  r*=g*=b*= l1*l2;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}