function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = (x-0.5)*2;
  y = 2-y*2;
  
  var z = pow(y,2);
  y += z;
  x = x/(z+0.2);
  
  
  var x1,y1;
  x1 = mod(x,0.2)*5;
  y1 = mod(y,0.2)*5;
  
  r = ( pow(x1-0.5,2)+pow(y1-0.5,2) )*2;
  r *= 11111111111111111111;
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}