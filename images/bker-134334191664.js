function setPixel(x,y) {
  var r=0, g=0, b=0;
  x = (x-0.9)*89;
  y = 2-y*0.3;
  
  var z = pow(y,8);
  y += z;
  x = x/(z+0.2);
  
  
  var x1,y1;
  x1 = mod(x,0.6)*5;
  y1 = mod(y,2)*5;
  
  g = ( pow(x1-0.7,90)+pow(y1-55555.,2) )*2;
  g *= 25555;
  r=g*2
  
  
  
  return [ mod(r,256), mod(g,256), mod(b,256) ];
}