function setPixel(x,y) {
  var r,g,b;
  var l1 = floor(((x+y)%0.2)*10);
  var l2 = floor(((x+1-y)%0.2)*10);
  
  r=g=b= l1*l2*255;
  return [mod(r,256),mod(g,256),mod(b,256)];
}